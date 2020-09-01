import React, { useState } from 'react';
import DeleteImage from './DeleteImage';
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
                    <img src={item.image} alt="image" />
                    <h3>{item.date}</h3>
                    <h4>{item.description}</h4>
                    <div className="rendering-images-buttons">
                        <input type="submit" value="Update"/>
                        <input index={i-1} type="submit" value="Delete" onClick={deleteImage}/>
                    </div>
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