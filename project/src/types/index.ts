// Interview Types
export type QuestionType = 'technical' | 'behavioral' | 'leadership';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  expectedKeywords?: string[];
  sampleAnswer?: string;
}

export interface Answer {
  questionId: string;
  text: string;
  score?: number;
  feedback?: string;
}

export interface Interview {
  id: string;
  title: string;
  description: string;
  category: QuestionType;
  difficulty: DifficultyLevel;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  inProgress: boolean;
  startedAt?: Date;
  completedAt?: Date;
}

export interface User {
  name: string;
  interviews: Interview[];
}