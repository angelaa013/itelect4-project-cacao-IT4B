export enum PetType {
    Dog = "dog",
    Cat = "cat",
    Bird = "bird",
    Other = "other"
}

export enum Gender {
    Male = "male",
    Female = "female",
    Unknown = "unknown"
}

export enum AdoptionStatus {
    Pending = "pending",
    Approved = "approved",
    Completed = "completed"
}

export interface Pet {
    id: number;
    name: string;
    type: PetType;
    breed: string;
    age: number;
    gender: Gender;
    description?: string;
    vaccinated?: boolean;
    adoptionFee?: number;
}

export interface PetProfile {
    id: number;
    name: string;
    type: PetType;
    gender: Gender;
    age: number;
    breed: string;
}

export interface Adopter {
    id: number;
    name: string;
    email: string;
    contact?: string;
    phone?: string;
    address?: string;
}

export interface AdoptionRequest {
    id: number;
    petName?: string;
    adopterName?: string;
    petId?: number;
    adopterId?: number;
    status: AdoptionStatus;
    requestedDate?: string;
    totalFee?: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}