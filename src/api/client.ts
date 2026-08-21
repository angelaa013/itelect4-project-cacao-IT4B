import type { Pet, Adopter, AdoptionRequest, ApiAdoptionRequest, NewAdoptionRequest } from "../types";

const API_BASE_URL = "/api";

const toAdoptionRequest = (request: ApiAdoptionRequest): AdoptionRequest => ({
  ...request,
  id: Number(request.id),
  requestedDate: request.requestedDate ? new Date(request.requestedDate) : undefined,
});

export const getPets = async (): Promise<Pet[]> => {
  const response = await fetch(`${API_BASE_URL}/pets`);
  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }
  return response.json();
};

export const getPetById = async (id: number): Promise<Pet> => {
  const response = await fetch(`${API_BASE_URL}/pets/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch pet details");
  }
  return response.json();
};

export const getAdopters = async (): Promise<Adopter[]> => {
  const response = await fetch(`${API_BASE_URL}/adopters`);
  if (!response.ok) {
    throw new Error("Failed to fetch adopters");
  }
  return response.json();
};

export const getRequests = async (): Promise<AdoptionRequest[]> => {
  const response = await fetch(`${API_BASE_URL}/requests`);
  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }
  const data = (await response.json()) as ApiAdoptionRequest[];
  return data.map(toAdoptionRequest);
};

export const createAdoptionRequest = async (data: NewAdoptionRequest): Promise<AdoptionRequest> => {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create adoption request");
  }
  const createdRequest = (await response.json()) as ApiAdoptionRequest;
  return toAdoptionRequest(createdRequest);
};
