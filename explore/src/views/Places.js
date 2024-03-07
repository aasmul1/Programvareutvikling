import React, { useState, useEffect } from 'react';
import '../styles/places/Places.css';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../firebase';
import DestinationCard from '../components/places/DestinationCard'


/**
 * Front page with destination data. Fetches destination from firestore. Search and filter.
 * Related components: 
 * - DestinationCard
 * 
 * @returns the page
 */
function Places() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [climate, setClimate] = useState("");
  const [type, setType] = useState("");

  /**
   * Use Effect hook to handle search and filter on destinations.
   */
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

  /**
   * Use Effect hook to fetch data on initial render.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'destinations'));
        getDocs(q).then(docSnap => {
          let destinationsData = [];
          docSnap.forEach((doc) => {
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
    setSearchInput(input)
  }

  /**
   * List of distinct climates based on destinations.
   */
  const climates = [...new Set(destinations.map((destination) => destination.climate).filter(climate => climate ))] // To remove empty climates

  /**
   * List of distinct types based on destinations.
   */
   const types = [...new Set(destinations.map((destination) => destination.type).filter(type => type ))]; // To remove empty types

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

        <div className='filterSelect'>
          <select defaultValue={""} onChange={(e) => setClimate(e.target.value)}>
            <option value="" disabled> Climate</option>
            <option value=""> any </option>
            {climates.map(climate => (
              <option key={climate} value={climate}>
                {climate}
              </option>
            ))}
          </select>
          <select defaultValue={""} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled> Type</option>
            <option value="" > any </option>
            {types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

      </div>
      <div>
      </div>
      <div className="grid">
        {filteredDestinations.map((filteredDestinations) => (
          <DestinationCard key={filteredDestinations.id} destination={filteredDestinations} />
        ))}
      </div>
    </div>
  );
}

export default Places;