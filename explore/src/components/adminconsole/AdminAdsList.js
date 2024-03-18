import React from 'react';
import '../../styles/adminconsole/AdminConsole.css';

function AdminAdList({ ads, startEditingAd, handleDeleteAd }) {
    return (
        <>
            {ads.map((ad) => (
                <div key={ad.id} className="AdItem">
                    <img src={ad.image} alt={ad.adName} />
                    <h3>{ad.adName}</h3>
                    <a href={ad.readMoreLink} target="_blank" rel="noopener noreferrer">Click here to read more</a>
                    <div className="small-button">
                        <button onClick={() => startEditingAd(ad)}>Edit</button>
                        <button onClick={() => handleDeleteAd(ad.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AdminAdList;