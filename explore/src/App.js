import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'; 
import { AuthProvider } from './auth/AuthContext';
import AdminConsole from './views/AdminConsole';
import AdminLogin from './views/AdminLogin';
import RequireAdmin from './auth/RequireAdmin';
import Places from './views/Places';
import CreateUser from './views/CreateUser';
import PlacesDetails from './views/PlacesDetail';
import RequireUser from './auth/RequireUser';
import UserLogin from './views/UserLogin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {}
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/adminconsole" element={
            <RequireAdmin>
              <AdminConsole />
            </RequireAdmin>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/places/:destinationId" element={
            <RequireUser>
              <PlacesDetails />
            </RequireUser>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
