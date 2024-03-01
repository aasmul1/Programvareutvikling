import '../../styles/places/Places.css'

/**
 * 
 * @param {*} destination the destination displayed in the Destination Card 
 * @returns 
 */
function DestinationCard({ destination }) {

    return (
            <div className="destination">
              <h2>{destination.country}</h2>
              <p className="destination-description">{destination.destinationDescription}</p>
              <p className="destinationName"> {destination.destinationName}</p>
              <img src={destination.url} alt={destination.destinationName} className="destination-image" />
              <a href="#more" className="see-more">Want to see more?</a>
            </div>
    )
}

export default DestinationCard;