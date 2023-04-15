// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import "https://deno.land/x/xhr@0.3.0/mod.ts"
import { getLogger } from "https://deno.land/std@0.183.0/log/mod.ts"
import { serve } from "https://deno.land/std@0.183.0/http/server.ts"
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1"

const configuration = new Configuration({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});
const openai = new OpenAIApi(configuration);

serve(async (req) => {
  const { query } = await req.json();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query,
      max_tokens: 256,
      temperature: 0,
    });

    const {
      data: {
        id,
        choices: [{ text }]
      },
    } = response;

    return new Response(
      JSON.stringify({ id, text }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    const logger = getLogger()
    logger.error(error)

    return new Response(
      JSON.stringify({ error }),
      { headers: { "Content-Type": "application/json" } },
    )
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"query":"What is Supabase?"}'
