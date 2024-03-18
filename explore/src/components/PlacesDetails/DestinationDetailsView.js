import '../../styles/PlacesDetails/PlacesDetails.css'
import WeatherData from './WeatherData';
import React, { useRef, useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import '../../styles/PlacesDetails/PlacesDetails.css';
import { db } from '../../firebase';

function DestinationDetailsView({ destination, currentImageUrl, onImageClick, user, reviews, setReviews }) {
  const inputRef = useRef(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const [error, setError] = useState('');
  const [usernames, setUsernames] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingReview, setCurrentEditingReview] = useState(null);
  const adminID = ["35SW0PERUwfLt09pU9mHlT0WMEB2", "Pw2c2kzWeUOZyMzbhsumsS8sbTz2"];

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
      if (isEditing) {
        await updateReview(currentEditingReview.id, review, rating);
        setIsEditing(false);
      } else {
        await addReview(review, rating);
      }

      setReview('');
      setRating(1);
      setError('');
    } catch (error) {
      console.error('Error adding/editing review to Firestore:', error);
    }
  };

  const addReview = async (comment, rating) => {
    const newReviewRef = await addDoc(collection(db, 'reviews'), {
      userID: user.uid,
      destinationID: destination.id,
      rating: rating,
      comment: comment
    });

    const newReviewSnapshot = await getDoc(newReviewRef);
    const newReviewData = { id: newReviewSnapshot.id, ...newReviewSnapshot.data() };

    setReviews([...reviews, newReviewData]);
  };

  const updateReview = async (reviewId, comment, rating) => {
    await updateDoc(doc(db, 'reviews', reviewId), {
      comment: comment,
      rating: rating
    });

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, comment: comment, rating: rating };
      }
      return review;
    });

    setReviews(updatedReviews);
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setReview(review.comment);
    setRating(review.rating);
    setCurrentEditingReview(review);
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));

      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error('Error deleting review:', error);
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
    <body>
      <div>
        <h1>{destination.destinationName}</h1>
        <div className='short-description'>
          <p className="long-text">{destination.destinationDescription}</p>
        </div>
        <div className='destination-display'>
          <WeatherData destination={destination} />
          <div className='image-box' onClick={onImageClick}>
            <img  src={currentImageUrl} alt={destination.destinationName} className="destination-image" />
          </div>
        </div>
        <button onClick={handleScrollToInnerPopup} className="rate-btn">
        Review {destination.destinationName}
        </button>
        <div className='long-description'>
          <p className="long-text">{formattedLongText}</p>
        </div>
        <div className="popup-inner">
        <textarea value={review} onChange={handleChange} placeholder="Write your review here" />
        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} min="1" max="5" onChange={handleRatingChange} />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={handleSubmit}>{isEditing ? 'Update' : 'Submit'}</button>
      </div>
      <div className="rating">
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <div className="review-content">
                <p>User: {usernames[review.userID]}</p>
                <p>Comment: {review.comment}</p>
                <p>Rating: {review.rating}</p>
                {user && user.uid === review.userID && !adminID.includes(user.uid) && (
                  <div>
                    <button className="btn-small" onClick={() => handleEdit(review)}>Edit</button>
                    <button className="btn-small" onClick={() => handleDelete(review.id)}>Delete</button>
                  </div>
                )}
                {adminID.includes(user.uid) && (
                  <div>
                    <button className="btn-small" onClick={() => handleEdit(review)}>Edit</button>
                    <button className="btn-small" onClick={() => handleDelete(review.id)}>Delete</button>
                  </div>
                )}

              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </body>
)};

export default DestinationDetailsView;