/*
  # Interview System Schema

  1. New Tables
    - interviews
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - type (text)
      - difficulty (text)
      - created_at (timestamptz)
      - completed_at (timestamptz)
    
    - questions
      - id (uuid, primary key)
      - interview_id (uuid, references interviews)
      - text (text)
      - type (text)
      - difficulty (text)
      - expected_keywords (text[])
      - sample_answer (text)
    
    - answers
      - id (uuid, primary key)
      - question_id (uuid, references questions)
      - user_id (uuid, references auth.users)
      - text (text)
      - score (integer)
      - feedback (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create interviews table
CREATE TABLE interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL,
  difficulty text NOT NULL,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT valid_type CHECK (type IN ('technical', 'behavioral', 'leadership')),
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert'))
);

-- Create questions table
CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews ON DELETE CASCADE,
  text text NOT NULL,
  type text NOT NULL,
  difficulty text NOT NULL,
  expected_keywords text[] DEFAULT '{}',
  sample_answer text,
  CONSTRAINT valid_type CHECK (type IN ('technical', 'behavioral', 'leadership')),
  CONSTRAINT valid_difficulty CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert'))
);

-- Create answers table
CREATE TABLE answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid REFERENCES questions ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users NOT NULL,
  text text NOT NULL,
  score integer CHECK (score >= 0 AND score <= 100),
  feedback text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create interviews"
  ON interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view questions for their interviews"
  ON questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interviews
      WHERE interviews.id = questions.interview_id
      AND interviews.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own answers"
  ON answers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create answers"
  ON answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);