import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import DestinationDetailsView from '../components/PlacesDetails/DestinationDetailsView'; 

function PlacesDetails() {
  const [destination, setDestination] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const { destinationId } = useParams();

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
    />
  );
}

export default PlacesDetails;