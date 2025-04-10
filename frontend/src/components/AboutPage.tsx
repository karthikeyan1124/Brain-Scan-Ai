import React from 'react';
import { Brain, Award, HeartPulse } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About BrainScan AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leading the way in AI-powered medical imaging analysis for accurate and rapid brain tumor detection.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            BrainScan AI is dedicated to revolutionizing brain tumor detection through advanced artificial intelligence. 
            Our mission is to provide healthcare professionals with rapid, accurate, and reliable diagnostic support tools.
          </p>
          <div className="flex items-center gap-4 mb-4">
            <Award className="text-blue-600" size={24} />
            <span>FDA-cleared technology</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <HeartPulse className="text-blue-600" size={24} />
            <span>99.9% system uptime</span>
          </div>
          <div className="flex items-center gap-4">
            <Brain className="text-blue-600" size={24} />
            <span>Advanced neural networks</span>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Key Features</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm">1</span>
              </div>
              <p>Rapid analysis of MRI scans with high accuracy</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm">2</span>
              </div>
              <p>Detection of multiple tumor types including glioma, meningioma, and pituitary tumors</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm">3</span>
              </div>
              <p>Detailed analysis reports with recommendations</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}