import "./AdoptionRequestCard.css";

import type { AdoptionRequest } from "../types";


interface AdoptionRequestCardProps{
    request: AdoptionRequest;
}


function AdoptionRequestCard(
    {request}:AdoptionRequestCardProps
){


    return(

        <div className="request-card">


            <h3>
                Request #{request.id}
            </h3>


            <p>
                Pet: {request.petName}
            </p>


            <p>
                Adopter: Rei Reyes
            </p>

            <p>
                Email: rei.reyes@email.com
            </p>


            <p>
                Status: {request.status}
            </p>


        </div>

    );

}


export default AdoptionRequestCard;