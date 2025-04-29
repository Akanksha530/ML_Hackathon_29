import React from 'react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}) => {
  // Calculate the percentage of completion
  const completionPercentage = (answeredQuestions.length / totalQuestions) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {answeredQuestions.length} of {totalQuestions} questions
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(completionPercentage)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          // Determine the status of the question
          const isAnswered = answeredQuestions.includes(index);
          const isCurrent = index === currentQuestion;
          
          // Style based on status
          let buttonStyle = 'w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all';
          
          if (isAnswered && isCurrent) {
            buttonStyle += ' bg-blue-600 text-white ring-2 ring-blue-300';
          } else if (isAnswered) {
            buttonStyle += ' bg-blue-600 text-white';
          } else if (isCurrent) {
            buttonStyle += ' bg-white border-2 border-blue-600 text-blue-600';
          } else {
            buttonStyle += ' bg-gray-200 text-gray-600';
          }
          
          return (
            <div key={index} className="flex flex-col items-center">
              <button className={buttonStyle}>
                {index + 1}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;