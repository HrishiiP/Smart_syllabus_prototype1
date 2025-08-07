import React, { useState } from 'react';
import { Course, Topic } from '../types/syllabus';
import { UserRole } from '../types/user';
import AddTopicModal from './AddTopicModal';
import { CheckCircle, Clock, Edit2, Plus, Calendar } from 'lucide-react';

interface TopicManagerProps {
  course: Course;
  onToggleComplete: (topicId: string) => void;
  onAddTopic: (topic: Omit<Topic, 'id' | 'isCompleted' | 'completedAt'>) => void;
  userRole: UserRole;
}

const TopicManager: React.FC<TopicManagerProps> = ({ course, onToggleComplete, onAddTopic, userRole }) => {
  const [showAddTopic, setShowAddTopic] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getWeekStatus = (topic: Topic) => {
    const currentWeek = Math.ceil(
      (new Date().getTime() - course.startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    
    if (topic.isCompleted) return 'completed';
    if (currentWeek >= topic.week) return 'current';
    return 'upcoming';
  };

  const handleAddTopic = (topicData: Omit<Topic, 'id' | 'isCompleted' | 'completedAt'>) => {
    onAddTopic(topicData);
  };

  const groupedTopics = course.topics.reduce((acc, topic) => {
    const week = topic.week;
    if (!acc[week]) acc[week] = [];
    acc[week].push(topic);
    return acc;
  }, {} as Record<number, Topic[]>);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Syllabus Topics</h2>
            <p className="text-gray-600 mt-1">Track progress week by week</p>
          </div>
          {userRole === UserRole.FACULTY && (
            <button
              onClick={() => setShowAddTopic(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Topic</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Add Topic Modal */}
      <AddTopicModal
        isOpen={showAddTopic}
        onClose={() => setShowAddTopic(false)}
        onAddTopic={handleAddTopic}
        totalWeeks={course.totalWeeks}
      />

      <div className="p-6">
        <div className="space-y-8">
          {Object.keys(groupedTopics)
            .map(Number)
            .sort((a, b) => a - b)
            .map(weekNumber => {
              const topics = groupedTopics[weekNumber];
              const completedTopics = topics.filter(t => t.isCompleted).length;
              const weekProgress = (completedTopics / topics.length) * 100;

              return (
                <div key={weekNumber} className="relative">
                  {/* Week Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Week {weekNumber}
                      </h3>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${weekProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {completedTopics}/{topics.length} completed
                    </span>
                  </div>

                  {/* Topics for this week */}
                  <div className="space-y-3 ml-9">
                    {topics.map((topic) => {
                      const status = getWeekStatus(topic);
                      
                      return (
                        <div
                          key={topic.id}
                          className={`border rounded-lg p-4 transition-all hover:shadow-sm ${
                            topic.isCompleted 
                              ? 'border-green-200 bg-green-50' 
                              : status === 'current' 
                                ? 'border-blue-200 bg-blue-50'
                                : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            {/* Completion Toggle */}
                            <button
                              onClick={() => onToggleComplete(topic.id)}
                              disabled={userRole === UserRole.STUDENT}
                              className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                topic.isCompleted
                                  ? 'border-green-500 bg-green-500'
                                  : 'border-gray-300 hover:border-blue-500'
                              } ${userRole === UserRole.STUDENT ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                              {topic.isCompleted && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </button>

                            {/* Topic Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className={`font-semibold ${
                                    topic.isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                                  }`}>
                                    {topic.title}
                                  </h4>
                                  <p className={`text-sm mt-1 ${
                                    topic.isCompleted ? 'text-green-600' : 'text-gray-600'
                                  }`}>
                                    {topic.description}
                                  </p>
                                  
                                  {/* Time tracking */}
                                  <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                                      <Clock className="w-3 h-3" />
                                      <span>Est: {topic.estimatedHours}h</span>
                                      {topic.actualHours && (
                                        <span>• Actual: {topic.actualHours}h</span>
                                      )}
                                    </div>
                                    {topic.completedAt && (
                                      <span className="text-xs text-green-600">
                                        Completed: {formatDate(topic.completedAt)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Actions */}
                                {userRole === UserRole.FACULTY && (
                                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopicManager;