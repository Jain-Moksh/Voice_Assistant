import { InferenceClient } from "@huggingface/inference";

export async function GET() {
  try {
    const client = new InferenceClient(process.env.HF_TOKEN);

    const result = await client.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: "Hello world",
      provider: "hf-inference",
    });

    return Response.json({
      length: result.length,
      sample: Array.from(result).slice(0, 5),
    });
  } catch (error) {
    return Response.json({
      error: error.message,
      status: error.response?.status,
      details: error.response?.data,
    });
  }
}
