import React, { useState } from 'react';
import axios from 'axios';
import addImage from '../Images/addImage.png'
import addImageWindow from '../Images/addImageWindow.png'
import closeIcon from '../Images/close.svg'
import '../Style/AddImage.css'


const AddImage = ({profileName, numberOfImages , dataIsUpDated, loadingState}) => {
    const [ openAddImageWindow, setOpenAddImageWindow ] = useState(false);
    const [ file, setFile ] = useState(null);
    const [ selectedImage, setSelectedImage] = useState(null)

    const handleChange = e => {
        const file = (e.target.files[0]); 
        setFile(file);
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

    const fetchImage = async (id, image) => {
        const url = 'http://localhost:3000/add/user/image/'
        const formData = new FormData();
        formData.append( 'file', image, [`${profileName[0]}`, id, numberOfImages[0]])
        axios.post(url, formData, {
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.data === 'Its done' ? dataIsUpDated(true) || setOpenAddImageWindow(!openAddImageWindow) : null)
    }

    const postImage = () => {
        if (file !== null) {
            loadingState(true)
            fetchImage(window.localStorage.getItem('uid'), file);
            
        }
        
    }
    return(
        <div className="add-image-wrapper">
            <div>
                <img className="profile-add-image" src={addImage} alt="add image" onClick={openAddImageFolder}/>
            </div>
            { openAddImageWindow ? 
            <div className="add-image-window-wrapper">
                <img className="add-image-window-wrapper-close-image" src={closeIcon} alt="close" onClick={openAddImageFolder}/> 
                <img className="add-image-window-wrapper-add-img" src={file === null ?addImageWindow: selectedImage} alt="add image" onClick={getUserimage}/>
                <input type="text" className="add-image-window-wrapper-description" placeholder='Title' ></input>
                <input className="add-image-window-wrapper-date" type="date" id="birthday" name="When"/>
                <input className="add-image-window-wrapper-button" type="submit" value="Save" onClick={postImage}/>
            </div>
            :
            null
            }
            <input style={{display:'none'}} id='selectimage' type="file" onChange={handleChange} />
        </div>
    )
}

export default AddImage;