import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook/environmental-analysis";

/*
 * Identify a location from the user's question.
 */
function extractLocation(message: string): string | null {
  const text = message.trim();

  const patterns = [
    // Travel-related questions
    /\b(?:travel|travelling|traveling|go|going|drive|driving|visit|visiting|trip|journey|commute|commuting)\s+(?:to|in|near)\s+(.+?)(?:\?|$|\.)/i,

    // "to Baguio"
    /\bto\s+([A-Z][A-Za-z\s,-]{1,60})(?:\?|$|\.)/,

    // "in Baguio"
    /\bin\s+(.+?)(?:\?|$|\.)/i,

    // "at Baguio"
    /\bat\s+(.+?)(?:\?|$|\.)/i,

    // "for Baguio"
    /\bfor\s+(.+?)(?:\?|$|\.)/i,

    // "analyze Baguio"
    /\b(?:analyze|analyse)\s+(.+?)(?:\?|$|\.)/i,

    // "Baguio weather"
    /^([A-Z][A-Za-z\s,-]{1,60})\s+(?:weather|risk|rain|rainfall|temperature|conditions|flooding|flood|climate)\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      let location = match[1]
        .trim()
        .replace(/[?!.,]+$/, "")
        .trim();

      location = location
        .replace(/\b(right now|today|currently|now)\b/gi, "")
        .trim();

      if (location.length >= 2) {
        return location;
      }
    }
  }

  return null;
}

/*
 * Determine whether the question is related to environmental topics.
 */
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

    // Travel and safety
    "travel",
    "travelling",
    "traveling",
    "trip",
    "visit",
    "visiting",
    "drive",
    "driving",
    "road",
    "roads",
    "commute",
    "commuting",
    "journey",
    "safe",
    "safety",
  ];

  const lowerMessage = message.toLowerCase();

  return keywords.some((keyword) =>
    lowerMessage.includes(keyword)
  );
}

/*
 * Get environmental analysis from the Earth Forward
 * n8n environmental analysis workflow.
 */
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

/*
 * General AI response.
 *
 * Used for questions that do not require
 * location-specific environmental data.
 */
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
You are Earth Forward, an intelligent environmental assistant.

Your job is to answer the user's questions naturally, clearly, and helpfully.

You can help with:
- weather
- environmental conditions
- environmental risks
- flooding
- rainfall
- drought
- pollution
- climate
- disaster preparedness
- travel considerations related to environmental conditions
- environmental response strategies
- general environmental questions

IMPORTANT:

Every question must receive a useful answer.

Answer the user's actual question directly.

Do not sound like a formal report.

Do not repeatedly use phrases such as:
"Based on the current environmental data"
"According to the environmental analysis"
"The overall risk level is"

Do not automatically ask the user for a location.

Only say that a location is needed when the question genuinely requires
current location-specific environmental information.

If the user asks a general environmental question, answer it directly.

Use simple, natural, conversational language.

Talk to the user like a helpful assistant.

Do not invent real-time weather conditions, locations, statistics,
news, environmental events, road closures, or other real-world facts.

Do not claim that someone is completely safe.

Keep answers concise but useful.
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
    "I couldn't generate a response."
  );
}

/*
 * Generate a natural conversational response
 * using real environmental data.
 */
async function generateEnvironmentalChatResponse(
  userQuestion: string,
  analysis: any
) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are Earth Forward, an intelligent environmental assistant.

You are given environmental data retrieved for a specific location.

Your job is to answer the user's question naturally, like a helpful person
having a conversation with them.

IMPORTANT RESPONSE RULES:

- Every question must receive a useful answer.
- Answer the user's actual question directly.
- Sound natural and conversational.
- Do not sound like a formal environmental report.
- Do not repeatedly say "Based on the current environmental data."
- Do not unnecessarily repeat the location name.
- Do not start every answer with "The overall risk level is..."
- Avoid robotic labels such as:
  "Recommendation:"
  "Condition:"
  "Priority:"
- Do not use tables.
- Do not use excessive bullet points.
- Use a short paragraph when that is enough.
- Use bullets only when several actions need to be listed.
- Talk directly to the user using "you".
- Keep the answer concise but useful.

TRAVEL QUESTIONS:

If the user asks whether they should travel, drive, visit, commute,
or go somewhere:

- Give the practical answer first.
- HIGH risk:
  Recommend avoiding or postponing travel when appropriate and explain
  the environmental concern.
- MEDIUM risk:
  Recommend extra caution and explain what the user should watch for.
- LOW risk:
  Explain that the available environmental conditions appear relatively
  low risk, but do NOT guarantee that travel is completely safe.
- Never say "100% safe."
- Never say "there is no danger."
- Mention that this assessment is based on environmental/weather data.
- Do not claim information about traffic, road closures, accidents,
  or transportation conditions unless that information is actually provided.

WEATHER QUESTIONS:

If the user asks about weather, explain it naturally.

For example:

Instead of:
"Temperature: 16°C. Humidity: 99%. Wind Speed: 1 km/h."

Say:
"It's around 16°C right now, with very high humidity and light winds."

RISK QUESTIONS:

If the user asks about risk, explain what the risk means in simple language.

For example:

Instead of:
"Overall risk: LOW. Risk Type: Light Rainfall."

Say:
"Things look relatively low risk right now. There's some light rainfall,
so the main thing to keep an eye on is whether the weather changes."

PRACTICAL ADVICE:

Only give advice supported by the available information.

For light rain:
- Bring an umbrella.
- Be careful on wet roads.
- Keep an eye on changing weather conditions.

For higher rainfall or stronger environmental risk:
Give practical precautions that are relevant to the actual data.

Do not give unnecessary emergency advice when the data does not support it.

Do not invent:
- weather conditions
- environmental events
- statistics
- news
- road closures
- traffic conditions
- accidents
- warnings
- disasters

Most importantly:

Make every response feel like a natural conversation rather than
a generated report.

ENVIRONMENTAL DATA:

Location: ${analysis.location}
Country: ${analysis.country}

Coordinates:
Latitude: ${analysis.latitude}
Longitude: ${analysis.longitude}

Date:
${analysis.date}

CURRENT WEATHER:

Temperature: ${analysis.temperature} °C
Humidity: ${analysis.humidity}%
Rainfall: ${analysis.precipitation} mm
Rain probability: ${analysis.precipitation_probability ?? 0}%
Wind speed: ${analysis.wind_speed} km/h
Weather code: ${analysis.weather_code}

RISK:

Overall risk: ${analysis.risk_level}
Risk type: ${analysis.risk_type}
Risk reason: ${analysis.risk_reason}

HISTORICAL DATA:

Historical risk: ${analysis.historical_risk}
Historical days analyzed: ${analysis.historical_days}
Total rainfall: ${analysis.historical_total_rainfall_mm} mm
Average daily rainfall: ${analysis.historical_average_daily_rainfall_mm} mm
Highest daily rainfall: ${analysis.historical_highest_daily_rainfall_mm} mm
Rainy days: ${analysis.historical_rainy_days}

Historical average temperature:
${analysis.historical_average_temperature_c} °C

Historical highest temperature:
${analysis.historical_highest_temperature_c} °C

Historical average wind:
${analysis.historical_average_wind_kmh} km/h

Historical highest wind:
${analysis.historical_highest_wind_kmh} km/h
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

/*
 * Main Chat API
 */
export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        {
          error: "Invalid messages format",
        },
        {
          status: 400,
        }
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
        {
          error: "No user message found",
        },
        {
          status: 400,
        }
      );
    }

    const userQuestion = latestUserMessage.content;

    const location = extractLocation(userQuestion);

    const isEnvironmental =
      looksLikeEnvironmentalQuestion(userQuestion);

    /*
     * LOCATION-BASED ENVIRONMENTAL QUESTION
     */
    if (location && isEnvironmental) {
      try {
        console.log(
          `Earth Forward environmental analysis requested for: ${location}`
        );

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

        /*
         * If n8n is unavailable, still answer the question
         * without inventing current environmental information.
         */
        const fallback =
          await getGeneralAIResponse([
            {
              role: "user",
              content: `
The user asked:

"${userQuestion}"

The location identified was:

"${location}"

The Earth Forward environmental analysis system is currently
unavailable.

Answer the user's question helpfully.

If the question requires current weather or environmental conditions,
clearly explain that the current environmental data could not be retrieved.

Do not invent current weather, risk, news, road conditions,
or environmental events.
              `.trim(),
            },
          ]);

        return Response.json({
          content: fallback,
          role: "assistant",
        });
      }
    }

    /*
     * GENERAL QUESTION
     *
     * Every question receives an answer.
     */
    const response =
      await getGeneralAIResponse(formattedMessages);

    return Response.json({
      content: response,
      role: "assistant",
    });
  } catch (error: any) {
    console.error(
      "Earth Forward Chat API error:",
      error
    );

    return Response.json(
      {
        error:
          error?.message ||
          "Failed to process chat request.",
      },
      {
        status: 500,
      }
    );
  }
}
