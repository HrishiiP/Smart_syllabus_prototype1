import React from 'react';
import { Course, Progress } from '../types/syllabus';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  selectedCourse: Course | null;
  onSelectCourse: (course: Course) => void;
  calculateProgress: (course: Course) => Progress;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  selectedCourse, 
  onSelectCourse, 
  calculateProgress 
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {courses.map((course) => {
        const progress = calculateProgress(course);
        const isSelected = selectedCourse?.id === course.id;

        return (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
              isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  isSelected ? 'text-blue-900' : 'text-gray-900'
                } mb-1`}>
                  {course.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {course.code} • {course.instructor}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>{progress.completedTopics}/{progress.totalTopics} topics</span>
                    <span>{Math.round(progress.completionPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        progress.isOnTrack ? 'bg-green-500' : 
                        progress.weeksBehind <= 2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${progress.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-1">
                  {progress.isOnTrack ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : progress.weeksBehind <= 2 ? (
                    <Clock className="w-3 h-3 text-yellow-500" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    progress.isOnTrack ? 'text-green-600' : 
                    progress.weeksBehind <= 2 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {progress.isOnTrack ? 'On Track' : 
                     progress.weeksBehind <= 2 ? 'Behind' : 'Critical'}
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CourseList;