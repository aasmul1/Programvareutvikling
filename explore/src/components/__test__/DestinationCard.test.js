import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DestinationCard from '../places/DestinationCard';

jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('DestinationCard component', () => {
  const destination = {
    id: 'destination-id',
    country: 'Test Country',
    destinationDescription: 'Test Description',
    destinationName: 'Test Destination',
    url: 'test.jpg',
  };

  test('renders destination details correctly', () => {
    const currentUser = { username: 'testUser' };
    jest.spyOn(require('../../auth/AuthContext'), 'useAuth').mockReturnValue({ currentUser });

    render(
      <MemoryRouter>
        <DestinationCard destination={destination} />
      </MemoryRouter>
    );

    const countryElement = screen.getByText(destination.country);
    const descriptionElement = screen.getByText(destination.destinationDescription);
    const nameElement = screen.getByText(destination.destinationName);
    const imageElement = screen.getByAltText(destination.destinationName);
    const seeMoreLinkElement = screen.getByRole('link', { name: /want to see more?/i });

    expect(countryElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', destination.url);
    expect(seeMoreLinkElement).toBeInTheDocument();
  });

});
