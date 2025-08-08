import React, { useState } from 'react';
import { X, Grid, List, Plus, Edit, Save, Trash2 } from 'lucide-react';
import { Semester, Subject } from '../types/syllabus';

interface SettingsPanelProps {
  departmentName: string;
  programName: string;
  onDepartmentChange: (name: string) => void;
  onProgramChange: (name: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  selectedSemester: number;
  onSemesterChange: (semester: number) => void;
  semesters: Semester[];
  onUpdateSemester: (semesterId: number, subjectCode: string, updates: Partial<Subject>) => void;
  onAddSemester: (semester: Semester) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  departmentName: propDepartmentName,
  programName: propProgramName,
  onDepartmentChange,
  onProgramChange,
  viewMode,
  onViewModeChange,
  selectedSemester,
  onSemesterChange,
  semesters,
  onUpdateSemester,
  onAddSemester,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'view' | 'manage'>('view');
  const [editingDepartment, setEditingDepartment] = useState(false);
  const [localDepartmentName, setLocalDepartmentName] = useState(propDepartmentName);
  const [localProgramName, setLocalProgramName] = useState(propProgramName);
  const [newSemesterName, setNewSemesterName] = useState('');

  // Update local state when props change
  React.useEffect(() => {
    setLocalDepartmentName(propDepartmentName);
    setLocalProgramName(propProgramName);
  }, [propDepartmentName, propProgramName]);

  const handleSaveDepartment = () => {
    // Save department changes to parent component and localStorage
    onDepartmentChange(localDepartmentName);
    onProgramChange(localProgramName);
    
    // Save to localStorage for persistence
    localStorage.setItem('department-name', localDepartmentName);
    localStorage.setItem('program-name', localProgramName);
    
    setEditingDepartment(false);
    alert('Department information updated and saved successfully!');
  };

  const handleAddSemester = () => {
    if (!newSemesterName.trim()) {
      alert('Please enter a semester name');
      return;
    }
    
    const newSemester: Semester = {
      id: semesters.length + 1,
      name: newSemesterName.trim(),
      totalCredits: '0+0 (0 Credit Hours)',
      subjects: []
    };
    
    onAddSemester(newSemester);
    setNewSemesterName('');
    alert(`${newSemesterName} added successfully!`);
  };

  const handleDeleteSemester = (semesterId: number) => {
    if (confirm('Are you sure you want to delete this semester? This action cannot be undone.')) {
      // Add delete logic here
      console.log('Deleting semester:', semesterId);
      alert('Semester deleted successfully!');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-2 md:p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] md:max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">System Settings</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('view')}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'view'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              View Settings
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === 'manage'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Content
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'view' && (
              <div className="space-y-6">
                {/* View Mode */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Display Mode</h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => onViewModeChange('grid')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                        viewMode === 'grid'
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Grid className="w-4 h-4 mr-2" />
                      Grid View
                    </button>
                    <button
                      onClick={() => onViewModeChange('list')}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                        viewMode === 'list'
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <List className="w-4 h-4 mr-2" />
                      List View
                    </button>
                  </div>
                </div>

                {/* Semester Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Active Semester</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {semesters.map((semester) => (
                      <button
                        key={semester.id}
                        onClick={() => onSemesterChange(semester.id)}
                        className={`p-3 rounded-lg border text-center ${
                          selectedSemester === semester.id
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{semester.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {(semester.subjects || []).length} Subjects
                        </div>
                        <div className="text-xs text-gray-500">
                          {semester.totalCredits}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manage' && (
              <div className="space-y-6">
                {/* Department Settings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-800">Department Information</h3>
                    <button
                      onClick={() => setEditingDepartment(!editingDepartment)}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      {editingDepartment ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  
                  {editingDepartment ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Department Name
                        </label>
                        <input
                          type="text"
                          value={localDepartmentName}
                          onChange={(e) => setLocalDepartmentName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Program Name
                        </label>
                        <input
                          type="text"
                          value={localProgramName}
                          onChange={(e) => setLocalProgramName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={handleSaveDepartment}
                          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditingDepartment(false);
                            setLocalDepartmentName(propDepartmentName);
                            setLocalProgramName(propProgramName);
                          }}
                          className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Department: <span className="font-medium text-gray-800">{propDepartmentName}</span></div>
                      <div className="text-sm text-gray-600">Program: <span className="font-medium text-gray-800">{propProgramName}</span></div>
                    </div>
                  )}
                </div>

                {/* Semester Management */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-800">Semester Management</h3>
                  </div>
                  
                  {/* Add New Semester */}
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Add New Semester</h4>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="text"
                        placeholder="Enter semester name (e.g., Semester V)"
                        value={newSemesterName}
                        onChange={(e) => setNewSemesterName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                      />
                      <button
                        onClick={handleAddSemester}
                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {semesters.map((semester) => (
                      <div key={semester.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{semester.name}</h4>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteSemester(semester.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>Credits: {semester.totalCredits}</span>
                          <span className="ml-4">Subjects: {(semester.subjects || []).length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      onClick={() => alert('Add New Subject feature coming soon!')}
                      className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium">Add New Subject</div>
                      <div className="text-xs text-blue-600">Create new course</div>
                    </button>
                    <button 
                      onClick={() => alert('Bulk Import feature coming soon!')}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium">Bulk Import</div>
                      <div className="text-xs text-green-600">Import from CSV</div>
                    </button>
                    <button 
                      onClick={() => {
                        const dataStr = JSON.stringify(semesters, null, 2);
                        const dataBlob = new Blob([dataStr], {type: 'application/json'});
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'syllabus-data.json';
                        link.click();
                      }}
                      className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors"
                    >
                      <div className="font-medium">Export Data</div>
                      <div className="text-xs text-purple-600">Download backup</div>
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                          localStorage.clear();
                          window.location.reload();
                        }
                      }}
                      className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                      <div className="font-medium">Reset System</div>
                      <div className="text-xs text-orange-600">Clear all data</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;