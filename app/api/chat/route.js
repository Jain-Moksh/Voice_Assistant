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

    // Extract user message from either format
    let userMessage;

    if (body.message && typeof body.message === "string") {
      // Legacy format: { message: "..." }
      userMessage = body.message;
    } else if (
      body.messages &&
      Array.isArray(body.messages) &&
      body.messages.length > 0
    ) {
      // Vapi format: { messages: [{ role: "user", content: "..." }] }
      const lastMessage = body.messages[body.messages.length - 1];
      userMessage = lastMessage.content;
    }

    if (!userMessage) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const message = userMessage;

    // 1. Generate embeddings using HuggingFace
    const rawEmbedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: message,
      provider: "hf-inference",
    });

    // Extract flat array if nested
    const queryEmbedding = Array.isArray(rawEmbedding[0])
      ? rawEmbedding[0]
      : rawEmbedding;
    console.log("Query embedding length:", queryEmbedding.length);

    // 2. Query Supabase for matching documents
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

    // 3. Combine retrieved content into context
    const context =
      documents?.map((doc) => `- ${doc.content}`).join("\n") || "";

    // 4. Call Groq LLM
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            'You are a professional AI assistant.\nUse ONLY the provided context to answer the question.\nIf the answer is not in the context, say:\n"I don\'t have that information in my knowledge base."\n\nBe clear, natural, and concise.',
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${message}`,
        },
      ],
    });

    const finalAnswer = chatCompletion.choices[0]?.message?.content || "";

    // Return Vapi-compatible format
    return Response.json({
      role: "assistant",
      content: finalAnswer,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
