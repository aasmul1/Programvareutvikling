// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage';
import AdminConsole from './views/AdminConsole';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adminconsole" element={<AdminConsole />} />
      </Routes>
    </Router>
  );
}

export default App;
