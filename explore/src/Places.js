import React from 'react';
import './Places.css';

function Places() {
  const destinations = [
    { title: 'Paris', imageUrl: 'paris.jpg', description: 'Discover the romance and beauty of the city of lights. Visit the Eiffel Tower, Louvre, and enjoy exquisite French cuisine.' },
    { title: 'Bali', imageUrl: 'maldivene.jpg', description: 'Explore the magical island of Bali, a tropical paradise known for its dazzling natural beauty and cultural richness. Embrace the tranquility of the lush rice fields, visit the sacred temples, and enjoy the local cuisine with its exotic flavors' },
    { title: 'Madrid', imageUrl: 'madrid.jpg', description: 'Explore the vibrant pulse and rich history of Madrid. Wander through the magnificent boulevards, visit the Prado Museum and the Royal Palace, and enjoy tapas in a lively plaza.' }
  ];

  return (
    <div className="Places">
      <h1>Vacation Destinations</h1>
      <div className="grid">
        {destinations.map((destination, index) => (
          <div key={index} className="destination">
            <img src={destination.imageUrl} alt={destination.title} className="destination-image" />
            <h2>{destination.title}</h2>
            <p className="destination-description">{destination.description}</p>
            <a href="#more" className="see-more">Want to see more?</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;