import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import AdminConsole from './views/AdminConsole';
import AdminLogin from './components/AdminLogin';

function App() {
  const handleLogin = () => {
    // Handle the login logic here
    // For example, you can set a flag indicating the user is logged in
    console.log("User logged in!");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminconsole" element={<AdminConsole />} />
        <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
