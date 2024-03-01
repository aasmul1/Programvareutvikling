import React, { useState, useEffect } from 'react';
import '../styles/adminconsole/AdminConsole.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import AdminDestinationList from '../components/adminconsole/AdminDestinationList';

/**
 * Admin console for creating new destinations and edit/delete destinations.
 * Should require admin.
 * 
 * @returns AdminConsole
 */
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
                            type="text"
                            size="3"
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
                <AdminDestinationList destinations={destinations} startEditing={startEditing} handleDelete={handleDelete} />
            </div>
        </div>
    );
}

export default AdminConsole;