import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase.js'; 
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';



function UserLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

       
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length === 0) {
            setError("Brukernavnet finnes ikke.");
            return;
        }

        const userEmail = querySnapshot.docs[0].data().email;

        try {
            await signInWithEmailAndPassword(auth, userEmail, password);
            console.log("navigate('/');")
            navigate('/')
            
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-login-container">
            <h2>User Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default UserLogin;