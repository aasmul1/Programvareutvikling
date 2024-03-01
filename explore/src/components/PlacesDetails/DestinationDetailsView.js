import React from 'react';
import '../../styles/PlacesDetails/PlacesDetails.css'

function DestinationDetailsView({ destination, currentImageUrl, onImageClick }) {
  return (
    <div>
      <h1>{destination.destinationName}</h1>
      <img src={currentImageUrl} alt={destination.destinationName} className="destination-image" />
      <button onClick={onImageClick} className="view-more-images-btn">
        View more images from {destination.destinationName}
      </button>
      <p className="destination-description">{destination.destinationDescription}</p>
      <p className="long-text">{destination.LongText}</p>
    </div>
  );
}

export default DestinationDetailsView;