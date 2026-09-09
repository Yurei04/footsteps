import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook/environmental-analysis";

function extractLocation(message: string): string | null {
  const text = message.trim();

  const patterns = [
    /\bin\s+(.+?)(?:\?|$|\.)/i,
    /\bat\s+(.+?)(?:\?|$|\.)/i,
    /\bfor\s+(.+?)(?:\?|$|\.)/i,
    /\banalyze\s+(.+?)(?:\?|$|\.)/i,
    /\banalyse\s+(.+?)(?:\?|$|\.)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      const location = match[1]
        .trim()
        .replace(/[?!.,]+$/, "");

      if (location.length >= 2) {
        return location;
      }
    }
  }

  return null;
}

function looksLikeEnvironmentalQuestion(message: string): boolean {
  const keywords = [
    "weather",
    "rain",
    "rainfall",
    "flood",
    "flooding",
    "drought",
    "temperature",
    "humidity",
    "wind",
    "environmental risk",
    "risk",
    "environment",
    "environmental",
    "climate",
    "storm",
    "typhoon",
    "precipitation",
    "pollution",
    "heat",
    "conditions",
    "safe",
  ];

  const lowerMessage = message.toLowerCase();

  return keywords.some((keyword) =>
    lowerMessage.includes(keyword)
  );
}

async function getEnvironmentalAnalysis(location: string) {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Environmental analysis failed with status ${response.status}`
    );
  }

  return response.json();
}

async function getGeneralAIResponse(
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>
) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are Footsteps Environmental Assistant.

You help users understand environmental conditions, environmental risks,
weather-related hazards, climate-related topics, and practical response
strategies.

Use simple, clear language.

Do not invent real-time weather conditions, locations, statistics, or
environmental events.

If the user asks about a specific location's current environmental
conditions or risk, ask them to provide the city or location so Footsteps
can analyze it using its environmental data system.

Keep answers concise and practical.
        `.trim(),
      },
      ...messages,
    ],
    model: "openai/gpt-oss-20b",
    max_tokens: 700,
    temperature: 0.4,
    top_p: 1,
  });

  return (
    completion.choices[0]?.message?.content ||
    "No response generated."
  );
}

async function generateEnvironmentalChatResponse(
  userQuestion: string,
  analysis: any
) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are the Footsteps Environmental AI Agent.

You are given real environmental data from the Footsteps environmental
analysis system.

Answer the user's question using ONLY the provided data.

Do not invent weather conditions, risks, statistics, news, or events.

Keep the answer easy to understand and concise.

If the risk is HIGH or MEDIUM, explain the important concern and give
practical actions.

If the risk is LOW, explain that conditions are currently low risk and
mention what should still be monitored.

Do not use tables.

Do not claim that someone is completely safe.

Environmental analysis data:

Location: ${analysis.location}
Country: ${analysis.country}

Current weather:
Temperature: ${analysis.temperature} °C
Humidity: ${analysis.humidity}%
Rainfall: ${analysis.precipitation} mm
Rain probability: ${analysis.precipitation_probability ?? 0}%
Wind speed: ${analysis.wind_speed} km/h
Weather code: ${analysis.weather_code}

Risk:
Overall risk: ${analysis.risk_level}
Risk type: ${analysis.risk_type}
Risk reason: ${analysis.risk_reason}

Historical:
Historical risk: ${analysis.historical_risk}
Historical days analyzed: ${analysis.historical_days}
Total rainfall: ${analysis.historical_total_rainfall_mm} mm
Average daily rainfall: ${analysis.historical_average_daily_rainfall_mm} mm
Highest daily rainfall: ${analysis.historical_highest_daily_rainfall_mm} mm
Rainy days: ${analysis.historical_rainy_days}
        `.trim(),
      },
      {
        role: "user",
        content: userQuestion,
      },
    ],
    model: "openai/gpt-oss-20b",
    max_tokens: 700,
    temperature: 0.3,
    top_p: 1,
  });

  return (
    completion.choices[0]?.message?.content ||
    "I couldn't generate an environmental response."
  );
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const formattedMessages = messages
      .filter(
        (msg: any) =>
          msg &&
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string"
      )
      .map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));

    const latestUserMessage = [...formattedMessages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (!latestUserMessage) {
      return Response.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    const userQuestion = latestUserMessage.content;
    const location = extractLocation(userQuestion);

    if (
      location &&
      looksLikeEnvironmentalQuestion(userQuestion)
    ) {
      try {
        const analysis =
          await getEnvironmentalAnalysis(location);

        const response =
          await generateEnvironmentalChatResponse(
            userQuestion,
            analysis
          );

        return Response.json({
          content: response,
          role: "assistant",
          source: "environmental-analysis",
          location: analysis.location,
          risk_level: analysis.risk_level,
        });
      } catch (error) {
        console.error(
          "Environmental analysis error:",
          error
        );

        return Response.json({
          content:
            `I couldn't complete the environmental analysis for "${location}" right now. Please make sure the n8n workflow is running and try again.`,
          role: "assistant",
        });
      }
    }

    if (
      looksLikeEnvironmentalQuestion(userQuestion) &&
      !location
    ) {
      const response = await getGeneralAIResponse([
        {
          role: "user",
          content: `
The user asked:

"${userQuestion}"

This appears to be an environmental question, but a specific
location was not clearly provided.

Ask the user to provide the city or location they want Footsteps
to analyze.
          `.trim(),
        },
      ]);

      return Response.json({
        content: response,
        role: "assistant",
      });
    }

    const response =
      await getGeneralAIResponse(formattedMessages);

    return Response.json({
      content: response,
      role: "assistant",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "Failed to process chat request.",
      },
      { status: 500 }
    );
  }
}