import {
    User,
    Session,
    Booking,
    ApiResponse,
    UserRole,
    BookingStatus
} from "./types";

// Function 1: Get Tutor Profile
function getTutor(id: number): User {
    return {
        id,
        name: "Maria Santos",
        email: "maria@tutoring.com",
        role: UserRole.Tutor,
        isActive: true,
        expertise: "Mathematics",
        hourlyRate: 500
    };
}

// Function 2: Calculate Total Cost
function calculateTotalCost(hourlyRate: number, duration: number): number {
    const hours = duration / 60;
    return hourlyRate * hours;
}

// Function 3: Format Session Info
function formatSession(
    subject: string,
    duration: number,
    description: string
): string {
    return `${subject} - ${duration} minutes: ${description}`;
}

// Generic Function: Get First Item
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

// Utility Type 1: Partial User (update tutor profile)
const updatedTutor: Partial<User> = {
    hourlyRate: 600,
    expertise: "Advanced Mathematics"
};

// Utility Type 2: Pick User (tutee contact info)
const tuteeContact: Pick<User, "name" | "email"> = {
    name: "Miguel Rodriguez",
    email: "miguel@student.com"
};

// Generic Interface Example: Booking Response
const bookingResponse: ApiResponse<Booking> = {
    success: true,
    message: "Booking confirmed successfully",
    data: {
        id: 1,
        tutorId: 1,
        sessionId: 101,
        status: BookingStatus.Confirmed,
        scheduledDate: "2025-01-20 14:00",
        totalCost: 500
    }
};

const tutor: User = getTutor(1);

console.log(tutor);
console.log(calculateTotalCost(500, 60));
console.log(formatSession("Mathematics", 60, "Algebra fundamentals"));
console.log(getFirst([BookingStatus.Requested, BookingStatus.Confirmed]));
console.log(updatedTutor);
console.log(tuteeContact);
console.log(bookingResponse);