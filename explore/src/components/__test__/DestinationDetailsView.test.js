import React from 'react';
import { render, screen } from '@testing-library/react';
import DestinationDetailsView from '../PlacesDetails/DestinationDetailsView';

describe('DestinationDetailsView component', () => {
  const destination = {
    id: 'destination-id',
    destinationName: 'Test Destination',
    destinationDescription: 'Test Description',
    LongText: 'Line 1\nLine 2\nLine 3',
  };

  test('renders destination details correctly', () => {
    render(
      <DestinationDetailsView
        destination={destination}
        currentImageUrl="test.jpg"
        onImageClick={() => {}}
        reviews={[]} 
        setReviews={() => {}} 
      />
    );

    const destinationNameElement = screen.getByText(destination.destinationName);
    const descriptionElement = screen.getByText(destination.destinationDescription);

    expect(destinationNameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

});
