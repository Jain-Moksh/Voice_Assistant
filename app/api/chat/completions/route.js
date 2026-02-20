import { InferenceClient } from "@huggingface/inference";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";

const hf = new InferenceClient(process.env.HF_TOKEN);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper to generate OpenAI-compatible response
function createOpenAIResponse(content, model = "llama-3.3-70b-versatile") {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: content,
        },
        finish_reason: "stop",
      },
    ],
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Incoming body:", JSON.stringify(body));

    // Robust user message extraction (handles all Vapi formats)
    let userMessage = "";

    if (typeof body === "string") {
      userMessage = body;
    } else if (body?.input && typeof body.input === "string") {
      userMessage = body.input;
    } else if (body?.message && typeof body.message === "string") {
      userMessage = body.message;
    } else if (Array.isArray(body?.messages)) {
      const lastUser = [...body.messages]
        .reverse()
        .find((m) => m.role === "user" && m.content);

      if (lastUser) {
        userMessage = lastUser.content;
      }
    }

    if (!userMessage) {
      console.log("No user message found");
      return new Response(
        JSON.stringify(
          createOpenAIResponse("I did not receive a valid message."),
        ),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 1️⃣ Generate embedding
    const rawEmbedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: userMessage,
    });

    const queryEmbedding = Array.isArray(rawEmbedding[0])
      ? rawEmbedding[0]
      : rawEmbedding;

    // 2️⃣ Supabase match
    const { data: documents } = await supabase.rpc("match_documents", {
      query_embedding: Array.from(queryEmbedding),
      match_threshold: 0.3,
      match_count: 5,
    });

    const context =
      documents?.map((doc) => `- ${doc.content}`).join("\n") || "";

    // 3️⃣ LLM call (IGNORE incoming model field)
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            'You are a professional AI assistant.\nUse ONLY the provided context to answer.\nIf not found, say: "I don\'t have that information in my knowledge base."',
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${userMessage}`,
        },
      ],
    });

    const finalAnswer =
      chatCompletion.choices[0]?.message?.content ||
      "I don't have that information in my knowledge base.";

    // Return full OpenAI-compatible format
    return new Response(JSON.stringify(createOpenAIResponse(finalAnswer)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // IMPORTANT: Never throw 500 to Vapi - always return 200 with error message
    return new Response(
      JSON.stringify(
        createOpenAIResponse("Sorry, something went wrong. Please try again."),
      ),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
