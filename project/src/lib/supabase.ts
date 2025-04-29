import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const evaluateAnswer = async (answer: string, question: any) => {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/evaluate-answer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ answer, question }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to evaluate answer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return {
      score: 0,
      feedback: 'Failed to evaluate answer. Please try again.',
    };
  }
};