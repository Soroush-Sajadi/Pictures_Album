import React, { useState } from 'react';
import DeleteImage from './DeleteImage';
import deleteIcon from '../Images/deleteIcon.png';
import updateIcon from '../Images/updateIcon.png';
import fullscreenIcon from '../Images/fullscreenIcon.jpg';
import '../Style/RenderingImages.css'

const RenderingImages = ({data}) => {
    const [  getIndex, setGetIndex ] = useState('empty');

    // const updateIndex = (chidData) => {
    //     setGetIndex(chidData)
    // }
    const deleteImage = (e) => {
        if (window.confirm('Are sure you want to delete this photo?')) {
            setGetIndex(e.target.getAttribute('index'))
        }
    };
    console.log(getIndex)
    return(
        <div className="rendering-images-wrapper">
            {data[0] !== undefined ?
            <>
            {data[0].map((item , i) => 
            item !== null ?
                <div key={i} className="rendering-images">
                    <div>
                        <img className="rendering-images-image" src={item.image} alt="image" />
                        <span className="rendering-images-icons">
                            <img className="rendering-images-icon" src={deleteIcon} alt="delete" />
                            <img className="rendering-images-icon" src={updateIcon} alt="update" />
                            <img className="rendering-images-icon" src={fullscreenIcon} alt="full screen" />
                        </span>
                        
                    </div>
                    <h3>{item.date}</h3>
                    <h4>{item.description}</h4>
                    {/* <div className="rendering-images-buttons">
                        <input type="submit" value="Update"/>
                        <input index={i-1} type="submit" value="Delete" onClick={deleteImage}/>
                    </div> */}
                </div>
            :
            null
            )}
            </>
            :null
            }
            <DeleteImage selectedIndex = {getIndex} />
        </div>
    )
}

export default RenderingImages;