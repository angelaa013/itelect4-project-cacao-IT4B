// Enum
export enum UserRole {
    Student = "student",
    Teacher = "teacher",
    Admin = "admin"
}

// Interface 1
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    score: number;
}

// Interface 2
export interface Course {
    name: string;
    units: number;
    semester: string;
}

// Interface 3
export interface Submission {
    studentId: number;
    assignment: string;
    grade: number;
}

// Generic Interface
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
