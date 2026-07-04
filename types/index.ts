// types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    score: number;
}

export interface Course {
    name: string;
    units: number;
    semester: string;
}

export interface GradeResult {
    percentage: number;
    grade: string;
}