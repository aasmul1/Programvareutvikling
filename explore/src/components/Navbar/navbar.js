import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../auth/AuthContext';
import logo from '../../images/Logo.jpg';
import '../../styles/Navbar/navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="app-name">Explore</span>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Places</Link>
        <Link to="/admin" className="nav-link">Admin Login</Link>
        <Link to="/login" className="nav-link">User Login</Link>
        <Link to="/createuser" className="nav-link">Create User</Link>
        {currentUser ? (
          <>
            <div className="nav-user">
              <FaUser className="nav-icon" />
              <span>{currentUser.username}</span>
            </div>
            <button onClick={handleLogout} className="nav-link logout-btn">Log Out</button>
          </>
        ) : (
          <div className="nav-user">
            <FaUser className="nav-icon" />
            <span>Guest</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;