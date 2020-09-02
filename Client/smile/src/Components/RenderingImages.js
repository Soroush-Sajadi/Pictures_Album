import React, { useState } from 'react';
import DeleteImage from './DeleteImage';
import deleteIcon from '../Images/deleteIcon.png';
import updateIcon from '../Images/updateIcon.png';
import fullscreenIcon from '../Images/fullscreenIcon.jpg';
import '../Style/RenderingImages.css'

const RenderingImages = ({data}) => {
    const [  getIndex, setGetIndex ] = useState('empty');
    const [  getImageName, setGetImageName ] = useState('')

    // const updateIndex = (chidData) => {
    //     setGetIndex(chidData)
    // }
    const deleteImage = (e) => {
        if (window.confirm('Are sure you want to delete this photo?')) {
            // Find a better solution later for the Regex.
            const reg = /\F([^\F]+)[\F]?jpg/;
            const url =(e.target.getAttribute('imageUrl'))
            const nameOfImage = (url.match(reg))[0].split('F')[1]
            setGetIndex(e.target.getAttribute('index'))
            setGetImageName(nameOfImage)
            // document.getElementById(`${getIndex }` ).style.display = "none";
        }
    };
    const showMenu = async(e) => {
        const id = await e.target.getAttribute('value')
        document.getElementById(`${id}`).style.display = "inline-grid";
        // console.log('asd')
    }
    const fadeMenu = async (e) => {
         const id = await e.target.getAttribute('value')
         if (id !== null) {
            document.getElementById(`${id}`).style.display = "none";
         }
    }
    return(
        <div className="rendering-images-wrapper">
            {data[0] !== undefined ?
            <>
            {data[0].map((item , i) => 
            item !== null ?
                <div key={i} className="rendering-images">
                    <div className="rendering-image" value={i} onMouseEnter={showMenu} onMouseLeave={fadeMenu}>
                        <img className="rendering-images-image" value={i} src={item.image} alt="image"  />
                        <div style={{display: "none"}}  id={i} className="rendering-images-icons">
                            <img index={i-1} imageUrl={item.image} className="rendering-images-icon" src={deleteIcon} alt="delete" onClick={deleteImage} />
                            <img index={i-1} className="rendering-images-icon" src={updateIcon} alt="update" />
                            <img index={i-1} className="rendering-images-icon" src={fullscreenIcon} alt="full screen" />
                        </div>
                        
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
            <DeleteImage selectedIndex = {getIndex} getImageName={getImageName} />
        </div>
    )
}

export default RenderingImages;

