import React, { useRef, useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import '../../styles/PlacesDetails/PlacesDetails.css';
import { db } from '../../firebase';

function DestinationDetailsView({ destination, currentImageUrl, onImageClick, user, reviews, setReviews  }) {
  const inputRef = useRef(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const users = {};
      for (const review of reviews) {
        try {
          const userDoc = await getDoc(doc(db, 'users', review.userID));
          if (userDoc.exists()) {
            users[review.userID] = userDoc.data().username;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setUsernames(users);
    };

    fetchUsernames();
  }, [reviews]);

  const handleSubmit = async () => {
    if (!review.trim()) {
      setError('Please enter a review before submitting.');
      return;
    }

    try {
      const reviewsCollectionRef = collection(db, 'reviews');
      const newReviewRef = await addDoc(reviewsCollectionRef, {
        userID: user.uid, 
        destinationID: destination.id, 
        rating: rating,
        comment: review
      });

      const newReviewSnapshot = await getDoc(newReviewRef);
      const newReviewData = { id: newReviewSnapshot.id, ...newReviewSnapshot.data() };
      
      setReviews([...reviews, newReviewData]);

      setReview('');
      setRating(1);
      setError('');
    } catch (error) {
      console.error('Error adding review to Firestore:', error);
    }
  };


  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    const newRating = Math.min(Math.max(parseInt(event.target.value), 1), 5);
    setRating(newRating);
  };

  const handleScrollToInnerPopup = () => {
    const popupInnerElement = document.querySelector('.popup-inner');
    if (popupInnerElement) {
        popupInnerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <button onClick={handleScrollToInnerPopup} className="rate-btn">
        Review {destination.destinationName}
      </button>
      <h1 className="destination-description">{destination.destinationDescription}</h1>
      <p className="long-text" ref={inputRef}>
        {formattedLongText}
      </p>
      <div className="popup-inner">
        <textarea value={review} onChange={handleChange} placeholder="Write your review here" />
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} min="1" max="5" onChange={handleRatingChange} />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="rating">
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>User: {usernames[review.userID]}</p>
              <p>Comment: {review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DestinationDetailsView;