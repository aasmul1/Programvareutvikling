import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function DestinationCard({ destination }) {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

   
    const handleSeeMoreClick = (e) => {
        if (!currentUser) {
            e.preventDefault(); 
            alert("You must be logged in to see more details."); 
        }
    };

    return (
        <div className="destination">
            <h2>{destination.country}</h2>
            <p className="destination-description">{destination.destinationDescription}</p>
            <p className="destinationName"> {destination.destinationName}</p>
            <img src={destination.url} alt={destination.destinationName} className="destination-image" />
            
            <Link to={`/places/${destination.id}`} className="see-more" onClick={handleSeeMoreClick}>Want to see more?</Link>
        </div>
    );
}

export default DestinationCard;