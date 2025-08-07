import React, { useState } from 'react';
import { User, UserRole } from '../types/user';
import { BookOpen, GraduationCap, Users, TrendingUp } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    course: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !formData.name || !formData.email) return;

    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: selectedRole,
      department: formData.department || undefined,
      course: formData.course || undefined
    };

    onLogin(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SyllabusTracker</h1>
                <p className="text-sm text-gray-600">Smart Progress Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Track Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Syllabus Progress</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Never lose track of course completion again. Visual dashboards, progress tracking, and collaborative tools for modern education.
          </p>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visual Progress</h3>
              <p className="text-gray-600 text-sm">Real-time syllabus completion tracking with intuitive charts</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Collaborative</h3>
              <p className="text-gray-600 text-sm">Students and faculty working together on course progress</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <GraduationCap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Alerts</h3>
              <p className="text-gray-600 text-sm">Get notified when falling behind schedule</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-md mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h3>
            <p className="text-gray-600">Choose your role to continue</p>
          </div>

          {!selectedRole ? (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedRole(UserRole.FACULTY)}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <GraduationCap className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600">Faculty Member</div>
                  <div className="text-sm text-gray-600">Manage courses and track syllabus progress</div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedRole(UserRole.STUDENT)}
                className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <BookOpen className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 group-hover:text-green-600">Student</div>
                  <div className="text-sm text-gray-600">Track your learning progress and stay updated</div>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  selectedRole === UserRole.FACULTY ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {selectedRole === UserRole.FACULTY ? <GraduationCap className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  <span className="font-medium capitalize">{selectedRole}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Computer Science"
                />
              </div>

              {selectedRole === UserRole.STUDENT && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="e.g., Data Structures"
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
                  selectedRole === UserRole.FACULTY 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Continue to Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;