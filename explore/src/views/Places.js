import React, { useState, useEffect } from 'react';
import '../styles/places/Places.css';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../firebase';
import DestinationCard from '../components/places/DestinationCard';
import AdCard from '../components/places/AdCard';
import { useNavigate } from 'react-router-dom';

/**
 * Front page with destination data. Fetches destination and ad data from firestore. Search and filter.
 * Related components: 
 * - DestinationCard
 * - AdCard
 * 
 * @returns the page
 */
function Places() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate(); 
  const [ads, setAds] = useState([]);

  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [climate, setClimate] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const filterDestinations = () => {
      return destinations.filter((destination) =>
        (destination.destinationName.toLowerCase().startsWith(searchInput.toLowerCase()) || destination.country.toLowerCase().startsWith(searchInput.toLowerCase())) &&
        (destination.climate === climate || climate === "") &&
        (destination.type === type || type === "")
      );
    }
    setFilteredDestinations(filterDestinations());
  }, [searchInput, climate, type, destinations]);

  useEffect(() => {
    // AI-GENERATED CODE: FetchData is developed with help of microsoft copilot.
    const fetchData = async () => {
      try {
        const destinationsQuery = query(collection(db, 'destinations'));
        getDocs(destinationsQuery).then(docSnap => {
          let destinationsData = [];
          docSnap.forEach((doc) => {
            destinationsData.push({ ...doc.data(), id: doc.id });
          });
          setDestinations(destinationsData);
          setFilteredDestinations(destinationsData);
        });
        
        const adsQuery = query(collection(db, 'ads'));
        getDocs(adsQuery).then(docSnap => {
          let adsData = [];
          docSnap.forEach((doc) => {
            adsData.push(doc.data());
          });
          setAds(adsData);
        });
      } catch (error) {
        console.error("Error getting data", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (input) => {
    setSearchInput(input)
  }

  const climates = [...new Set(destinations.map((destination) => destination.climate).filter(climate => climate ))];
  const types = [...new Set(destinations.map((destination) => destination.type).filter(type => type ))];

  return (
    <div className="Places">
      <h1>Vacation Destinations</h1>
      <div className="search">
        <input
          type="text"
          id="input"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search'
        />

        <div className='filterSelect'>
          <select defaultValue={""} onChange={(e) => setClimate(e.target.value)}>
            <option value="" disabled>Climate</option>
            <option value="">any</option>
            {climates.map(climate => (
              <option key={climate} value={climate}>{climate}</option>
            ))}
          </select>
          <select defaultValue={""} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>Type</option>
            <option value="">any</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid">
        {filteredDestinations.map((filteredDestination, index) => (
          <>
            <DestinationCard key={filteredDestination.id} destination={filteredDestination} />
            {(index + 1) % 3 === 0 && ads.length > 0 && (
              <AdCard key={`ad-${index}`} ad={ads[index % ads.length]} />
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default Places;