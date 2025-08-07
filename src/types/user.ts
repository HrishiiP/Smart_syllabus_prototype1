export enum UserRole {
  FACULTY = 'faculty',
  STUDENT = 'student'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  course?: string;
}