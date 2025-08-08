import React, { useState } from 'react';
import { BookOpen, Settings } from 'lucide-react';
import { Subject, Note, PDFResource } from './types/syllabus';
import { useNotes } from './hooks/useNotes';
import { usePDFs } from './hooks/usePDFs';
import { useSyllabus } from './hooks/useSyllabus';
import SubjectCard from './components/SubjectCard';
import DistractionFreeReader from './components/DistractionFreeReader';
import NotesManager from './components/NotesManager';
import NotesReader from './components/NotesReader';
import PDFManager from './components/PDFManager';
import GovernmentHeader from './components/GovernmentHeader';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [departmentName, setDepartmentName] = useState('Department of Bioinformatics');
  const [programName, setProgramName] = useState('M.Sc. Bioinformatics Program');

  // Load department info from localStorage on mount
  React.useEffect(() => {
    const savedDepartment = localStorage.getItem('department-name');
    const savedProgram = localStorage.getItem('program-name');
    if (savedDepartment) setDepartmentName(savedDepartment);
    if (savedProgram) setProgramName(savedProgram);
  }, []);

  const [selectedSemester, setSelectedSemester] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  const [readingSubject, setReadingSubject] = useState<{ subject: Subject; semesterId: number } | null>(null);
  const [notesManager, setNotesManager] = useState<{ subjectCode: string; subjectName: string; semesterId: number } | null>(null);
  const [pdfManager, setPdfManager] = useState<{ subjectCode: string; subjectName: string; semesterId: number } | null>(null);
  const [readingNote, setReadingNote] = useState<Note | null>(null);
  
  const { notes, addNote, updateNote, deleteNote, getNotesForSubject } = useNotes();
  const { pdfs, addPDF, updatePDF, deletePDF, getPDFsForSubject } = usePDFs();
  const { semesters, updateSubject, addUnit, updateUnit, deleteUnit, addSemester } = useSyllabus();

  const currentSemester = semesters.find(sem => sem.id === selectedSemester);

  const handleReadSubject = (subject: Subject, semesterId: number) => {
    setReadingSubject({ subject, semesterId });
  };

  const handleViewNotes = (subjectCode: string, semesterId: number) => {
    const subject = currentSemester?.subjects.find(s => s.code === subjectCode);
    if (subject) {
      setNotesManager({ 
        subjectCode, 
        subjectName: subject.name, 
        semesterId 
      });
    }
  };

  const handleViewPDFs = (subjectCode: string, semesterId: number) => {
    const subject = currentSemester?.subjects.find(s => s.code === subjectCode);
    if (subject) {
      setPdfManager({ 
        subjectCode, 
        subjectName: subject.name, 
        semesterId 
      });
    }
  };

  const handleReadNote = (note: Note) => {
    setReadingNote(note);
  };

  const handleOpenSyllabus = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleReadSubject(currentSemester.subjects[0], selectedSemester);
    } else {
      // If no subjects, still allow opening syllabus view
      console.log('No subjects available in current semester');
    }
  };

  const handleOpenNotes = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleViewNotes(currentSemester.subjects[0].code, selectedSemester);
    }
  };

  const handleOpenPDFs = () => {
    if (currentSemester && currentSemester.subjects && currentSemester.subjects.length > 0) {
      handleViewPDFs(currentSemester.subjects[0].code, selectedSemester);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32">
      {/* Government Header */}
      <GovernmentHeader 
        departmentName={departmentName}
        programName={programName}
      />

      <main className="bg-white">
        {/* Main Content Area */}
        <div className="w-full px-2 md:px-4 py-4">
          {currentSemester && (
            <>
              {/* Semester Header */}
              <div className="bg-white border border-gray-300 mb-4 mx-1 md:mx-0">
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {currentSemester.name}
                      </h2>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium">
                        {currentSemester.totalCredits}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4 flex-wrap">
                      <span className="text-sm text-gray-600">
                        {(currentSemester.subjects || []).length} Subjects
                      </span>
                      <span className="text-xs text-gray-500">
                        Last Updated: {new Date().toLocaleDateString('en-IN')}
                      </span>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Settings
                      </button>
                      <select
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full md:w-auto"
                      >
                        <option value={1}>Semester I</option>
                        <option value={2}>Semester II</option>
                        <option value={3}>Semester III</option>
                        <option value={4}>Semester IV</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects Grid */}
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 px-1 md:px-0" : "space-y-2 px-1 md:px-0"}>
                {(currentSemester.subjects || []).map((subject) => (
                  <SubjectCard
                    key={subject.code}
                    subject={subject}
                    semesterId={selectedSemester}
                    viewMode={viewMode}
                    onReadSubject={handleReadSubject}
                    onViewNotes={handleViewNotes}
                    onViewPDFs={handleViewPDFs}
                    notesCount={getNotesForSubject(subject.code, selectedSemester).length}
                    pdfsCount={getPDFsForSubject(subject.code, selectedSemester).length}
                  />
                ))}
              </div>

              {(!currentSemester.subjects || currentSemester.subjects.length === 0) && (
                <div className="text-center py-8 bg-white border border-gray-200">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects available</h3>
                  <p className="text-gray-600">This semester doesn't have any subjects listed yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Distraction-Free Reader */}
      {readingSubject && (
        <DistractionFreeReader
          subject={readingSubject.subject}
          semesterId={readingSubject.semesterId}
          isDarkMode={false}
          onClose={() => setReadingSubject(null)}
          onCreateNote={(title, content) => {
            addNote({
              title,
              content,
              subjectCode: readingSubject.subject.code,
              semesterId: readingSubject.semesterId,
            });
          }}
          onUpdateSubject={(updates) => {
            updateSubject(readingSubject.semesterId, readingSubject.subject.code, updates);
          }}
          onAddUnit={(unit) => {
            addUnit(readingSubject.semesterId, readingSubject.subject.code, unit);
          }}
          onUpdateUnit={(unitIndex, unit) => {
            updateUnit(readingSubject.semesterId, readingSubject.subject.code, unitIndex, unit);
          }}
          onDeleteUnit={(unitIndex) => {
            deleteUnit(readingSubject.semesterId, readingSubject.subject.code, unitIndex);
          }}
        />
      )}

      {/* Notes Manager */}
      {notesManager && (
        <NotesManager
          subjectCode={notesManager.subjectCode}
          subjectName={notesManager.subjectName}
          semesterId={notesManager.semesterId}
          isDarkMode={false}
          notes={getNotesForSubject(notesManager.subjectCode, notesManager.semesterId)}
          onClose={() => setNotesManager(null)}
          onAddNote={addNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onReadNote={handleReadNote}
        />
      )}

      {/* PDF Manager */}
      {pdfManager && (
        <PDFManager
          subjectCode={pdfManager.subjectCode}
          subjectName={pdfManager.subjectName}
          semesterId={pdfManager.semesterId}
          isDarkMode={false}
          pdfs={getPDFsForSubject(pdfManager.subjectCode, pdfManager.semesterId)}
          onClose={() => setPdfManager(null)}
          onAddPDF={addPDF}
          onUpdatePDF={updatePDF}
          onDeletePDF={deletePDF}
        />
      )}

      {/* Notes Reader */}
      {readingNote && (
        <NotesReader
          note={readingNote}
          isDarkMode={false}
          onClose={() => setReadingNote(null)}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          departmentName={departmentName}
          programName={programName}
          onDepartmentChange={setDepartmentName}
          onProgramChange={setProgramName}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedSemester={selectedSemester}
          onSemesterChange={setSelectedSemester}
          semesters={semesters}
          onUpdateSemester={updateSubject}
          onAddSemester={addSemester}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;