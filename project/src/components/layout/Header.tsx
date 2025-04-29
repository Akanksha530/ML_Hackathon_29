import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = 'AI Interview Simulator',
  showLogo = true,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    console.log('User logged out');
    navigate('/Signup');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            {showLogo && (
              <div className="flex-shrink-0 flex items-center">
                <BrainCircuit className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  InterviewAI
                </span>
              </div>
            )}
            {title && title !== 'AI Interview Simulator' && (
              <div className="ml-6 text-lg font-medium text-gray-900">
                {title}
              </div>
            )}
          </div>

          {/* Center-Aligned Navigation Links */}
          <nav className="flex-grow flex justify-center space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium align-middle">
              Home
            </a>
            <a href="/interview" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium align-middle">
              My Interviews
            </a>
            <a href="/practice" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium align-middle">
              Practice
            </a>
          </nav>

          {/* Login and Signup Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogin}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;