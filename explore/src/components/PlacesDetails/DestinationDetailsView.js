import React, { useState } from 'react';
import '../../styles/PlacesDetails/PlacesDetails.css';
import ReviewPopup from './ReviewPopup';

function DestinationDetailsView({ destination, currentImageUrl, onImageClick }) {
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

  const openReviewPopup = () => {
    setIsReviewPopupOpen(true);
  };
  
  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  const handleSubmitReview = (review) => {
  };

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
      <button onClick={openReviewPopup} className="rate-btn">
        Review {destination.destinationName}
      </button>
      <p className="destination-description">{destination.destinationDescription}</p>
      <p className="long-text">{formattedLongText}</p>
      <ReviewPopup isOpen={isReviewPopupOpen} onClose={closeReviewPopup} onSubmit={handleSubmitReview} />
    </div>
  );
}

export default DestinationDetailsView;