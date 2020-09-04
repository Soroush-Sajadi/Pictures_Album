import React, { useState } from 'react';
import DeleteImage from './DeleteImage';
import deleteIcon from '../Images/deleteIcon.png';
import updateIcon from '../Images/updateIcon.png';
import fullscreenIcon from '../Images/fullscreenIcon.jpg';
import '../Style/RenderingImages.css'

const RenderingImages = ({data, dataIsUpDated}) => {
    const [ getImageId, setGetImageId ] = useState('');
    const [ getImageName, setGetImageName ] = useState('');
    const [ requestImageDelete, setRequestImageDelete ] = useState(false)

    // const updateIndex = (chidData) => {
    //     setGetIndex(chidData)
    // }
    const deleteImageState = (childData) => {
        setRequestImageDelete(childData)
    }
    const dataIsUpDatedSecondChild = (childData) => {
        dataIsUpDated(childData)
    }
    const deleteImage = (e) => {
        if (window.confirm('Are sure you want to delete this photo?')) {
            // Find a better solution later for the Regex.
            const reg = /\F([^\F]+)[\F]?jpg/;
            const url =(e.target.getAttribute('imageUrl'))
            const nameOfImage = (url.match(reg))[0].split('F')[1]
            setGetImageId(e.target.getAttribute('imageId'))
            setGetImageName(nameOfImage)
            setRequestImageDelete(true)
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
    // console.log(data[0] !== undefined ? Object.keys(data[0]).map(item => (data[0][item][0].image) ) : null);
    // console.log(data)
    return(
        <div className="rendering-images-wrapper">
            {data[0] !== undefined  ?
            <>
            {/* {data[0].length !== undefined ?} */}
            {Object.keys(data[0]).map((item , i) => 
            item !== null ?
                <div key={i} className="rendering-images">
                    <div className="rendering-image" value={i} onMouseEnter={showMenu} onMouseLeave={fadeMenu}>
                        <img className="rendering-images-image" value={i} src={data[0][item][0].image} alt="image"  />
                        <div style={{display: "none"}}  id={i} className="rendering-images-icons">
                            <img imageUrl={data[0][item][0].image} imageId={item} className="rendering-images-icon" src={deleteIcon} alt="delete" onClick={deleteImage} />
                            <img className="rendering-images-icon" src={updateIcon} alt="update" />
                            <img className="rendering-images-icon" src={fullscreenIcon} alt="full screen" />
                        </div>
                        
                    </div>
                    <h3>{data[0][item][0].date}</h3>
                    <h4>{data[0][item][0].description}</h4>
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
            {requestImageDelete ?
                <DeleteImage selectedImageId = {getImageId} getImageName={getImageName} dataIsUpDatedSecondChild={dataIsUpDatedSecondChild} deleteImageState={deleteImageState} />
                :
                null
            }
        </div>
    )
}

export default RenderingImages;

