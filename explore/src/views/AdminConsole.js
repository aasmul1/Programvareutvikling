import React, { useState } from 'react';
import './AdminConsole.css';
import { collection, addDoc } from "firebase/firestore"; 
import { db }  from '../firebase';

function AdminConsole() {
    const [destinationName, setDestinationName] = useState('');
    const [country, setCountry] = useState('');
    const [destinationDescription, setDestinationDescription] = useState('');
    // Set initial state with the specified default image URL
    const [url, setUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "destinations"), {
            destinationName: destinationName,
            country: country,
            destinationDescription: destinationDescription,
            url: url, // Save the url state under the name 'url'
        });

        console.log('Creating travel destination:', { destinationName, country, url });
        console.log("Document written with ID: ", docRef.id);

        // Reset form fields
        setDestinationName('');
        setCountry('');
        setDestinationDescription('');
        // Reset URL to default
        setUrl("");
    };

    return (
        <div className="Form">
            <h2>Create Travel Destination</h2>
            <h3>Fill in the given input fields</h3>
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
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}

export default AdminConsole;