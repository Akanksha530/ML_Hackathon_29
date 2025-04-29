import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Mic, MicOff } from 'lucide-react';

import Header from '../components/layout/Header';
import QuestionCard from '../components/interview/QuestionCard';
import ProgressBar from '../components/interview/ProgressBar';
import Button from '../components/common/Button';
import FeedbackDisplay from '../components/interview/FeedbackDisplay';

import { useInterview } from '../context/InterviewContext';
import { Answer } from '../types'; // ✅ Correct import

const Interview: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentInterview, 
    submitAnswer, 
    nextQuestion, 
    previousQuestion, 
    completeInterview 
  } = useInterview();

  const [showFeedback, setShowFeedback] = useState(false);
  const [answeredIndices, setAnsweredIndices] = useState<number[]>([]);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);

  // Setup webcam
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera/mic:", err);
      }
    };
    getMedia();

    return () => {
      videoRef.current?.srcObject &&
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
    };
  }, []);

  // Redirect if no interview
  useEffect(() => {
    if (!currentInterview) navigate('/');
  }, [currentInterview, navigate]);

  // Setup speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported. Try Google Chrome.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognitionRef.current.onerror = () => setListening(false);
    recognitionRef.current.onend = () => setListening(false);
  }, []);

  if (!currentInterview) return null;

  const { questions, currentQuestionIndex, answers } = currentInterview;
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionAnswer = answers.find(a => a.questionId === currentQuestion.id);
  const isCurrentQuestionAnswered = !!currentQuestionAnswer;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Update answered indices
  useEffect(() => {
    const newAnswered = currentInterview.questions.reduce<number[]>((acc, q, i) => {
      if (answers.find(a => a.questionId === q.id)) acc.push(i);
      return acc;
    }, []);
    setAnsweredIndices(newAnswered);
  }, [answers, currentInterview.questions]);

  // Reset feedback and set text when changing questions
  useEffect(() => {
    setShowFeedback(false);
    setText(currentQuestionAnswer?.content || '');
  }, [currentQuestionIndex]);

  const handleStartListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const handleStopListening = () => {
    recognitionRef.current?.stop();
  };

  const handleSubmitAnswer = () => {
    if (!text.trim()) return;
    const answer: Answer = {
      questionId: currentQuestion.id,
      content: text.trim(),
    };
    submitAnswer(answer);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setText('');
    nextQuestion();
  };

  const handlePreviousQuestion = () => {
    setShowFeedback(false);
    setText('');
    previousQuestion();
  };

  const handleCompleteInterview = () => {
    completeInterview();
    navigate('/results');
  };

  const allQuestionsAnswered = questions.every(q =>
    answers.some(a => a.questionId === q.id)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={currentInterview.title} />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {/* Webcam */}
          <div className="my-4 flex justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-64 h-48 rounded-lg border shadow-md"
            />
          </div>

          {/* Progress & Question */}
          <ProgressBar
            currentQuestion={currentQuestionIndex}
            totalQuestions={questions.length}
            answeredQuestions={answeredIndices}
          />

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />

          {/* Answer input */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={4}
              placeholder="Your spoken answer will appear here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex space-x-4 mt-3">
              <Button
                variant="secondary"
                onClick={listening ? handleStopListening : handleStartListening}
              >
                {listening ? (
                  <>
                    <MicOff className="w-4 h-4 mr-1" /> Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-1" /> Speak Answer
                  </>
                )}
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitAnswer}
                disabled={!text.trim()}
              >
                Submit Answer
              </Button>
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && currentQuestionAnswer && (
            <FeedbackDisplay
              answer={currentQuestionAnswer}
              showSampleAnswer={true}
              sampleAnswer={currentQuestion.sampleAnswer}
            />
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex space-x-4">
              {isLastQuestion && allQuestionsAnswered ? (
                <Button variant="secondary" onClick={handleCompleteInterview}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Complete Interview
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                  disabled={!isCurrentQuestionAnswered}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;