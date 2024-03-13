import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Places from '../Places';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Places component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('climate options should be in the document', () => {
    render(<Places />);
    const climateOption1 = screen.getByRole('option', { name: 'Climate' });
    
    expect(climateOption1).toBeInTheDocument();
   
  });

  test('type options should be in the document', () => {
    render(<Places />);
    const typeOption1 = screen.getByRole('option', { name: 'Type' });
    
    expect(typeOption1).toBeInTheDocument();
   
  });

  test('search input should be in the document', () => {
    render(<Places />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

});

