import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { Answer } from '../../types';

interface AnswerInputProps {
  questionId: string;
  previousAnswer?: Answer;
  onSubmit: (answer: Answer) => void;
  readonly?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  questionId,
  previousAnswer,
  onSubmit,
  readonly = false,
}) => {
  const [answerText, setAnswerText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  // Load previous answer if exists
  useEffect(() => {
    if (previousAnswer) {
      setAnswerText(previousAnswer.text);
      countWords(previousAnswer.text);
    }
  }, [previousAnswer]);
  
  // Count words in the answer
  const countWords = (text: string) => {
    const words = text.trim().split(/\s+/);
    setWordCount(text.trim() === '' ? 0 : words.length);
  };
  
  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerText(e.target.value);
    countWords(e.target.value);
    setIsTyping(true);
    
    // Set typing state to false after 1 second of inactivity
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerText.trim() === '') return;
    
    onSubmit({
      questionId,
      text: answerText,
    });
  };
  
  // Word count color based on count
  const getWordCountColor = () => {
    if (wordCount < 30) return 'text-red-500';
    if (wordCount < 50) return 'text-yellow-500';
    if (wordCount < 150) return 'text-green-500';
    return 'text-blue-500';
  };
  
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
            Your Answer
          </label>
          <div className="relative">
            <textarea
              id="answer"
              rows={6}
              className={`w-full px-4 py-3 border ${isTyping ? 'border-blue-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              placeholder="Type your answer here..."
              value={answerText}
              onChange={handleTextChange}
              disabled={readonly}
            />
            <div className={`absolute bottom-3 right-3 ${getWordCountColor()} text-xs transition-opacity ${isTyping ? 'opacity-100' : 'opacity-60'}`}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Aim for 50-150 words for a comprehensive answer
          </p>
        </div>
        
        {!readonly && (
          <div className="flex justify-end">
            <Button 
              type="submit" 
              variant="primary"
              disabled={answerText.trim() === ''}
            >
              Submit Answer
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AnswerInput;