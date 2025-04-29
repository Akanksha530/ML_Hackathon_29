import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Users, Code, BookOpen } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useInterview } from '../context/InterviewContext';
import { createInterview } from '../data/questions';
import { DifficultyLevel, QuestionType } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { startInterview, setUser } = useInterview();
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<QuestionType>('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermediate');

  // Handle starting the interview
  const handleStartInterview = () => {
    if (name) {
      setUser({
        name,
        interviews: [],
      });
    }

    const interview = createInterview(
      `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Interview`,
      `A ${selectedDifficulty} level ${selectedType} interview to practice your skills.`,
      selectedType,
      selectedDifficulty,
      5
    );

    startInterview(interview);
    navigate('/interview');
  };

  // Get label and icon for interview type
  const getInterviewTypeInfo = (type: QuestionType) => {
    switch (type) {
      case 'technical':
        return { 
          label: 'Technical', 
          icon: <Code className="w-6 h-6" />,
          description: 'Technical knowledge, problem-solving, and coding skills.'
        };
      case 'behavioral':
        return { 
          label: 'Behavioral', 
          icon: <Users className="w-6 h-6" />,
          description: 'Past experiences, teamwork, and handling workplace situations.'
        };
      case 'leadership':
        return { 
          label: 'Leadership', 
          icon: <BookOpen className="w-6 h-6" />,
          description: 'Management style, decision making, and team leadership.'
        };
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BrainCircuit className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Master Your Interview Skills with AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Practice interviews with our AI-powered simulator. Get real-time feedback and improve your chances of landing your dream job.
            </p>
            
          </div>
          {/* Interview Setup Section */}
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Start a New Interview</h2>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <h3 className="text-lg font-medium mb-4">Choose Interview Type</h3>
              {/* Render Interview Types */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {['technical', 'behavioral', 'leadership'].map((type) => {
                  const { label, icon, description } = getInterviewTypeInfo(type as QuestionType);
                  const isSelected = selectedType === type;

                  return (
                    <div 
                      key={type}
                      className={`cursor-pointer transition-all duration-200 transform ${
                        isSelected ? 'scale-105' : 'hover:scale-102'
                      }`}
                      onClick={() => setSelectedType(type as QuestionType)}
                    >
                      <Card 
                        className={`h-full ${
                          isSelected 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center p-4">
                          <div className={`p-3 rounded-full mb-4 ${
                            isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {icon}
                          </div>
                          <h3 className="text-lg font-medium mb-2">{label} Interview</h3>
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
              
              {/* Difficulty Selection */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Select Difficulty Level</h3>
                <div className="flex flex-wrap gap-3">
                  {['beginner', 'intermediate', 'advanced', 'expert'].map((difficulty) => (
                    <button
                      key={difficulty}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedDifficulty(difficulty as DifficultyLevel)}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={handleStartInterview}
                  disabled={!selectedType}
                >
                  Start Interview
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;