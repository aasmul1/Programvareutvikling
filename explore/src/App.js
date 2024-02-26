// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext'; // Adjust the import path as necessary
import AdminConsole from './views/AdminConsole';
import AdminLogin from './views/AdminLogin';
import RequireAdmin from './auth/RequireAdmin';
import Places from './views/Places'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/adminconsole" element={
            <RequireAdmin>
                <AdminConsole />
            </RequireAdmin>} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
