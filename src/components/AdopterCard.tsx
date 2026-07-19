import "./AdopterCard.css";

import type { Adopter } from "../types";


interface AdopterCardProps {
    adopter: Adopter;
}


function AdopterCard({adopter}:AdopterCardProps){


    return(

        <div className="adopter-card">

            <h3>
                {adopter.name}
            </h3>


            <p>
                Email: {adopter.email}
            </p>


            <p>
                Contact: {adopter.contact}
            </p>


        </div>

    );

}


export default AdopterCard;