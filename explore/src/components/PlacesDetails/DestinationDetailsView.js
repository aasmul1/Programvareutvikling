import React from 'react';
import '../../styles/PlacesDetails/PlacesDetails.css'
import WeatherData from './WeatherData';

function DestinationDetailsView({ destination, currentImageUrl, onImageClick }) {
  const formattedLongText = destination.LongText.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return (
    <body>
      <div>
        <h1>{destination.destinationName}</h1>
      <div className='short-description'>
        <p className="long-text">{destination.destinationDescription}</p>
      </div>
        <div className='destination-display'>
          <WeatherData destination={destination} />
          <div>
            <img onClick={onImageClick} src={currentImageUrl} alt={destination.destinationName} className="destination-image" />
          </div>

        </div>
      <div className='long-description'>
        <p className="long-text">{formattedLongText}</p>
      </div>

      </div>
    </body>
  );
}

export default DestinationDetailsView;