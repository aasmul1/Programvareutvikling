import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import '../styles/user/CreateUser.css';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState(''); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = () => {
        let isValid = true;
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false;
                setError('Passwords do not match');
            }
        }
        return isValid;
    };
    // AI-GENERATED CODE: Copilot is used for register function.
    const register = (e) => {
        e.preventDefault();
        setError('');
        if (validatePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (res) => {
                   
                    await setDoc(doc(db, 'users', res.user.uid), {
                        username: username,
                        email: email
                    });
                    navigate('/login'); 
                })
                .catch((err) => setError(err.message));
        }
      
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsername(''); 
    };

    return (
        <div className="create-user-container">
            <h2>Create user</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={register}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm password</label>
                    <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default UserRegistration;