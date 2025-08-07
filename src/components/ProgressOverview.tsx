import React from 'react';
import { Course, Progress } from '../types/syllabus';
import { TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface ProgressOverviewProps {
  course: Course;
  progress: Progress;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({ course, progress }) => {
  const getStatusColor = () => {
    if (progress.isOnTrack) return 'text-green-600';
    if (progress.weeksBehind <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = () => {
    if (progress.isOnTrack) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (progress.weeksBehind <= 2) return <Clock className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  const getStatusText = () => {
    if (progress.isOnTrack) return 'On Track';
    if (progress.weeksBehind <= 2) return 'Slightly Behind';
    return 'Significantly Behind';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{course.name}</h2>
          <p className="text-gray-600">{course.code} • {course.semester}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="mb-3">
            <div className="flex items-end space-x-1">
              <span className="text-3xl font-bold text-blue-600">
                {Math.round(progress.completionPercentage)}
              </span>
              <span className="text-blue-600 font-medium pb-1">%</span>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Topics */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="mb-3">
            <div className="flex items-end space-x-1">
              <span className="text-3xl font-bold text-green-600">
                {progress.completedTopics}
              </span>
              <span className="text-green-600 font-medium pb-1">
                / {progress.totalTopics}
              </span>
            </div>
          </div>
          <p className="text-sm text-green-700">topics completed</p>
        </div>

        {/* Time Status */}
        <div className={`bg-gradient-to-r ${
          progress.isOnTrack ? 'from-green-50 to-emerald-50' : 'from-orange-50 to-red-50'
        } rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Schedule</h3>
            <Clock className={`w-5 h-5 ${progress.isOnTrack ? 'text-green-600' : 'text-orange-600'}`} />
          </div>
          <div className="mb-3">
            <div className="flex items-end space-x-1">
              <span className={`text-3xl font-bold ${
                progress.isOnTrack ? 'text-green-600' : 'text-orange-600'
              }`}>
                {progress.weeksBehind}
              </span>
              <span className={`font-medium pb-1 ${
                progress.isOnTrack ? 'text-green-600' : 'text-orange-600'
              }`}>
                weeks
              </span>
            </div>
          </div>
          <p className={`text-sm ${progress.isOnTrack ? 'text-green-700' : 'text-orange-700'}`}>
            {progress.isOnTrack ? 'ahead/on time' : 'behind schedule'}
          </p>
        </div>

        {/* Course Duration */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Duration</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mb-3">
            <div className="flex items-end space-x-1">
              <span className="text-3xl font-bold text-purple-600">
                {course.totalWeeks}
              </span>
              <span className="text-purple-600 font-medium pb-1">weeks</span>
            </div>
          </div>
          <p className="text-sm text-purple-700">total course length</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;