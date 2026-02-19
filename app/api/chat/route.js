import { InferenceClient } from "@huggingface/inference";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";

const hf = new InferenceClient(process.env.HF_TOKEN);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

console.log(
  "Using Supabase service key:",
  !!process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Incoming body:", body);

    let userMessage = null;

    // ✅ Legacy format support
    if (typeof body.message === "string") {
      userMessage = body.message;
    }

    // ✅ Vapi format support
    if (
      body.messages &&
      Array.isArray(body.messages) &&
      body.messages.length > 0
    ) {
      const lastMessage = body.messages[body.messages.length - 1];

      if (lastMessage && typeof lastMessage.content === "string") {
        userMessage = lastMessage.content;
      }
    }

    if (!userMessage || userMessage.trim() === "") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const message = userMessage;

    // 1️⃣ Generate embeddings using HuggingFace
    const rawEmbedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: message,
      provider: "hf-inference",
    });

    const queryEmbedding = Array.isArray(rawEmbedding[0])
      ? rawEmbedding[0]
      : rawEmbedding;

    console.log("Query embedding length:", queryEmbedding.length);

    // 2️⃣ Query Supabase
    const { data: documents, error: matchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: Array.from(queryEmbedding),
        match_threshold: 0.3,
        match_count: 5,
      },
    );

    console.log("Supabase matches:", documents);

    if (matchError) {
      console.error("Supabase match error:", matchError);
      return Response.json(
        { error: "Failed to search documents" },
        { status: 500 },
      );
    }

    // 3️⃣ Build context
    const context =
      documents?.map((doc) => `- ${doc.content}`).join("\n") || "";

    // 4️⃣ Call Groq
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a professional AI assistant.
Use ONLY the provided context to answer the question.
If the answer is not in the context, say:
"I don't have that information in my knowledge base."

Be clear, natural, and concise.`,
        },
        {
          role: "user",
          content: `Context:
${context}

Question:
${message}`,
        },
      ],
    });

    const finalAnswer = chatCompletion.choices[0]?.message?.content || "";

    // ✅ OpenAI-compatible response format for Vapi Custom LLM
    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              content: finalAnswer,
            },
          },
        ],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
