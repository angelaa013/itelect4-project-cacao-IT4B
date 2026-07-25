import React, { useState, useEffect, useRef } from "react";
import "./App.css";

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
      <div className="app">
        <p>Loading pet adoption platform data...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Pet Adoption Platform</h1>
      <p>Find your perfect companion and give them a loving home.</p>

      <div className="search-section">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          placeholder="Search pets by name or breed..."
          onChange={handleSearchChange}
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="previous-search">Previous search: "{previousSearch}"</p>
        )}
      </div>

      <section>
        <h2>Available Pets</h2>
        <div className="card-container">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} onAdopt={handleAdopt} />
            ))
          ) : (
            <p>No pets matching "{searchTerm}"</p>
          )}
        </div>
      </section>

      <button onClick={toggleDetails} style={{ margin: "1rem 0" }}>
        {showDetails ? "Hide" : "Show"} Adopter & Request Records
      </button>

      {showDetails && (
        <>
          <section>
            <h2>Adopters</h2>
            {adopters.map((adopter) => (
              <AdopterCard key={adopter.id} adopter={adopter} />
            ))}
          </section>

          <section>
            <h2>Adoption Requests</h2>
            {requests.map((request) => (
              <AdoptionRequestCard key={request.id} request={request} />
            ))}
          </section>
        </>
      )}

      {selectedPet && <h3>Selected Pet: {selectedPet}</h3>}
    </div>
  );
}

export default App;