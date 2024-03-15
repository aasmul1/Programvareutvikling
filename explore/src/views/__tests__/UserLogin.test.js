import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import UserLogin from '../UserLogin'; 

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('UserLogin component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<UserLogin />);
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

});
