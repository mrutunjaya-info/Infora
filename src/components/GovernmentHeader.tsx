import React, { useEffect, useState } from 'react';

interface GovernmentHeaderProps {
  isDarkMode?: boolean; // Optional prop
  departmentName: string;
  programName: string;
}

const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({ 
  isDarkMode = false, 
  departmentName, 
  programName 
}) => {
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
      <div className={`fixed bottom-0 w-full border-t z-50 ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
        <div className="max-w-full mx-auto px-4 py-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">🕐 {formatTime(currentTime)}</span>
            <span className="opacity-80">IST (Indian Standard Time)</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-300'}`}>
        
        {/* Top Bar */}
        <div className="max-w-full mx-auto px-4 py-1">
          <div className="flex items-center justify-between text-xs flex-wrap">
            <div className="flex items-center space-x-4">
              <span>Bioinformatics by Mrutunjaya.</span>
              <span>•</span>
              <span>Science</span>
            </div>
            <span>Last Updated: {new Date().toLocaleDateString('en-IN')}</span>
          </div>
        </div>

        {/* Thin Divider Below Top Bar */}
        <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-300'} border-b`} />

        {/* Main Header */}
        <div className="max-w-full mx-auto px-3 py-1">
          <div className="flex items-center justify-between flex-wrap">
            {/* Emblem */}
            <div className="flex items-center space-x-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/1193px-SARS-CoV-2_without_background.png?20210922032455" 
                alt="Government of India Emblem" 
                className="w-6 h-8"
              />
              <div>
                <h1 className="text-xs md:text-sm font-bold">Bioinformatics of India</h1>
                <p className="text-xs hidden md:block">Infora of Education • सत्यमेव जयते</p>
              </div>
            </div>

            {/* Digital India Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <div className="text-xs font-medium"></div>
              </div>
              <img 
                src="https://w7.pngwing.com/pngs/978/407/png-transparent-government-of-india-ministry-of-skill-development-and-entrepreneurship-national-skill-development-corporation-national-skill-development-agency-skill-company-text-hand-thumbnail.png" 
                alt="Digital India" 
                className="w-10 h-6"
                onError={(e) => {
                  e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Digital_India_logo.svg/100px-Digital_India_logo.svg.png";
                }}
              />
            </div>
          </div>
        </div>

        {/* Department Header */}
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap bg-blue-800 text-white py-0 -mx-4 px-1">
            <div>
              <h2 className="text-sm md:text-lg font-bold">{departmentName}</h2>
              <p className="text-xs opacity-90 hidden md:block">{programName} • Academic Management System</p>
            </div>
            <p className="text-xs">Academic Year 2024-25</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentHeader;
