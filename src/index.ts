import {
    User,
    Course,
    Submission,
    ApiResponse,
    UserRole
} from "./types";

// Function 1
function getUser(id: number): User {
    return {
        id,
        name: "Juan dela Cruz",
        email: "juan@example.com",
        role: UserRole.Student,
        isActive: true,
        score: 95.5
    };
}

// Function 2
function calculateGrade(score: number, maxScore: number): string {
    const percentage: number = (score / maxScore) * 100;

    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";

    return "F";
}

// Function 3
function formatCourse(
    name: string,
    units: number,
    semester: string
): string {
    return `${name} (${units} units) - ${semester}`;
}

// Generic Function
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

// Utility Type 1
const updatedUser: Partial<User> = {
    score: 100
};

// Utility Type 2
const basicUser: Pick<User, "name" | "email"> = {
    name: "Juan dela Cruz",
    email: "juan@example.com"
};

// Generic Interface Example
const response: ApiResponse<User> = {
    success: true,
    message: "User loaded successfully",
    data: getUser(1)
};

const user: User = getUser(1);

console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));
console.log(getFirst([1, 2, 3]));
console.log(updatedUser);
console.log(basicUser);
console.log(response);