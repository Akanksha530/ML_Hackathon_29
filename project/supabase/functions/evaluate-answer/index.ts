import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { answer, question } = await req.json();

    // Evaluate the answer using GPT-4
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert interviewer evaluating candidate responses. 
          Evaluate the following answer based on:
          1. Relevance to the question
          2. Completeness of response
          3. Technical accuracy (for technical questions)
          4. Communication clarity
          5. Use of specific examples
          
          Provide a score out of 100 and detailed, constructive feedback.`
        },
        {
          role: 'user',
          content: `Question: ${question.text}
          Expected keywords: ${question.expected_keywords.join(', ')}
          Candidate's answer: ${answer.text}
          
          Please provide evaluation in JSON format with 'score' and 'feedback' fields.`
        }
      ],
      response_format: { type: 'json_object' }
    });

    const evaluation = JSON.parse(completion.choices[0].message.content);

    return new Response(
      JSON.stringify(evaluation),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});