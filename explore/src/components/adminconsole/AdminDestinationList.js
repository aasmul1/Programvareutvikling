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

export default AdminDestinationList;