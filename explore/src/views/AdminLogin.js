import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/AdminLogin.css';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

// AI-GENERATED CODE: Copilot is used to find code mistakes in AdminLogin .
function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin2 = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/adminconsole');
            
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin2}>
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