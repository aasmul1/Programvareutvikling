import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PlacesDetails from '../PlacesDetail';

jest.mock('../../firebase', () => ({
  db: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('PlacesDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });


  test('renders loading message when destination details are being fetched', () => {
    const destinationId = 'destination';
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({ destinationId });

    render(<PlacesDetails />);

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

});
