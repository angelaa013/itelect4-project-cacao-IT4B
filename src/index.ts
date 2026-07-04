import { User, Course, GradeResult } from "./types";

// Function: create user
function getUser(id: number): User {
    return {
        id: id,
        name: "Juan dela Cruz",
        email: "juan@example.com",
        role: "student",
        isActive: true,
        score: 95.5,
    };
}

// Function: calculate grade
function calculateGrade(score: number, maxScore: number): string {
    const percentage: number = (score / maxScore) * 100;

    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    return "F";
}

// Function: format course
function formatCourse(name: string, units: number, semester: string): string {
    return `${name} (${units} units) - ${semester}`;
}

// Typed variable using interface
const user: User = getUser(1);

// Output
console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));