import { UserRoleType } from "./role";
import { ISchool } from "./school";

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  profileImage: string;
  status: string;
  lastLogin: string;
  active: boolean;
  school: ISchool;
  createdBy?: string;
  role: UserRoleType;
  permissions?: string[];
  availableSchools?: ISchool[];
  currentSchool?: ISchool;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token?: string;
  refreshToken?: string;
  id: number;
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRoleType;
  permissions?: string[];
  availableSchools?: ISchool[];
  currentSchool?: ISchool;
}
