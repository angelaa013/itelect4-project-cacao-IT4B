// Enum for User Roles
export enum UserRole {
    Tutor = "tutor",
    Tutee = "tutee"
}

// Enum for Booking Status
export enum BookingStatus {
    Requested = "requested",
    Confirmed = "confirmed",
    Completed = "completed"
}

// Interface 1: User
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    expertise?: string; // For tutors (e.g., "Mathematics", "English")
    hourlyRate?: number; // For tutors
}

// Interface 2: Session
export interface Session {
    id: number;
    subject: string;
    duration: number; // in minutes
    tutorId: number;
    description: string;
}

// Interface 3: Booking
export interface Booking {
    id: number;
    tutorId: number;
    sessionId: number;
    status: BookingStatus;
    scheduledDate: string;
    totalCost: number;
}

// Generic Interface
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
