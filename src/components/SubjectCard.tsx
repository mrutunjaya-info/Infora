import React from 'react';
import { Subject } from '../types/syllabus';
import { BookOpen, FileText, StickyNote } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  semesterId: number;
  isDarkMode: boolean;
  onReadSubject: (subject: Subject, semesterId: number) => void;
  onViewNotes: (subjectCode: string, semesterId: number) => void;
  onViewPDFs: (subjectCode: string, semesterId: number) => void;
  notesCount: number;
  pdfsCount: number;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  semesterId,
  isDarkMode,
  onReadSubject,
  onViewNotes,
  onViewPDFs,
  notesCount,
  pdfsCount,
}) => {
  return (
    <div className="bg-white border border-gray-300 hover:shadow-sm transition-shadow">
      {/* Card Header */}
      <div className="px-3 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {subject.code}
              </h3>
              <span className="text-xs text-gray-600">{subject.credits} Credits</span>
            </div>
          </div>
          <button
            onClick={() => onReadSubject(subject, semesterId)}
            className="px-3 py-1 bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3">
        <h4 className="font-medium text-gray-900 mb-2 text-sm line-clamp-2">
          {subject.name}
        </h4>
        
        {subject.objective && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {subject.objective}
          </p>
        )}

        {/* Stats */}
        <div className="mb-3">
          <span className="text-xs text-gray-500">
            {(subject.units || []).length} Units
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewNotes(subject.code, semesterId)}
            className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs transition-colors"
          >
            <StickyNote className="w-4 h-4 mr-1" />
            Notes ({notesCount})
          </button>
          <button
            onClick={() => onViewPDFs(subject.code, semesterId)}
            className="flex items-center px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs transition-colors"
          >
            <FileText className="w-4 h-4 mr-1" />
            PDFs ({pdfsCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;