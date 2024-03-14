import '../../styles/adminconsole/AdminConsole.css'

function AdminDestinationList({ destinations, startEditing, handleDelete }) {

    return (
        <>
            {destinations.map((destination) => (
                <div key={destination.id} className="DestinationItem">
                    <h3>{destination.destinationName} ({destination.country})</h3>
                    <p>{destination.destinationDescription}</p>
                    {/* {destination.url && <img src={destination.url} alt={destination.destinationName} style={{ width: '100px', height: '100px' }} />} */}
                    <div className="small-button">
                        <button onClick={() => startEditing(destination)}>Edit</button>
                        <button onClick={() => handleDelete(destination.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

function AdminAdList({ ads, startEditingAd, handleDeleteAd }) {
    return (
        <>
            {ads.map((ad) => (
                <div key={ad.id} className="AdItem">
                    <img src={ad.imageUrl} alt={ad.adName} className="AdImage"/>
                    <h3>{ad.adName}</h3>
                    <a href={ad.readMoreLink} target="_blank" rel="noopener noreferrer">Click here to read more</a>
                    <div className="small-button">
                        <button onClick={() => startEditingAd(ad)}>Edit</button>
                        <button onClick={() => handleDeleteAd(ad.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}







export default AdminDestinationList;