import React, { useState } from 'react';
import addImage from '../Images/addImage.png'
import addImageWindow from '../Images/addImageWindow.png'
import closeIcon from '../Images/close.svg'
import '../Style/AddImage.css'


const AddImage = () => {
    const [ openAddImageWindow, setOpenAddImageWindow ] = useState(false);
    const [ file, setFile ] = useState(null);
    const [ selectedImage, setSelectedImage] = useState(null)

    const handleChange = e => {
        const file = (e.target.files[0]); 
        setFile(file);
       
        // if (file !== null) {
        //     loadingState(true)
        //     upDateUserImage(window.localStorage.getItem('uid'), file)
        // }
        setSelectedImage(URL.createObjectURL(file))
    }

    const getUserimage =() => {
        document.getElementById("selectimage").click()
    }

    const openAddImageFolder = () => {
        setOpenAddImageWindow(!openAddImageWindow)
        setFile(null);
        setSelectedImage(null)
    }
    console.log(selectedImage)

    return(
        <div className="add-image-wrapper">
            <div>
                <img className="profile-add-image" src={addImage} alt="add image" onClick={openAddImageFolder}/>
            </div>
            { openAddImageWindow ? 
            <div className="add-image-window-wrapper">
                <img className="add-image-window-wrapper-close-image" src={closeIcon} alt="close" onClick={openAddImageFolder}/> 
                <img className="add-image-window-wrapper-add-img" src={file === null ?addImageWindow: selectedImage} alt="add image" onClick={getUserimage}/>
                <textarea className="add-image-window-wrapper-description" ></textarea>
                <input className="add-image-window-wrapper-date" type="date" id="birthday" name="When"/>
                <input className="add-image-window-wrapper-button" type="submit" value="Save"/>
            </div>
            :
            null
            }
            <input style={{display:'none'}} id='selectimage' type="file" onChange={handleChange} />
        </div>
    )
}

export default AddImage;