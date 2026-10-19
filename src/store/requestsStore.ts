import { create } from "zustand";
import type { AdoptionRequest } from "../types";
import { AdoptionStatus } from "../types";

interface RequestsState {
  requests: AdoptionRequest[];
  addRequest: (request: AdoptionRequest) => void;
}

const useRequestsStore = create<RequestsState>((set) => ({
  requests: [
    {
      id: 1,
      petName: "Buddy",
      adopterName: "Rei Reyes",
      petId: 1,
      adopterId: 1,
      status: AdoptionStatus.Pending,
      requestedDate: new Date("2026-08-10"),
      githubUrl: "https://github.com/reireyes",
      address: "123 Main St, Manila, Philippines",
    },
  ],
  addRequest: (request: AdoptionRequest) =>
    set((state) => ({ requests: [...state.requests, request] })),
}));

export default useRequestsStore;
