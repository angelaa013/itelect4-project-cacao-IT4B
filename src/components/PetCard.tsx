import "./PetCard.css";

import type { Pet } from "../types";


interface PetCardProps {
    pet: Pet;
    onAdopt: (petName:string)=>void;
}


function PetCard({pet,onAdopt}:PetCardProps){


    return(

        <div className="pet-card-wrapper">

            <div className="pet-card">

                <h3>{pet.name}</h3>

                <p>
                    Type: {pet.type}
                </p>

                <p>
                    Breed: {pet.breed}
                </p>

                <p>
                    Age: {pet.age}
                </p>

                <p>
                    Gender: {pet.gender}
                </p>

                <p>
                    {pet.description}
                </p>

            </div>

            <div className="pet-card-actions">
                <button onClick={()=>onAdopt(pet.name)}>Adopt</button>
            </div>

        </div>

    );
}


export default PetCard;