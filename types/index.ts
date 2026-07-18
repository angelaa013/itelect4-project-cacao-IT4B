export enum PetType {
    Dog = "dog",
    Cat = "cat",
    Bird = "bird",
    Other = "other"
}

export enum AdoptionStatus {
    Pending = "pending",
    Approved = "approved",
    Completed = "completed"
}

export enum Gender {
    Male = "male",
    Female = "female",
    Unknown = "unknown"
}

export interface Pet {
    id: number;
    name: string;
    type: PetType;
    gender: Gender;
    age: number; // in years
    breed: string;
    vaccinated: boolean;
    adoptionFee: number;
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
    phone: string;
    address: string;
}

export interface AdoptionRequest {
    id: number;
    petId: number;
    adopterId: number;
    status: AdoptionStatus;
    requestedDate: string;
    totalFee: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
