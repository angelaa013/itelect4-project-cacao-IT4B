import {
    Pet,
    Adopter,
    AdoptionRequest,
    ApiResponse,
    PetType,
    AdoptionStatus
} from "../types";

// Function 1: Get Pet Profile
function getPet(id: number): Pet {
    return {
        id,
        name: "Luna",
        type: PetType.Dog,
        age: 2,
        breed: "Golden Retriever",
        vaccinated: false,
        adoptionFee: 75
    };
}

// Function 2: Calculate Total Adoption Cost
function calculateAdoptionCost(baseFee: number, donationAmount: number): number {
    // total cost is the pet's adoption fee plus any extra donation
    return baseFee + donationAmount;
}

// Function 3: Format Pet Profile
function formatPetProfile(
    name: string,
    type: PetType,
    age: number,
    breed: string
): string {
    return `${name} (${type}) - ${age} years old, ${breed}`;
}

// Generic Function: Get First Item
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

// Utility Type 1: Partial Pet (update pet profile)
const updatedPet: Partial<Pet> = {
    breed: "Golden Retriever"
};

// Utility Type 2: Pick Adopter (contact info)
const adopterContact: Pick<Adopter, "name" | "email"> = {
    name: "Rei Reyes",
    email: "rei.reyes@email.com"
};

const pet: Pet = getPet(1);
const baseAdoptionFee: number = pet.adoptionFee;
const donationAmount: number = 20;
const totalAdoptionCost: number = calculateAdoptionCost(baseAdoptionFee, donationAmount);

// Generic Interface Example: Adoption Response
const adoptionResponse: ApiResponse<AdoptionRequest> = {
    success: true,
    message: "Adoption request approved successfully",
    data: {
        id: 1,
        petId: 1,
        adopterId: 1,
        status: AdoptionStatus.Approved,
        requestedDate: "2025-01-20",
        totalFee: totalAdoptionCost
    }
};

console.log(pet);
console.log(`Base adoption fee: ${baseAdoptionFee}`);
console.log(`Donation amount: ${donationAmount}`);
console.log(`Total adoption cost: ${totalAdoptionCost}`);
console.log(formatPetProfile("Luna", PetType.Dog, 2, "Golden Retriever"));
console.log(getFirst([AdoptionStatus.Pending, AdoptionStatus.Approved]));
console.log(updatedPet);
console.log(adopterContact);
console.log(adoptionResponse);
