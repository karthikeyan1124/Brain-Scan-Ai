import React from 'react';
import { Brain } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Brain className="text-blue-600" size={32} />
            <span className="font-semibold text-xl">BrainScan AI</span>
          </div>
          
          <div className="flex gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('upload')}
              className={`${currentPage === 'upload' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
            >
              Upload Scan
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}