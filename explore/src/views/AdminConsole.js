import React, { useState } from 'react';
import './AdminConsole.css';

function AdminConsole() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload

        //logikk
        console.log('Creating travel destination:', { name, country });

        // fjerner input feltene, kanskje legge inn "sikker"?
        setName('');
        setCountry('');
    };

    return (
        <div className="admin-console">
            <h2>Create Travel Destination</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default AdminConsole;
