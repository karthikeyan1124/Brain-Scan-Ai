import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ResultsSectionProps {
  results: {
    classification: string;
    confidence: number;
    tumor_info: {
      type: string;
      description: string;
      recommendation: string;
      severity: string;
    };
  };
  scanImage: string;
}

export default function ResultsSection({ results, scanImage }: ResultsSectionProps) {
  const generatePDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`brain-scan-report-${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div id="report-content" className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <button 
            onClick={generatePDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Download size={20} />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Scan Image</h3>
            <img
              src={scanImage}
              alt="Brain scan"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Analysis Details</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Classification:</p>
                <p className="text-lg">{results.tumor_info.type}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Confidence:</p>
                <p className="text-lg">{(results.confidence * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Severity:</p>
                <p className="text-lg">{results.tumor_info.severity}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Description:</p>
                <p className="text-gray-800">{results.tumor_info.description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <p className="text-gray-800">{results.tumor_info.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}