import React from 'react';

interface GovernmentHeaderProps {
  isDarkMode: boolean;
}

const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ isDarkMode }) => {
  return (
    <>
      {/* Top Government Bar */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-full mx-auto px-4 py-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Government of India</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-700">Ministry of Education</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Government Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-full mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left: Government Emblem */}
            <div className="flex items-center space-x-4">
              {/* National Emblem */}
              <div className="flex items-center space-x-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/100px-Emblem_of_India.svg.png" 
                  alt="Government of India Emblem" 
                  className="w-12 h-12"
                />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Government of India</h1>
                  <p className="text-sm text-gray-700">Ministry of Education</p>
                  <p className="text-xs text-gray-600">सत्यमेव जयते</p>
                </div>
              </div>
            </div>

            {/* Right: Digital India */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs font-medium text-gray-700">Digital India</div>
              </div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Digital_India_logo.png/100px-Digital_India_logo.png" 
                alt="Digital India" 
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Department Header */}
      <div className="bg-blue-800 text-white">
        <div className="max-w-full mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Department of Bioinformatics</h2>
              <p className="text-sm opacity-90">M.Sc. Bioinformatics Program • Academic Management System</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Academic Year 2024-25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentHeader;