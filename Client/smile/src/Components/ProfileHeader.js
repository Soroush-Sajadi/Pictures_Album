import React, {useState, useEffect} from 'react';
import axios from 'axios'
import SignOut from './SignOut'
import '../Style/ProfileHeader.css'
import userImage from '../Images/userImage.png';

const ProfileHeader = () => {
    const [ file, setFile ] = useState(null);
    const [ image, setImage ] = useState('');
    const [ progress, setProgess ] = useState(0);

    const handleChange = e => {
        setProgess(0)
        const file = (e.target.files[0]); 
        setFile(file);
        if (file !== null) {
            upDateUserImage(window.localStorage.getItem('uid'), file)
        }
    }

    const getUserImage =() => {
        // await fetch (`http://localhost:3000/update/user/image/${uid}/${image}`)
        document.getElementById("selectImage").click()
    }

    const upDateUserImage = async (id, image) => {
        const url = 'http://localhost:3000/update/user/image/'
        const formData = new FormData();
        formData.append( 'file', image, ['profile.png', id])
        axios.post(url, formData, {
            headers: {'Content-Type': 'application/json'},
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
        })
    } 
    // useEffect(() => {
    //     if (file !== null) {
    //         upDateUserImage()
    //         setFile(null);
    //     }
    // }, [])
    return(
        <div className="profile-header-wrapper">
            <SignOut />
            <img src={image === '' ? userImage: image} alt="user image" onClick={getUserImage} />
            <h4>smile</h4>
            <input style={{display:'none'}} id='selectImage' type="file" onChange={handleChange} />
        </div> 
    )
}

export default ProfileHeader;


{/* <input type="submit" value="Add Image" onClick={saveData} /> */}