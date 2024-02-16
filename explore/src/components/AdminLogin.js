import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './AdminLogin.css';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Using useNavigate instead of history

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
            navigate('/adminconsole'); // Use navigate instead of history.push
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default AdminLogin;