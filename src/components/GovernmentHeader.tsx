import React, { useEffect, useState } from 'react';

interface GovernmentHeaderProps {
  isDarkMode: boolean; // You can choose to use this or remove if unused
}

const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ isDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
    });
  };

  return (
    <>
      {/* Real-time Clock Footer */}
<div className="fixed bottom-0 w-full bg-gray-50 border-t border-gray-200 z-50">
  <div className="max-w-full mx-auto px-4 py-1">
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">🕐 {formatTime(currentTime)}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">IST (Indian Standard Time)</span>
      </div>
    </div>
  </div>
</div>

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
      <div className="bg-white border-b border-gray-300 py-1">
        <div className="max-w-full mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            {/* Left: Government Emblem */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/100px-Emblem_of_India.svg.png" 
                  alt="Government of India Emblem" 
                  className="w-8 h-8"
                />
                <div>
                  <h1 className="text-sm font-bold text-gray-900">Government of India</h1>
                  <p className="text-xs text-gray-700">Ministry of Education • सत्यमेव जयते</p>
                </div>
              </div>
            </div>

            {/* Right: Digital India */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs font-medium text-gray-700">Digital India Initiative</div>
              </div>
              <img 
                src="https://www.digitalindia.gov.in/themes/custom/digital_india/logo.png" 
                alt="Digital India" 
                className="w-6 h-6"
                onError={(e) => {
                  e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Digital_India_logo.svg/100px-Digital_India_logo.svg.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Department Header */}
      <div className="bg-blue-800 text-white py-1">
        <div className="max-w-full mx-auto px-4 py-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Department of Bioinformatics</h2>
              <p className="text-xs opacity-90">M.Sc. Bioinformatics Program • Academic Management System</p>
            </div>
            <div className="text-right">
              <p className="text-xs">Academic Year 2024-25</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentHeader;