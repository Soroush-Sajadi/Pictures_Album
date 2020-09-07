import React from 'react';
import { NavLink } from 'react-router-dom';
import closeIcon from '../Images/closeIcon.jpg'
import '../Style/Fullscreen.css'


const Fullscreen = ({imageUrl}) => {
    console.log(imageUrl)
    return (
        <div className="fullscreen-wrapper">
            <NavLink to="/">
                <img className="fullscreen-wrapper-close" src={closeIcon} alt="close" />
            </NavLink>
            <img className="fullscreen-wrapper-image" src={imageUrl} alt="image" />
        </div>
    )
}

export default Fullscreen;