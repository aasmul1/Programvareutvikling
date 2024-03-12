import React, { useState } from 'react';
import '../../styles/PlacesDetails/ReviewPopup.css';
import { addDoc, collection} from 'firebase/firestore'; 
import { db } from '../../firebase'; 



const ReviewPopup = ({ isOpen, onClose, onSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [destinationID, setDestinationID] = useState('');
  const [userID, setUserID] = useState('');

  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    const newRating = Math.min(Math.max(parseInt(event.target.value), 1), 5);
    setRating(newRating);
  };
  

  const handleSubmit = async () => {
    try {
      if (!rating) {
        setError('Please select a rating before submitting.');
        return;
      }
  
      const reviewsCollectionRef = collection(db, 'reviews'); 
      await addDoc(reviewsCollectionRef, {
        comment: review,
        rating: rating,
        destinationID: destinationID, 
        userID: userID
      });
  
      setReview('');
      setRating(1);
      onClose();
      setDestinationID('');
      setUserID('');
    } catch (error) {
      console.error('Error adding review to Firestore:', error);
    }
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-inner">
        <textarea value={review} onChange={handleChange} placeholder="Write your review here" />
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} min="1" max="5" onChange={handleRatingChange} />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={onClose}>Close</button>
        <button className="btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewPopup;
