import React, { useState, useEffect } from 'react';
import './AdminConsole.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from '../firebase';

function AdminConsole() {
    const [destinationName, setDestinationName] = useState('');
    const [country, setCountry] = useState('');
    const [destinationDescription, setDestinationDescription] = useState('');
    const [url, setUrl] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditingId, setCurrentEditingId] = useState(null);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        setDestinations(items);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Add a new document with a generated id.
        // const docRef = await addDoc(collection(db, "destinations"), {
        //     destinationName: destinationName,
        //     country: country,
        //     destinationDescription: destinationDescription,
        //     url: url,
        //     // picture: picture,
        // });

        // console.log('Creating travel destination:', { destinationName, country });
        // console.log("Document written with ID: ", docRef.id);
        
        if (isEditing) {
            const destinationRef = doc(db, "destinations", currentEditingId);
            await updateDoc(destinationRef, {
                destinationName: destinationName,
                country: country,
                destinationDescription: destinationDescription,
                url: url,
            });
            setIsEditing(false);
            setCurrentEditingId(null);
        } else {
            await addDoc(collection(db, "destinations"), {
                destinationName: destinationName,
                country: country,
                destinationDescription: destinationDescription,
                url: url,
            });
        }

        setDestinationName('');
        setCountry('');
        setDestinationDescription('');
        setUrl('');
        fetchDestinations();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "destinations", id));
        fetchDestinations();
    };

    const startEditing = (destination) => {
        setDestinationName(destination.destinationName);
        setCountry(destination.country);
        setDestinationDescription(destination.destinationDescription);
        setUrl(destination.url);
        setIsEditing(true);
        setCurrentEditingId(destination.id);
    };

    return (
        <div className="AdminConsole">
            <div className="Form">
                <h2>{isEditing ? 'Edit Travel Destination' : 'Create Travel Destination'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="destinationName"
                            value={destinationName}
                            onChange={(e) => setDestinationName(e.target.value)}
                            placeholder='Destination Name'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder='Country name'
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="destinationDescription"
                            value={destinationDescription}
                            onChange={(e) => setDestinationDescription(e.target.value)}
                            required
                            placeholder='Destination Description'
                            rows="8"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            placeholder='Image URL'
                        />
                    </div>
                    <div className="button-wrapper">
                        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
            <div className="DestinationList">
                <h2>Existing Destinations</h2>
                {destinations.map((destination) => (
                    <div key={destination.id} className="DestinationItem">
                        <h3>{destination.destinationName} ({destination.country})</h3>
                        <p>{destination.destinationDescription}</p>
                        {/* {destination.url && <img src={destination.url} alt={destination.destinationName} style={{ width: '100px', height: '100px' }} />} */}
                        <div className="small-button">
                            <button onClick={() => startEditing(destination)}>Edit</button>
                            <button onClick={() => handleDelete(destination.id)}>Delete</button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminConsole;