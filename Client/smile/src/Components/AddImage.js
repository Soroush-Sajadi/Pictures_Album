import React, { useState } from 'react';
import addImage from '../Images/addImage.png'
import addImageWindow from '../Images/addImageWindow.png'
import closeIcon from '../Images/close.svg'
import '../Style/AddImage.css'


const AddImage = () => {
    const [ openAddImageWindow, setOpenAddImageWindow ] = useState(false);

    const addingImage = () => {
        setOpenAddImageWindow(true)
    }

    return(
        <div className="add-image-wrapper">
            <div>
                <img className="profile-add-image" src={addImage} alt="add image" onClick={addingImage}/>
            </div>
            <div className="add-image-window-wrapper">
                <img className="add-image-window-wrapper-close-image" src={closeIcon} alt="close" /> 
                <img className="add-image-window-wrapper-add-img" src={addImageWindow} alt="add image" />
                <textarea className="add-image-window-wrapper-description" ></textarea>
                <input className="add-image-window-wrapper-date" type="date" id="birthday" name="When"></input>
            </div>
        </div>
    )
}

export default AddImage;