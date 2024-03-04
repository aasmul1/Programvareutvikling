import '../../styles/places/Places.css'
import { Link } from 'react-router-dom';

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
              <Link to={`/places/${destination.id}`} className="see-more">Want to see more?</Link>
            </div>
    )
}

export default DestinationCard;