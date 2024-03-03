import React, { useState, useEffect } from 'react'; 
import '../styles/places/Places.css';
import { collection, getDocs, query } from "firebase/firestore"; 
import { db } from '../firebase';
import DestinationCard from '../components/places/DestinationCard'
import { useNavigate } from 'react-router-dom';


/**
 * Front page with destination data. Fetches destination from firestore. 
 * Related components: 
 * - DestinationCard
 * 
 * @returns the page
 */
function Places() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate(); 


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
        }); 
      } catch (error) {
        console.log("Error getting data", error);
      }
    };
    fetchData();
  }, []);

  const createuser = (e) => {
    navigate('/createuser');
  };
  
  return (
    <div className="Places">
      <form onSubmit={createuser}>
        <button type="createuser">Create user</button>
      </form>
      <h1>Vacation Destinations</h1>
      <div className="grid">
        {destinations.map((destination) => (
          <DestinationCard key= { destination.id } destination = { destination }/>
        ))}
      </div>
    </div>
  );
}

export default Places;