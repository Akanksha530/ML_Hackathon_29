import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Interview, Answer, User } from '../types';

interface InterviewContextType {
  user: User | null;
  currentInterview: Interview | null;
  setUser: (user: User) => void;
  startInterview: (interview: Interview) => void;
  submitAnswer: (answer: Answer) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeInterview: () => void;
  evaluateAnswer: (answer: Answer) => Answer;
  resetInterview: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);

  // Start a new interview
  const startInterview = (interview: Interview) => {
    const updatedInterview = {
      ...interview,
      inProgress: true,
      startedAt: new Date(),
      currentQuestionIndex: 0,
      answers: [],
    };
    setCurrentInterview(updatedInterview);
  };

  // Submit an answer for the current question
  const submitAnswer = (answer: Answer) => {
    if (!currentInterview) return;
    
    // Evaluate the answer
    const evaluatedAnswer = evaluateAnswer(answer);
    
    // Update the answers array
    const updatedAnswers = [...currentInterview.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = evaluatedAnswer;
    } else {
      updatedAnswers.push(evaluatedAnswer);
    }
    
    setCurrentInterview({
      ...currentInterview,
      answers: updatedAnswers,
    });
  };

  // Move to the next question
  const nextQuestion = () => {
    if (!currentInterview) return;
    
    const nextIndex = currentInterview.currentQuestionIndex + 1;
    if (nextIndex < currentInterview.questions.length) {
      setCurrentInterview({
        ...currentInterview,
        currentQuestionIndex: nextIndex,
      });
    }
  };

  // Move to the previous question
  const previousQuestion = () => {
    if (!currentInterview) return;
    
    const prevIndex = currentInterview.currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentInterview({
        ...currentInterview,
        currentQuestionIndex: prevIndex,
      });
    }
  };

  // Complete the interview
  const completeInterview = () => {
    if (!currentInterview || !user) return;
    
    const completedInterview = {
      ...currentInterview,
      inProgress: false,
      completedAt: new Date(),
    };
    
    // Update the user's interviews
    const updatedUser = {
      ...user,
      interviews: [...user.interviews, completedInterview],
    };
    
    setUser(updatedUser);
    setCurrentInterview(completedInterview);
  };

  // Simple answer evaluation algorithm
  const evaluateAnswer = (answer: Answer): Answer => {
    if (!currentInterview) return answer;
    
    const question = currentInterview.questions.find(q => q.id === answer.questionId);
    if (!question || !question.expectedKeywords) return { ...answer, score: 0, feedback: "Unable to evaluate." };
    
    // Count how many expected keywords are in the answer
    const lowerCaseAnswer = answer.text.toLowerCase();
    const keywordsFound = question.expectedKeywords.filter(
      keyword => lowerCaseAnswer.includes(keyword.toLowerCase())
    );
    
    // Calculate a simple score based on keywords found
    const maxScore = 100;
    const keywordScore = Math.min(
      Math.floor((keywordsFound.length / question.expectedKeywords.length) * maxScore),
      maxScore
    );
    
    // Generate feedback
    let feedback = "";
    if (keywordScore >= 80) {
      feedback = "Excellent answer! You covered most of the key points we were looking for.";
    } else if (keywordScore >= 60) {
      feedback = "Good answer, but you could have included more details about: " + 
        question.expectedKeywords
          .filter(k => !keywordsFound.includes(k))
          .slice(0, 2)
          .join(", ");
    } else {
      feedback = "Your answer needs improvement. Consider addressing these points: " + 
        question.expectedKeywords
          .filter(k => !keywordsFound.includes(k))
          .slice(0, 3)
          .join(", ");
    }
    
    return {
      ...answer,
      score: keywordScore,
      feedback,
    };
  };

  // Reset the current interview
  const resetInterview = () => {
    setCurrentInterview(null);
  };

  const value = {
    user,
    currentInterview,
    setUser,
    startInterview,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeInterview,
    evaluateAnswer,
    resetInterview,
  };

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};