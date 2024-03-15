import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Navbar from '../Navbar/navbar';

jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn() 
}));

describe('Navbar component', () => {
  it('renders correctly without login', () => {
    jest.spyOn(require('../../auth/AuthContext'), 'useAuth').mockReturnValue({ currentUser: null });

    const { getByText, queryByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(getByText('Explore')).toBeInTheDocument();
    expect(queryByText('Log Out')).not.toBeInTheDocument(); 
  });

  it('renders correctly loggedin', () => {
    jest.spyOn(require('../../auth/AuthContext'), 'useAuth').mockReturnValue({ currentUser: { username: 'jakob' } });

    const { getByText, queryByText } = render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(getByText('Explore')).toBeInTheDocument();
    expect(getByText('Log Out')).toBeInTheDocument();
  });


});
