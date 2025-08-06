import React, { useState } from 'react';
import { Plus, BookOpen, StickyNote, FileText, X } from 'lucide-react';

interface FloatingActionButtonProps {
  isDarkMode: boolean;
  onOpenSyllabus: () => void;
  onOpenNotes: () => void;
  onOpenPDFs: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  isDarkMode,
  onOpenSyllabus,
  onOpenNotes,
  onOpenPDFs,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-20"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating Action Button Container - Centered */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative flex flex-col items-center space-y-3">
          {/* Sub buttons */}
          <div className={`flex flex-col items-center space-y-2 transition-all duration-300 ease-out ${
            isExpanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}>
            {/* Syllabus Button */}
            <button
              onClick={() => handleAction(onOpenSyllabus)}
              className={`flex items-center space-x-2 px-4 py-2 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 shadow-lg' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-lg'
              } rounded-full shadow-lg transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              style={{ transitionDelay: isExpanded ? '100ms' : '0ms' }}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Syllabus</span>
            </button>

            {/* Notes Button */}
            <button
              onClick={() => handleAction(onOpenNotes)}
              className={`flex items-center space-x-2 px-4 py-2 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 shadow-lg' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-lg'
              } rounded-full shadow-lg transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              style={{ transitionDelay: isExpanded ? '150ms' : '0ms' }}
            >
              <StickyNote className="w-4 h-4" />
              <span className="text-sm font-medium">Notes</span>
            </button>

            {/* PDFs Button */}
            <button
              onClick={() => handleAction(onOpenPDFs)}
              className={`flex items-center space-x-2 px-4 py-2 ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-600 text-white hover:bg-gray-700 shadow-lg' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-lg'
              } rounded-full shadow-lg transition-all duration-200 hover:scale-105 whitespace-nowrap`}
              style={{ transitionDelay: isExpanded ? '200ms' : '0ms' }}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">PDFs</span>
            </button>
          </div>

          {/* Main FAB with Navigation text */}
          <button
            onClick={toggleExpanded}
            className={`flex items-center justify-center space-x-2 px-6 py-3 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-600 to-green-600 text-white hover:from-orange-700 hover:to-green-700 shadow-lg' 
                : 'bg-gradient-to-r from-orange-500 to-green-600 text-white hover:from-orange-600 hover:to-green-700 shadow-lg'
            } rounded-full shadow-xl transition-all duration-300 ease-out transform hover:scale-110 whitespace-nowrap`}
          >
            {isExpanded ? (
              <>
                <X className="w-5 h-5" />
                <span className="text-sm font-medium">Close</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Navigation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButton;