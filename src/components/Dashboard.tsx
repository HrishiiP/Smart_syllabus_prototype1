import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';
import { Course, Topic, Progress } from '../types/syllabus';
import Header from './Header';
import ProgressOverview from './ProgressOverview';
import CourseList from './CourseList';
import TopicManager from './TopicManager';
import AlertPanel from './AlertPanel';
import AddCourseModal from './AddCourseModal';
import { BookOpen, Plus } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddCourse, setShowAddCourse] = useState(false);

  useEffect(() => {
    // Load sample data
    const sampleCourses: Course[] = [
      {
        id: '1',
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        semester: 'Fall 2024',
        instructor: 'Dr. Sarah Johnson',
        totalWeeks: 16,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-15'),
        topics: [
          {
            id: '1',
            title: 'Introduction to Data Structures',
            description: 'Basic concepts and terminology',
            isCompleted: true,
            completedAt: new Date('2024-09-02'),
            estimatedHours: 3,
            actualHours: 3,
            week: 1
          },
          {
            id: '2',
            title: 'Arrays and Linked Lists',
            description: 'Implementation and operations',
            isCompleted: true,
            completedAt: new Date('2024-09-09'),
            estimatedHours: 4,
            actualHours: 5,
            week: 2
          },
          {
            id: '3',
            title: 'Stacks and Queues',
            description: 'LIFO and FIFO data structures',
            isCompleted: false,
            estimatedHours: 4,
            week: 3
          },
          {
            id: '4',
            title: 'Trees and Binary Search Trees',
            description: 'Hierarchical data structures',
            isCompleted: false,
            estimatedHours: 6,
            week: 4
          }
        ]
      },
      {
        id: '2',
        name: 'Database Management Systems',
        code: 'CS301',
        semester: 'Fall 2024',
        instructor: 'Prof. Michael Chen',
        totalWeeks: 16,
        startDate: new Date('2024-08-26'),
        endDate: new Date('2024-12-15'),
        topics: [
          {
            id: '5',
            title: 'Introduction to Databases',
            description: 'Database concepts and models',
            isCompleted: true,
            completedAt: new Date('2024-09-01'),
            estimatedHours: 3,
            actualHours: 3,
            week: 1
          },
          {
            id: '6',
            title: 'Relational Model',
            description: 'Tables, keys, and relationships',
            isCompleted: false,
            estimatedHours: 4,
            week: 2
          }
        ]
      }
    ];
    setCourses(sampleCourses);
    setSelectedCourse(sampleCourses[0]);
  }, []);

  const calculateProgress = (course: Course): Progress => {
    const completedTopics = course.topics.filter(t => t.isCompleted).length;
    const totalTopics = course.topics.length;
    const completionPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    
    const currentWeek = Math.ceil(
      (new Date().getTime() - course.startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    
    const expectedCompleted = Math.floor((currentWeek / course.totalWeeks) * totalTopics);
    const weeksBehind = Math.max(0, expectedCompleted - completedTopics);
    
    return {
      completedTopics,
      totalTopics,
      completionPercentage,
      weeksBehind,
      isOnTrack: weeksBehind <= 1
    };
  };

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'topics'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      topics: []
    };
    
    setCourses(prev => [...prev, newCourse]);
    setSelectedCourse(newCourse);
  };

  const handleToggleComplete = (topicId: string) => {
    if (!selectedCourse) return;

    setCourses(prev => prev.map(course => 
      course.id === selectedCourse.id 
        ? {
            ...course,
            topics: course.topics.map(topic => 
              topic.id === topicId 
                ? {
                    ...topic,
                    isCompleted: !topic.isCompleted,
                    completedAt: !topic.isCompleted ? new Date() : undefined
                  }
                : topic
            )
          }
        : course
    ));

    setSelectedCourse(prev => prev ? {
      ...prev,
      topics: prev.topics.map(topic => 
        topic.id === topicId 
          ? {
              ...topic,
              isCompleted: !topic.isCompleted,
              completedAt: !topic.isCompleted ? new Date() : undefined
            }
          : topic
      )
    } : null);
  };

  const progress = selectedCourse ? calculateProgress(selectedCourse) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            {user.role === UserRole.FACULTY 
              ? 'Manage your courses and track syllabus progress'
              : 'Stay updated on your learning progress'
            }
          </p>
        </div>

        {/* Progress Overview */}
        {selectedCourse && progress && (
          <ProgressOverview course={selectedCourse} progress={progress} />
        )}

        {/* Alert Panel */}
        {selectedCourse && progress && !progress.isOnTrack && (
          <AlertPanel course={selectedCourse} progress={progress} />
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Courses</h2>
                  {user.role === UserRole.FACULTY && (
                    <button
                      onClick={() => setShowAddCourse(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Course</span>
                    </button>
                  )}
                </div>
              </div>
              <CourseList 
                courses={courses}
                selectedCourse={selectedCourse}
                onSelectCourse={setSelectedCourse}
                calculateProgress={calculateProgress}
              />
            </div>
          </div>

          {/* Topic Manager */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <TopicManager 
                course={selectedCourse}
                onToggleComplete={handleToggleComplete}
                userRole={user.role}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Course</h3>
                <p className="text-gray-600">Choose a course from the sidebar to view and manage syllabus progress.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={showAddCourse}
        onClose={() => setShowAddCourse(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
};

export default Dashboard;