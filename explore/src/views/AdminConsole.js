import React, { useState, useEffect } from 'react';
import '../styles/adminconsole/AdminConsole.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import AdminDestinationList from '../components/adminconsole/AdminDestinationList';

function AdminConsole() {
    const [destinationName, setDestinationName] = useState('');
    const [country, setCountry] = useState('');
    const [destinationDescription, setDestinationDescription] = useState('');
    const [url, setUrl] = useState("");
    const [url1, setUrl1] = useState(""); 
    const [url2, setUrl2] = useState(""); 
    const [longText, setLongText] = useState(""); 
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

        const data = {
            destinationName: destinationName,
            country: country,
            destinationDescription: destinationDescription,
            url: url,
            url1: url1, 
            url2: url2, 
            LongText: longText, 
        };

        if (isEditing) {
            const destinationRef = doc(db, "destinations", currentEditingId);
            await updateDoc(destinationRef, data);
            setIsEditing(false);
            setCurrentEditingId(null);
        } else {
            await addDoc(collection(db, "destinations"), data);
        }

        setDestinationName('');
        setCountry('');
        setDestinationDescription('');
        setUrl('');
        setUrl1(''); 
        setUrl2(''); 
        setLongText(''); 
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
        setUrl1(destination.url1 || ""); 
        setUrl2(destination.url2 || ""); 
        setLongText(destination.LongText || ""); 
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
                            placeholder='Image URL'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="url1"
                            value={url1}
                            onChange={(e) => setUrl1(e.target.value)}
                            placeholder='Image URL 1'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="url2"
                            value={url2}
                            onChange={(e) => setUrl2(e.target.value)}
                            placeholder='Image URL 2'
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="longText"
                            value={longText}
                            onChange={(e) => setLongText(e.target.value)}
                            placeholder='Long Text'
                            rows="5"
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