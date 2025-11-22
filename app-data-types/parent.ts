export interface Parent {
  id?: number;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation?: string;
  notes?: string;
  isActive?: boolean;
}

export interface DashboardStats {
  totalChildren: number;
  unreadNotifications: number;
  pendingPayments: number;
  overallAttendanceRate: number;
  upcomingEvents: number;
}

export interface Child {
  id: number;
  name: string;
  grade: string;
  className: string;
  schoolName: string;
  attendanceRate: number;
  averageGrade?: string;
  teacherName: string;
  profileImage?: string;
}

export interface ChildDetail extends Child {
  birthDate?: string;
  emergencyContact?: string;
  medicalNotes?: string;
  enrollmentDate: string;
}
