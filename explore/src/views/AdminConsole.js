import React, { useState } from 'react';
import './AdminConsole.css';
import { collection, addDoc } from "firebase/firestore"; 
import { db }  from '../firebase';

function AdminConsole() {
    const [destinationName, setDestinationName] = useState('');
    const [country, setCountry] = useState('');
    const [destinationDescription, setDestinationDescription] = useState('');
    const [picture, setPicture] = useState(null); // Initialize state to manage the uploaded file

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "destinations"), {
            destinationName: destinationName,
            country: country,
            destinationDescription: destinationDescription,
            // TODO: Fix file upload
            // picture: picture,
        });

        console.log('Creating travel destination:', { destinationName, country });
        console.log("Document written with ID: ", docRef.id);

        setDestinationName('');
        setCountry('');
        setDestinationDescription('')
        setPicture(null);
    };

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]); // Update the state with the selected file
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
                        aria-multiline='true'
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
                        type="file"
                        onChange={handleFileChange}
                        accept='image/*'
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
