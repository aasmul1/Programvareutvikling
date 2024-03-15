import React from 'react';
import { render } from '@testing-library/react';
import AdminAdList from '../adminconsole/AdminAdsList'; 

describe('AdminAdList component', () => {
  const ads = [
    { id: 1, adName: 'Ad1', image: 'image1.jpg', readMoreLink: 'https://eksempel.com/ad1' },
    { id: 2, adName: 'Ad2', image: 'image2.jpg', readMoreLink: 'https://eksempel.com/ad2' }
  ];

  it(' renders correctly with ads', () => {
    const startEditingAd = jest.fn();
    const handleDeleteAd = jest.fn();
    const { container } = render(<AdminAdList ads={ads} startEditingAd={startEditingAd} handleDeleteAd={handleDeleteAd} />);
    
    expect(container.querySelector('.AdItem')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelectorAll('button').length).toBe(4);
  });
});
