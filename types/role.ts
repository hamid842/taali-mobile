export const UserRole = {
  OWNER: "OWNER",
  SCHOOL_MANAGER: "SCHOOL_MANAGER",
  SCHOOL_ADMIN: "SCHOOL_ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  PARENT: "PARENT",
  CANTEEN_OPERATOR: "CANTEEN_OPERATOR",
  FINANCE_TEAM: "FINANCE_TEAM",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export const RoleConfig = {
  TEACHER: {
    translationKey: "roles.teacher",
    dashboardPath: "/teacher/dashboard",
    permissions: ["manage_classes", "manage_attendance", "manage_grades"],
  },
  
  PARENT: {
    translationKey: "roles.parent",
    dashboardPath: "/parent/dashboard",
    permissions: ["view_child_progress", "view_attendance", "make_payments"],
  }
} as const;
