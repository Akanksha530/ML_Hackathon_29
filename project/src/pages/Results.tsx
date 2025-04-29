import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Undo, Home } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FeedbackDisplay from '../components/interview/FeedbackDisplay';
import { useInterview } from '../context/InterviewContext';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { currentInterview, resetInterview } = useInterview();
  
  // Redirect if no interview results are available
  useEffect(() => {
    if (!currentInterview || currentInterview.inProgress) {
      navigate('/');
    }
  }, [currentInterview, navigate]);
  
  if (!currentInterview || currentInterview.inProgress) {
    return null;
  }
  
  const { questions, answers } = currentInterview;
  
  // Calculate the overall score
  const calculateOverallScore = () => {
    if (answers.length === 0) return 0;
    
    const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    return Math.round(totalScore / answers.length);
  };
  
  const overallScore = calculateOverallScore();
  
  // Get score color based on score value
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Get score background based on score value
  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };
  
  // Get overall feedback based on score
  const getOverallFeedback = (score: number) => {
    if (score >= 80) {
      return "Excellent job! You showed strong interviewing skills and provided comprehensive, well-structured answers. You'd likely make a positive impression on most interviewers.";
    } else if (score >= 60) {
      return "Good effort! You covered many important points, but there's room for improvement in the depth and structure of some of your answers. With a bit more practice, you'll be well-prepared for your interviews.";
    } else {
      return "You've made a start, but your answers need more development. Focus on providing specific examples, structuring your responses, and addressing the key points interviewers look for. Keep practicing!";
    }
  };
  
  // Handle starting a new interview
  const handleNewInterview = () => {
    resetInterview();
    navigate('/');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Results</h1>
            <p className="text-lg text-gray-600">
              {currentInterview.title} - {currentInterview.description}
            </p>
          </div>
          
          {/* Overall Score */}
          <Card className="mb-10" padding="lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>
              
              <div className={`inline-flex items-center justify-center p-4 rounded-full ${getScoreBackground(overallScore)} mb-4`}>
                <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 max-w-md mx-auto">
                <div 
                  className={`h-3 rounded-full ${
                    overallScore >= 80 ? 'bg-green-600' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${overallScore}%` }}
                ></div>
              </div>
              
              <p className="text-gray-700 max-w-2xl mx-auto">
                {getOverallFeedback(overallScore)}
              </p>
            </div>
          </Card>
          
          {/* Question-by-Question Breakdown */}
          <h2 className="text-2xl font-bold mb-6">Question Breakdown</h2>
          
          <div className="space-y-8">
            {questions.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.id);
              
              return (
                <Card key={question.id} className="overflow-hidden">
                  <div className="border-b border-gray-200 bg-gray-50 p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">Question {index + 1}</h3>
                      {answer && answer.score !== undefined && (
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          answer.score >= 80 ? 'bg-green-100 text-green-800' : 
                          answer.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          Score: {answer.score}%
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{question.text}</p>
                  </div>
                  
                  <div className="p-4">
                    {answer ? (
                      <>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Answer:</h4>
                          <p className="text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-100">
                            {answer.text}
                          </p>
                        </div>
                        
                        <FeedbackDisplay 
                          answer={answer}
                          showSampleAnswer={true}
                          sampleAnswer={question.sampleAnswer}
                        />
                      </>
                    ) : (
                      <div className="flex items-center text-yellow-600">
                        <XCircle className="w-5 h-5 mr-2" />
                        <span>No answer provided</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleNewInterview}
            >
              <Undo className="w-5 h-5 mr-2" />
              Start New Interview
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;