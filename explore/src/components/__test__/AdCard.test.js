import React from 'react';
import { render, screen } from '@testing-library/react';
import AdCard from '../places/AdCard';

describe('AdCard component', () => {
  const ad = {
    adName: 'sampleAd',
    image: 'sample.jpg',
    readMoreLink: 'https://exmple.com',
  };

  test('renders ad details', () => {
    render(<AdCard ad={ad} />);

    const adNameElement = screen.getByText(ad.adName);
    const imageElement = screen.getByAltText(ad.adName);
    const readMoreLinkElement = screen.getByRole('link', { name: /click here to read more/i });

    expect(adNameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', ad.image);
    expect(readMoreLinkElement).toBeInTheDocument();
    expect(readMoreLinkElement).toHaveAttribute('href', ad.readMoreLink);
    expect(readMoreLinkElement).toHaveAttribute('target', '_blank');
    expect(readMoreLinkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
