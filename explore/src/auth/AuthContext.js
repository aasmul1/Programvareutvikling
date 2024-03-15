import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const adminIDs = ["35SW0PERUwfLt09pU9mHlT0WMEB2", "Pw2c2kzWeUOZyMzbhsumsS8sbTz2"];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              
                if (adminIDs.includes(user.uid)) {
                    setCurrentUser(user); 
                } else {
                  
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setCurrentUser({
                            ...user,
                            username: userDocSnap.data().username 
                        });
                    } else {
                        console.log("No such document for user:", user.uid);
                    }
                }
            } else {
                setCurrentUser(null); 
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const logout = () => {
        
        return auth.signOut();

    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};