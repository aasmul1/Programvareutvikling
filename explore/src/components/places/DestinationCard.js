import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../../firebase';

function DestinationCard({ destination }) {
    const { currentUser } = useAuth();
    const [isVisited, setIsVisited] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const visitDocRef = doc(db, 'visits', `${currentUser.uid}_${destination.id}`);
            getDoc(visitDocRef).then(docSnap => {
                setIsVisited(docSnap.exists());
            });
        } else {
            setIsVisited(false);
        }
    }, [currentUser, destination.id]);

    const handleSeeMoreClick = (e) => {
        if (!currentUser) {
            e.preventDefault();
            alert("You need to be logged in to mark destinations or see more details.");
        }
    };

    const toggleVisited = async () => {
        if (!currentUser) {
            alert("You must log in to mark destinations as visited. ");
            return;
        }
        const visitDocRef = doc(db, 'visits', `${currentUser.uid}_${destination.id}`);
        if (isVisited) {
            await deleteDoc(visitDocRef);
            setIsVisited(false);
        } else {
            await setDoc(visitDocRef, {
                userId: currentUser.uid,
                destinationId: destination.id,
                visitedOn: new Date()
            });
            setIsVisited(true);
        }
    };

    

    return (
        <div className={`destination ${isVisited ? 'visited' : ''}`}>
            <h2>{destination.country}</h2>
            <p className="destination-description">{destination.destinationDescription}</p>
            <p className="destinationName">{destination.destinationName}</p>
            <img src={destination.url} alt={destination.destinationName} className="destination-image" />
            <Link to={`/places/${destination.id}`} className="see-more" onClick={handleSeeMoreClick}>Want to see more?</Link>
            <div>
                <button onClick={toggleVisited} className="toggle-visited">
                    {isVisited ? 'Visited' : 'Mark as Visited'}
                </button>
                {isVisited && <span className="visited-sign">&#10003;</span>}
            </div>
        </div>
    );
}

export default DestinationCard;