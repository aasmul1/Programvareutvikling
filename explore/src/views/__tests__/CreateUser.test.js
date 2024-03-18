import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserRegistration from '../CreateUser';

jest.mock('../../firebase', () => ({
  auth: jest.fn(),
  db: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('UserRegistration component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user inputs are in the document', () => {
    render(<UserRegistration />);
    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

});
