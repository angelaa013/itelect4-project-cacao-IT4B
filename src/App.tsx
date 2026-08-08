import React, { useState, useEffect, useRef } from "react";

import PetCard from "./components/PetCard";
import AdopterCard from "./components/AdopterCard";
import AdoptionRequestCard from "./components/AdoptionRequestCard";

import { PetType, Gender, AdoptionStatus } from "./types";
import type { Pet, Adopter, AdoptionRequest } from "./types";

// Custom Hooks
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// Initial mock data to simulate an asynchronous fetch
const initialPets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    type: PetType.Dog,
    breed: "Golden Retriever",
    age: 3,
    gender: Gender.Male,
    description: "Friendly and playful dog.",
  },
  {
    id: 2,
    name: "Luna",
    type: PetType.Cat,
    breed: "Persian Cat",
    age: 2,
    gender: Gender.Female,
    description: "Calm and affectionate cat.",
  },
];

const initialAdopters: Adopter[] = [
  {
    id: 1,
    name: "Rei Reyes",
    email: "rei.reyes@email.com",
    contact: "09123456789",
  },
];

const initialRequests: AdoptionRequest[] = [
  {
    id: 1,
    petName: "Buddy",
    adopterName: "Rei Reyes",
    status: AdoptionStatus.Pending,
  },
];

function App() {
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [compactView, setCompactView] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(initialPets);
      setAdopters(initialAdopters);
      setRequests(initialRequests);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleAdopt = (petName: string): void => {
    setSelectedPet(petName);
    alert(`Adoption request submitted for ${petName}`);
  };

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8EC] dark:bg-[#1F140D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#F4A21A] border-t-[#4A3525] mb-4"></div>
          </div>
          <p className="text-xl text-[#4A3525] dark:text-[#FFF8EC] font-extrabold tracking-wide">
            Loading Pawhome adoption platform...
          </p>
          <p className="text-[#4A3525]/70 dark:text-[#FFF8EC]/70 mt-2 font-medium">
            Give this fluffy paw a new home.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EC] dark:bg-[#1F140D] text-[#4A3525] dark:text-[#FFF8EC] transition-colors duration-300">
      {/* Header styled like PAWHOME */}
      <header className="bg-[#FFF8EC] dark:bg-[#1F140D] border-b border-[#4A3525]/10 dark:border-[#F4A21A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              {/* Pawhome House Icon */}
              <div className="w-14 h-14 bg-[#F4A21A] rounded-2xl flex items-center justify-center shadow-sm text-[#4A3525] shrink-0">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 5.5a2.5 2.5 0 0 1 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5S9.5 12.38 9.5 11s1.12-2.5 2.5-2.5z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-[#4A3525] dark:text-[#F4A21A] tracking-wider uppercase">
                  PAWHOME
                </h1>
                <p className="text-[#4A3525]/80 dark:text-[#FFF8EC]/80 text-sm font-semibold mt-0.5">
                  Give this fluffy paw a new home.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-[#FFF1D6] hover:bg-[#FEEEC8] dark:bg-[#2D1F15] dark:hover:bg-[#3D2E24] text-[#4A3525] dark:text-[#F4A21A] border border-[#F4A21A]/40 px-5 py-2.5 rounded-2xl font-bold transition-all duration-200 flex items-center gap-2 shadow-sm"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <button
                onClick={() => setCompactView(!compactView)}
                className="bg-[#FA799F] hover:bg-[#f5668f] text-white px-5 py-2.5 rounded-2xl font-bold transition-all duration-200 shadow-sm"
              >
                {compactView ? "📋 Compact" : "📄 Default"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <section className="mb-10">
          <div className="bg-[#FFFDF7] dark:bg-[#2D1F15] rounded-3xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 border-2 border-[#4A3525]/10 dark:border-[#F4A21A]/30">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#4A3525] dark:text-[#F4A21A] mb-3">
              Search Pets
            </label>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              placeholder="Search pets by name or breed..."
              onChange={handleSearchChange}
              className="w-full px-5 py-3.5 bg-[#FFF8EC] dark:bg-[#1F140D] border-2 border-[#4A3525]/20 dark:border-[#F4A21A]/40 text-[#4A3525] dark:text-[#FFF8EC] placeholder-[#4A3525]/50 dark:placeholder-[#FFF8EC]/40 rounded-2xl focus:outline-none focus:border-[#F4A21A] dark:focus:border-[#F4A21A] transition-colors font-medium"
            />
            {previousSearch !== undefined && previousSearch !== searchTerm && (
              <p className="mt-3 text-sm text-[#4A3525]/70 dark:text-[#FFF8EC]/70 italic">
                Previous search: "{previousSearch}"
              </p>
            )}
          </div>
        </section>

        {/* Available Pets Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🐶</span>
            <h2 className="text-3xl font-extrabold text-[#4A3525] dark:text-[#F4A21A] tracking-tight">
              Available Pets
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  onAdopt={handleAdopt}
                  isCompact={compactView}
                />
              ))
            ) : (
              <div className="col-span-full bg-[#FFF1D6] dark:bg-[#2D1F15] border-2 border-[#F4A21A] rounded-3xl p-8 text-center">
                <p className="text-xl text-[#4A3525] dark:text-[#F4A21A] font-bold">
                  No pets matching "{searchTerm}"
                </p>
                <p className="text-[#4A3525]/70 dark:text-[#FFF8EC]/70 mt-2 font-medium">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Toggle Adopter & Request Records */}
        <div className="mb-12">
          <button
            onClick={toggleDetails}
            className="bg-[#F4A21A] hover:bg-[#e5930b] text-[#4A3525] font-extrabold py-3.5 px-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] w-full sm:w-auto border border-[#F4A21A]/50"
          >
            {showDetails ? "📋 Hide" : "📖 Show"} Adopter & Request Records
          </button>
        </div>

        {/* Adopters & Requests Sections */}
        {showDetails && (
          <>
            {/* Adopters Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">👤</span>
                <h2 className="text-3xl font-extrabold text-[#4A3525] dark:text-[#FA799F] tracking-tight">
                  Adopters
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {adopters.length > 0 ? (
                  adopters.map((adopter) => (
                    <AdopterCard 
                      key={adopter.id} 
                      adopter={adopter}
                      isCompact={compactView}
                    />
                  ))
                ) : (
                  <div className="col-span-full bg-[#FDE8F0] dark:bg-[#2D1F15] border-2 border-[#FA799F] rounded-3xl p-8 text-center">
                    <p className="text-[#4A3525] dark:text-[#FA799F] font-bold">
                      No adopters found
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Adoption Requests Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📋</span>
                <h2 className="text-3xl font-extrabold text-[#4A3525] dark:text-[#F4A21A] tracking-tight">
                  Adoption Requests
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <AdoptionRequestCard 
                      key={request.id} 
                      request={request}
                      isCompact={compactView}
                    />
                  ))
                ) : (
                  <div className="col-span-full bg-[#FFF1D6] dark:bg-[#2D1F15] border-2 border-[#F4A21A] rounded-3xl p-8 text-center">
                    <p className="text-[#4A3525] dark:text-[#F4A21A] font-bold">
                      No adoption requests yet
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;