import { useState } from "react";
import "./App.css";

import PetCard from "./components/PetCard";
import AdopterCard from "./components/AdopterCard";
import AdoptionRequestCard from "./components/AdoptionRequestCard";

import { PetType, Gender, AdoptionStatus } from "./types";
import type { Pet, Adopter, AdoptionRequest } from "./types";


function App() {


    const [selectedPet, setSelectedPet] = useState<string>("");


    const pets: Pet[] = [
        {
            id: 1,
            name: "Buddy",
            type: PetType.Dog,
            breed: "Golden Retriever",
            age: 3,
            gender: Gender.Male,
            description: "Friendly and playful dog."
        },
        {
            id: 2,
            name: "Luna",
            type: PetType.Cat,
            breed: "Persian Cat",
            age: 2,
            gender: Gender.Female,
            description: "Calm and affectionate cat."
        }
    ];


    const adopters: Adopter[] = [
        {
            id: 1,
            name: "Rei Reyes",
            email: "rei.reyes@email.com",
            contact: "09123456789"
        }
    ];


    const requests: AdoptionRequest[] = [
        {
            id: 1,
            petName: "Buddy",
            adopterName: "Rei Reyes",
            status: AdoptionStatus.Pending
        }
    ];


    // Typed event handler
    const handleAdopt = (petName: string): void => {
        setSelectedPet(petName);
        alert(`Adoption request submitted for ${petName}`);
    };


    return (
        <div className="app">

            <h1>Pet Adoption Platform</h1>

            <p>
                Find your perfect companion and give them a loving home.
            </p>


            <section>
                <h2>Available Pets</h2>

                <div className="card-container">

                    {
                        pets.map((pet)=>(
                            <PetCard
                                key={pet.id}
                                pet={pet}
                                onAdopt={handleAdopt}
                            />
                        ))
                    }

                </div>

            </section>



            <section>
                <h2>Adopters</h2>

                {
                    adopters.map((adopter)=>(
                        <AdopterCard
                            key={adopter.id}
                            adopter={adopter}
                        />
                    ))
                }

            </section>



            <section>
                <h2>Adoption Requests</h2>

                {
                    requests.map((request)=>(
                        <AdoptionRequestCard
                            key={request.id}
                            request={request}
                        />
                    ))
                }

            </section>


            {
                selectedPet &&
                <h3>
                    Selected Pet: {selectedPet}
                </h3>
            }


        </div>
    );
}


export default App;