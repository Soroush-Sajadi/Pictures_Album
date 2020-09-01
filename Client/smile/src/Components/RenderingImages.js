import React from 'react';
import '../Style/RenderingImages.css'

const RenderingImages = ({data}) => {
    console.log(data)
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
                    <div>
                        <input type="submit" value="update"/>
                        <input type="submit" value="delete" />
                    </div>
                </div>
            :
            null
            )}
            </>
            :null
            }
        </div>
    )
}

export default RenderingImages;