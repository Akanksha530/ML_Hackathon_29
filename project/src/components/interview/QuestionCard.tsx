import React from 'react';
import Card from '../common/Card';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  className = '',
}) => {
  // Badge color based on question type
  const badgeColors = {
    technical: 'bg-blue-100 text-blue-800',
    behavioral: 'bg-green-100 text-green-800',
    leadership: 'bg-purple-100 text-purple-800',
  };
  
  // Difficulty level badge color
  const difficultyColors = {
    beginner: 'bg-green-50 text-green-700',
    intermediate: 'bg-yellow-50 text-yellow-700',
    advanced: 'bg-orange-50 text-orange-700',
    expert: 'bg-red-50 text-red-700',
  };
  
  return (
    <Card className={`mb-6 ${className}`} padding="lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex space-x-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColors[question.type]}`}>
            {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColors[question.difficulty]}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.text}</h3>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <p>Take your time to think through your answer. Consider providing specific examples and structured responses.</p>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;