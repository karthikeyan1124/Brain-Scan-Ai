import React, { useState } from 'react';
import { Brain, Activity, Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import UploadSection from './components/UploadSection';
import ResultsSection from './components/ResultsSection';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Changed to 'file' to match FastAPI endpoint

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setSelectedImage(URL.createObjectURL(file));
      setAnalysisResults(data);
      setCurrentPage('results');
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gray-900">Advanced Brain Tumor</span>
              <br />
              <span className="text-blue-600">Detection & Analysis</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Leverage the power of AI for accurate brain tumor detection and comprehensive
              diagnostic insights. Upload your scan and receive detailed analysis within minutes.
            </p>
            <button
              onClick={() => setCurrentPage('upload')}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload a Scan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced AI Analysis</h3>
              <p className="text-gray-600">State-of-the-art neural networks for accurate tumor detection</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Insights</h3>
              <p className="text-gray-600">Comprehensive analysis of tumor type and characteristics</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your medical data is encrypted and protected</p>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'upload' && (
        <UploadSection onUpload={handleImageUpload} />
      )}

      {currentPage === 'results' && analysisResults && (
        <ResultsSection results={analysisResults} scanImage={selectedImage} />
      )}

      {currentPage === 'about' && <AboutPage />}
      
      {currentPage === 'contact' && <ContactPage />}

      <footer className="mt-auto py-8 text-center text-gray-600 border-t">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="text-blue-600" size={24} />
          <span className="font-semibold">BrainScan AI</span>
        </div>
        <p>© 2025 BrainScan AI. This tool is not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
}

export default App;