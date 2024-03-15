import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../firebase';
import DestinationDetailsView from '../components/PlacesDetails/DestinationDetailsView'; 

function PlacesDetails() {
  const [destination, setDestination] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const { destinationId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const docRef = doc(db, 'destinations', destinationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const destinationData = { ...docSnap.data(), id: docSnap.id };
          setDestination(destinationData);
          setCurrentImageUrl(destinationData.url); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching destination details:", error);
      }
    };

    fetchDestinationDetails();
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [destinationId]);

  // const fetchReviews = async () => {
  //   try {
  //     const reviewsQuerySnapshot = await getDocs(collection(db, 'reviews'));
  //     reviewsQuerySnapshot.forEach((doc) => {
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  //   } catch (error) {
  //     console.error('Error fetching reviews:', error);
  //   }
  // };
  
  // fetchReviews();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsQuery = query(collection(db, 'reviews'), where('destinationID', '==', destinationId));
        console.log(destinationId)
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);
        console.log(reviewsData.length)
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    

    if (destinationId) {
      fetchReviews();
    }
  }, [destinationId]);

 

  const handleImageClick = () => {
    if (destination) {
      const images = [destination.url, destination.url1, destination.url2].filter(Boolean);
      const currentIndex = images.indexOf(currentImageUrl);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImageUrl(images[nextIndex]);
    }
  };

  if (!destination) return <div>Loading...</div>;
  
  return (
    <DestinationDetailsView
      destination={destination}
      currentImageUrl={currentImageUrl}
      onImageClick={handleImageClick}
      user={currentUser}
      reviews={reviews}
      setReviews={setReviews}
    />
  );
}

export default PlacesDetails;
