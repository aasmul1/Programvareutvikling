import React from 'react';
import { render } from '@testing-library/react';
import AdminDestinationList from '../adminconsole/AdminDestinationList';

describe('AdminDestinationList component', () => {
  const destinations = [
    { id: 1, destinationName: 'Destination 1', country: 'Country 1', destinationDescription: 'Description 1' },
    { id: 2, destinationName: 'Destination 2', country: 'Country 2', destinationDescription: 'Description 2' }
  ];

  it(' renders correctly with destinations', () => {
    const startEditing = jest.fn();
    const handleDelete = jest.fn();
    const { container } = render(<AdminDestinationList destinations={destinations} startEditing={startEditing} handleDelete={handleDelete} />);
    
    expect(container.querySelector('.DestinationItem')).toBeInTheDocument();
    expect(container.querySelectorAll('.DestinationItem').length).toBe(2);
    expect(container.querySelectorAll('h3').length).toBe(2);
    expect(container.querySelectorAll('p').length).toBe(2);
    expect(container.querySelectorAll('button').length).toBe(4); 
  });
});