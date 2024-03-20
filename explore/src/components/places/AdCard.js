import React from 'react';


function AdCard({ ad }) {
    return (
        <div className="AdItem">
           
            <h2>{'Advertisement'}</h2>
            <h3>{ad.adName}</h3>
            
            <img src={ad.image} alt={ad.adName} />
            <a href={ad.readMoreLink} target="_blank" rel="noopener noreferrer">Click here to read more</a>
        </div>
    );
}

export default AdCard;