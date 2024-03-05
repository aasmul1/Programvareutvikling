import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';


/**
 * Stops unautherized access to restricted pages.
 * 
 * @param {*} param0 
 * @returns 
 */
function RequireUser({ children }) {
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = db.firestore().collection('users');
                const usersSnapshot = await usersCollection.get();
                const usersData = usersSnapshot.docs.map(doc => doc.data());
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    if (!currentUser) {
        // Redirect if user not authenticated
        return <Navigate to="/" />;
    }

    return children;
}

export default RequireUser;