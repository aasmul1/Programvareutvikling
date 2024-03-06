import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Places from '../Places';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase';

jest.mock('@firebase/analytics', () => ({
    getAnalytics: jest.fn(() => {}),
}));

jest.mock('firebase/firestore', () => ({
    ...jest.requireActual('firebase/firestore'),
    collection: jest.fn(),
    getDocs: jest.fn(), 
}));

test('fetches destinations from Firestore', async () => {
    
    collection.mockReturnValueOnce(query);

   
    render(<Places />);
 
    expect(collection).toHaveBeenCalledWith(db, 'destinations');
    expect(getDocs).toHaveBeenCalled(); 
});

test("renders vacation destinations heading", async () => {
    render(<Places />);

    const heading = screen.getByText("Vacation Destinations");
    expect(heading).toBeInTheDocument();
});

test('fetches destinations from Firestore and displays them', async () => {
    // Dummy
    const dummyData = [
        { id: '1', data: () => ({ destinationName: 'Destination 1', country: 'Country 1', destinationDescription: 'Description 1', url: 'https://example.com/image1.jpg' }) },
        { id: '2', data: () => ({ destinationName: 'Destination 2', country: 'Country 2', destinationDescription: 'Description 2', url: 'https://example.com/image2.jpg' }) },
    ];

    collection.mockReturnValueOnce(query);
    getDocs.mockResolvedValueOnce(dummyData);

    render(<Places />);


    await waitFor(() => {

        const destination1 = screen.getByText('Destination 1');
        const destination2 = screen.getByText('Destination 2');
        
        expect(destination1).toBeVisible();
        expect(destination2).toBeVisible();
    });

    console.log('Destinations:', screen.getAllByText(/Destination \d/).map(element => element.textContent));
});
