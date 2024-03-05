import React, { useState, useEffect } from 'react'; 
import '../styles/places/Places.css';
import { and, collection, getDocs, query } from "firebase/firestore"; 
import { db } from '../firebase';
import DestinationCard from '../components/places/DestinationCard'

/**
 * Front page with destination data. Fetches destination from firestore. 
 * Related components: 
 * - DestinationCard
 * 
 * @returns the page
 */
function Places() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([])

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'destinations'));
        getDocs(q).then(docSnap => {
          let destinationsData = []; 
          docSnap.forEach((doc) =>{
            destinationsData.push({ ...doc.data(), id: doc.id });
          });
          console.log("Document data", destinationsData);
          setDestinations(destinationsData); 
          setFilteredDestinations(destinationsData)
        }); 
      } catch (error) {
        console.log("Error getting data", error);
      }
    };
    fetchData();
  }, []);
  
  const handleSearch = (input) => {
    setFilteredDestinations(destinations.filter((destination) =>
    (typeof destination.destinationName === 'string' &&
     String(destination.destinationName).toLowerCase().startsWith(input.toLowerCase())) ||
    (typeof destination.country === 'string' &&
     String(destination.country).toLowerCase().startsWith(input.toLowerCase()))
));

  }

  return (
    <div className="Places">
        <h1>Vacation Destinations</h1>
        <div className="search">
          <input
            type="text"
            id="input"
            variant="outlined"
            onChange={(e) => {
                handleSearch(e.target.value)
              }
            }
            label="Search"
            placeholder='Search'
          />
        </div>
      <div className="grid">
        {filteredDestinations.map((filteredDestinations) => (
          <DestinationCard key= { filteredDestinations.id } destination = { filteredDestinations }/>
        ))}
      </div>
    </div>
  );
}

export default Places;