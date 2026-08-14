import { PetType, Gender, AdoptionStatus } from "../types";
import type { Pet, Adopter, AdoptionRequest } from "../types";

export const initialPets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    type: PetType.Dog,
    breed: "Golden Retriever",
    age: 3,
    gender: Gender.Male,
    description: "Friendly and playful dog who loves fetch and belly rubs.",
    vaccinated: true,
    adoptionFee: 500,
  },
  {
    id: 2,
    name: "Luna",
    type: PetType.Cat,
    breed: "Persian Cat",
    age: 2,
    gender: Gender.Female,
    description: "Calm and affectionate cat. Loves cozy naps by the window.",
    vaccinated: true,
    adoptionFee: 300,
  },
  {
    id: 3,
    name: "Max",
    type: PetType.Dog,
    breed: "Labrador Retriever",
    age: 4,
    gender: Gender.Male,
    description: "Energetic and loyal. Great with kids and other pets.",
    vaccinated: true,
    adoptionFee: 450,
  },
  {
    id: 4,
    name: "Mochi",
    type: PetType.Cat,
    breed: "Scottish Fold",
    age: 1,
    gender: Gender.Female,
    description: "Tiny and curious. She will melt your heart instantly.",
    vaccinated: false,
    adoptionFee: 350,
  },
];

export const initialAdopters: Adopter[] = [
  {
    id: 1,
    name: "Rei Reyes",
    email: "rei.reyes@email.com",
    contact: "09123456789",
  },
  {
    id: 2,
    name: "Ana Santos",
    email: "ana.santos@email.com",
    contact: "09987654321",
  },
];

export const initialRequests: AdoptionRequest[] = [
  {
    id: 1,
    petName: "Buddy",
    adopterName: "Rei Reyes",
    petId: 1,
    adopterId: 1,
    status: AdoptionStatus.Pending,
    requestedDate: "2026-08-10",
  },
  {
    id: 2,
    petName: "Luna",
    adopterName: "Ana Santos",
    petId: 2,
    adopterId: 2,
    status: AdoptionStatus.Approved,
    requestedDate: "2026-08-12",
  },
];
