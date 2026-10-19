import { AdoptionStatus, Gender, PetType, type AdoptionRequest, type Adopter, type Pet } from "../types";

export const mockPets: Pet[] = [
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

export const mockAdopters: Adopter[] = [
  {
    id: 1,
    name: "Alex Santos",
    email: "alex.santos@example.com",
    contact: "09170000001",
    address: "Quezon City",
    name: "Rei Reyes",
    email: "https://github.com/reireyes",
    contact: "09123456789",
    address: "123 Main St, Manila, Philippines",
  },
];

export const mockRequests: AdoptionRequest[] = [
  {
    id: "mock-request-1",
    petId: 1,
    petName: "Buddy",
    adopterId: 1,
    adopterName: "Alex Santos",
    adopterAddress: "Quezon City",
    adopterContact: "09170000001",
    status: AdoptionStatus.Pending,
    requestedDate: new Date("2026-10-18"),
    totalFee: 500,
    requestedDate: "2026-08-10",
    githubUrl: "https://github.com/reireyes",
    address: "123 Main St, Manila, Philippines",
  },
];
