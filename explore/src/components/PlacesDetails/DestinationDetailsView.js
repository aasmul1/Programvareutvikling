import React from 'react';
import '../../styles/PlacesDetails/PlacesDetails.css'

function DestinationDetailsView({ destination, currentImageUrl, onImageClick }) {
    const formattedLongText = destination.LongText.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
      return (
        <div>
          <h1>{destination.destinationName}</h1>
          <img src={currentImageUrl} alt={destination.destinationName} className="destination-image" />
          <button onClick={onImageClick} className="view-more-images-btn">
            View more images from {destination.destinationName}
          </button>
          <p className="destination-description">{destination.destinationDescription}</p>
          <p className="long-text">{formattedLongText}</p>
        </div>
      );
}

export default DestinationDetailsView;