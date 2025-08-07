import React from 'react';
import { Course, Progress } from '../types/syllabus';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';

interface AlertPanelProps {
  course: Course;
  progress: Progress;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ course, progress }) => {
  const getSeverityColor = () => {
    if (progress.weeksBehind <= 1) return 'border-yellow-200 bg-yellow-50';
    if (progress.weeksBehind <= 3) return 'border-orange-200 bg-orange-50';
    return 'border-red-200 bg-red-50';
  };

  const getSeverityText = () => {
    if (progress.weeksBehind <= 1) return 'Minor Delay';
    if (progress.weeksBehind <= 3) return 'Significant Delay';
    return 'Critical Delay';
  };

  const getSeverityIcon = () => {
    if (progress.weeksBehind <= 1) return <Clock className="w-5 h-5 text-yellow-600" />;
    if (progress.weeksBehind <= 3) return <TrendingDown className="w-5 h-5 text-orange-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (progress.weeksBehind <= 1) {
      recommendations.push('Consider dedicating extra time this week to catch up');
      recommendations.push('Review current topics to ensure understanding');
    } else if (progress.weeksBehind <= 3) {
      recommendations.push('Schedule additional study sessions');
      recommendations.push('Consider office hours or tutoring support');
      recommendations.push('Prioritize upcoming high-impact topics');
    } else {
      recommendations.push('Immediate intervention required');
      recommendations.push('Meet with instructor to discuss catch-up plan');
      recommendations.push('Consider course load adjustment if necessary');
    }
    
    return recommendations;
  };

  return (
    <div className={`rounded-xl border-2 p-6 mb-8 ${getSeverityColor()}`}>
      <div className="flex items-start space-x-4">
        {getSeverityIcon()}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {getSeverityText()} Detected
            </h3>
            <span className="text-sm font-medium text-gray-600">
              {progress.weeksBehind} week{progress.weeksBehind > 1 ? 's' : ''} behind
            </span>
          </div>
          
          <p className="text-gray-700 mb-4">
            The syllabus progress for <strong>{course.name}</strong> is falling behind schedule. 
            You have completed {progress.completedTopics} out of {progress.totalTopics} topics 
            ({Math.round(progress.completionPercentage)}% completion).
          </p>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Recommended Actions:</h4>
            <ul className="space-y-1">
              {getRecommendations().map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;