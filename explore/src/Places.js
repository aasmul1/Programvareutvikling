import React, { useState, useEffect } from 'react'; 
import './Places.css';
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from './firebase';

function Places() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'destinations'));
        getDocs(q).then(docSnap => {
          let destinationsData = []; // Renamed for clarity
          docSnap.forEach((doc) =>{
            destinationsData.push({ ...doc.data(), id: doc.id });
          });
          console.log("Document data", destinationsData);
          setDestinations(destinationsData); // Moved inside then block
        }); 
      } catch (error) {
        console.log("Error getting data", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="Places">
      <h1>Vacation Destinations</h1>
      <div className="grid">
        {destinations.map((destination, index) => (
          <div key={index} className="destination"> {/* Consider using destination.id as key instead of index */}
            <h2>{destination.country}</h2>
            <p className="destination-description">{destination.destinationDescription}</p>
            <p className="destinationName"> {destination.destinationName}</p>
            <img src={destination.url} alt={destination.destinationName} className="destination-image" />
            <a href="#more" className="see-more">Want to see more?</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;