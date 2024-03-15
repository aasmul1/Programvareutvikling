import React from 'react';
import '../../styles/darkmode/Darkmode.css';


const Darkmode = () => {

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        localStorage.setItem("selectedTheme", "dark")
    };
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        localStorage.setItem("selectedTheme", "light")
    };

    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === "dark"){
        setDarkMode();
    }

    const toggleTheme = (e) => {
        if (e.target.checked) 
        setDarkMode();
        else setLightMode();
    };

    return (
        <label className='txt'>
            <p>Darkmode</p>
        <label className='dark_mode'>
            <input 
            className='dark_mode_input'
            type='checkbox'
            id='darkmode_toggle'
            onChange={toggleTheme}
            defaultChecked={selectedTheme === "dark"}
            />
            <span class="slider round"/>
        </label>
        </label>
    );
};

export default Darkmode;
