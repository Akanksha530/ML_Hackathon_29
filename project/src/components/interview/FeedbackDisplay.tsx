import React from 'react';
import Card from '../common/Card';
import { Answer } from '../../types';

interface FeedbackDisplayProps {
  answer: Answer;
  showSampleAnswer?: boolean;
  sampleAnswer?: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  answer,
  showSampleAnswer = false,
  sampleAnswer,
}) => {
  // Don't show if no feedback or score is available
  if (!answer.feedback && answer.score === undefined) {
    return null;
  }
  
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Determine score background
  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };
  
  // Determine score label
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };
  
  return (
    <div className="mt-6 transition-all duration-300 ease-in-out">
      <h4 className="text-md font-medium text-gray-700 mb-3">AI Feedback</h4>
      
      {answer.score !== undefined && (
        <div className={`flex items-center mb-4 p-3 rounded-md ${getScoreBackground(answer.score)}`}>
          <div className="mr-4">
            <div className={`text-xl font-bold ${getScoreColor(answer.score)}`}>
              {answer.score}/100
            </div>
            <div className={`text-sm ${getScoreColor(answer.score)}`}>
              {getScoreLabel(answer.score)}
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${answer.score >= 80 ? 'bg-green-600' : answer.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${answer.score}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      {answer.feedback && (
        <Card className="mb-4" padding="md" shadow="sm">
          <h5 className="font-medium text-gray-700 mb-2">Feedback:</h5>
          <p className="text-gray-600">{answer.feedback}</p>
        </Card>
      )}
      
      {showSampleAnswer && sampleAnswer && (
        <div className="mt-4">
          <h5 className="font-medium text-gray-700 mb-2">Sample Strong Answer:</h5>
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-gray-700 italic">{sampleAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;