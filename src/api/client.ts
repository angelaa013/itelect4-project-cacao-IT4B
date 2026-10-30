import type {
  Pet,
  Adopter,
  AdoptionRequest,
  ApiAdoptionRequest,
  NewAdoptionRequest,
  AiReview,
} from "../types";
import { mockAdopters, mockPets, mockRequests } from "../data/mockData";
import useAuthStore from "../store/authStore";

const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");
const API_BASE_URL = `${API_ORIGIN}/api`;
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";
const MOCK_REQUESTS_STORAGE_KEY = "pawhome.mock.requests";

const toAdoptionRequest = (
  request: ApiAdoptionRequest,
): AdoptionRequest => ({
  ...request,
  id: request.id,
  requestedDate: request.requestedDate
    ? new Date(request.requestedDate)
    : undefined,
});

const toApiAdoptionRequest = (
  request: AdoptionRequest,
): ApiAdoptionRequest => ({
  ...request,
  requestedDate: request.requestedDate?.toISOString().slice(0, 10),
});

const readMockRequests = (): ApiAdoptionRequest[] => {
  if (typeof window === "undefined") {
    return mockRequests.map(toApiAdoptionRequest);
  }

  const storedRequests = window.localStorage.getItem(
    MOCK_REQUESTS_STORAGE_KEY,
  );

  if (!storedRequests) {
    return mockRequests.map(toApiAdoptionRequest);
  }

  try {
    const parsed: unknown = JSON.parse(storedRequests);

    return Array.isArray(parsed)
      ? (parsed as ApiAdoptionRequest[])
      : mockRequests.map(toApiAdoptionRequest);
  } catch {
    return mockRequests.map(toApiAdoptionRequest);
  }
};

export const getPets = async (): Promise<Pet[]> => {
  if (USE_MOCK_DATA) return [...mockPets];

  const response = await fetch(`${API_BASE_URL}/pets`);

  if (!response.ok) {
    throw new Error("Failed to fetch pets");
  }

  return response.json();
};

export const getPetById = async (id: number): Promise<Pet> => {
  if (USE_MOCK_DATA) {
    const pet = mockPets.find((item) => item.id === id);
    if (!pet) throw new Error("Pet not found");
    return pet;
  }

  const response = await fetch(`${API_BASE_URL}/pets/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pet details");
  }

  return response.json();
};

export const getAdopters = async (): Promise<Adopter[]> => {
  if (USE_MOCK_DATA) return [...mockAdopters];

  const response = await fetch(`${API_BASE_URL}/adopters`);

  if (!response.ok) {
    throw new Error("Failed to fetch adopters");
  }

  return response.json();
};

export const getRequests = async (): Promise<AdoptionRequest[]> => {
  if (USE_MOCK_DATA) {
    return readMockRequests().map(toAdoptionRequest);
  }

  const response = await fetch(`${API_BASE_URL}/requests`);

  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }

  const data = (await response.json()) as ApiAdoptionRequest[];
  return data.map(toAdoptionRequest);
};

export const createAdoptionRequest = async (
  data: NewAdoptionRequest,
): Promise<AdoptionRequest> => {
  if (USE_MOCK_DATA) {
    const request: ApiAdoptionRequest = {
      ...data,
      id: `mock-request-${Date.now()}`,
      requestedDate:
        data.requestedDate ?? new Date().toISOString().slice(0, 10),
    };

    const requests = [request, ...readMockRequests()];
    window.localStorage.setItem(
      MOCK_REQUESTS_STORAGE_KEY,
      JSON.stringify(requests),
    );

    return toAdoptionRequest(request);
  }

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

export const login = async (username: string, password: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const payload = (await response.json().catch(() => null)) as
    | { token?: unknown; error?: unknown }
    | null;

  if (!response.ok) {
    throw new Error(
      typeof payload?.error === "string" ? payload.error : "Failed to sign in",
    );
  }

  if (typeof payload?.token !== "string") {
    throw new Error("The server did not return a login token");
  }

  return payload.token;
};

export const askAi = async (prompt: string): Promise<AiReview> => {
  const token = useAuthStore.getState().token;
  const response = await fetch(`${API_BASE_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ prompt }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: unknown }
    | null;

  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
      throw new Error("Your login expired. Please sign in again.");
    }

    throw new Error(
      typeof payload?.error === "string"
        ? payload.error
        : "Failed to get AI review",
    );
  }

  return payload as AiReview;
};

