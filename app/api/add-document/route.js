import { InferenceClient } from "@huggingface/inference";
import { createClient } from "@supabase/supabase-js";

const hf = new InferenceClient(process.env.HF_TOKEN);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    // Generate embedding using HuggingFace
    const rawEmbedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: content,
      provider: "hf-inference",
    });

    console.log("Raw HF response:", rawEmbedding);

    // Extract flat array if nested
    const embedding = Array.isArray(rawEmbedding[0])
      ? rawEmbedding[0]
      : rawEmbedding;
    console.log("Embedding length (insert):", embedding.length);

    // Insert into Supabase documents table
    const { error: insertError } = await supabase.from("documents").insert({
      content,
      embedding: Array.from(embedding),
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return Response.json(
        { error: "Failed to insert document" },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Add document error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
