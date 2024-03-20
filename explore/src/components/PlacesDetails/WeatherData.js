import React, { useEffect, useState } from 'react';
import '../../styles/PlacesDetails/PlacesDetails.css';

const WeatherData = ({ destination }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // AI-GENERATED CODE: FetchData is developed with help of microsoft copilot.
        const fetchData = async () => {
            const LOCATION = {
                lat: destination.geopoint._lat,
                lon: destination.geopoint._long,
            };

            const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LOCATION.lat}&lon=${LOCATION.lon}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Weather data could not be fetched');


                const data = await response.json();
                console.log(data);
                setWeather(data); // Assuming 'data' is the structure similar to the API response you provided
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [destination.geopoint]);

    if (!weather) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const todayForecast = weather.properties.timeseries[0];

    const iconcode = todayForecast.data.next_1_hours.summary.symbol_code;
    const iconPath = `https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/${iconcode}.svg`;

    return (
        <div className='weather-box'>
            <h2>Weather forecast for {destination.destinationName}</h2>

            <div className='icons-display'>
                <div className='weather-icon'>
                    <p>Temperature:</p>
                    <p>{todayForecast.data.instant.details.air_temperature}°C</p>
                </div>
                <div className='weather-icon'>
                    <p>Wind Speed:</p>
                    <p>{todayForecast.data.instant.details.wind_speed} m/s</p>
                </div>
            </div>
            <div className='icons-display'> 
                <img src={iconPath} alt='WeatherIcon'/>
            </div>
        </div>
    )
};

export default WeatherData;