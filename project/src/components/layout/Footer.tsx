import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} InterviewAI. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">Privacy</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">Terms</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;