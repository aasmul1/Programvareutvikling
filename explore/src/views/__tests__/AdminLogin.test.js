import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import AdminLogin from '../AdminLogin';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    signInWithEmailAndPassword: jest.fn(),
  }));

test('button should be called on click', () => {
    render(<AdminLogin />);
    const clickSpy = jest.fn();
    const loginButton = screen.getByRole('button');
    loginButton.addEventListener('click', clickSpy);
    fireEvent.click(loginButton);
    expect(clickSpy).toHaveBeenCalledTimes(1);
});

test('should navigate to adminConsole on successful login', async () => {
  render(<AdminLogin />);
  const emailInput = screen.getByLabelText((/email/i));
  const passwordInput = screen.getByLabelText((/password/i));
  const loginButton = screen.getByRole('button');

  fireEvent.change(emailInput, {target: {value: 'example@test.com'}});
  fireEvent.change(passwordInput, {target: {value: 'password123'}});

  fireEvent.click(loginButton);

  await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/adminconsole');
  })
});

test("login form should be in the document", () => {
    const component = render(<AdminLogin />);
        const labelNode1 = component.getByText("Email")
        const labelNode2 = component.getByText("Password")
    expect(labelNode1).toBeInTheDocument();
    expect(labelNode2).toBeInTheDocument();
    });


