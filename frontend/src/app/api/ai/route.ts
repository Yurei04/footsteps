import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "mixtral-8x7b-32768",
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 1,
    });

    const assistantMessage =
      completion.choices[0]?.message?.content || "No response generated";

    return Response.json({
      content: assistantMessage,
      role: "assistant",
    });
  } catch (error: any) {
    console.error("Groq API error:", error);
    return Response.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}