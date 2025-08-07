export interface Topic {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  estimatedHours: number;
  actualHours?: number;
  week: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  semester: string;
  instructor: string;
  totalWeeks: number;
  topics: Topic[];
  startDate: Date;
  endDate: Date;
}

export interface Progress {
  completedTopics: number;
  totalTopics: number;
  completionPercentage: number;
  weeksBehind: number;
  isOnTrack: boolean;
}