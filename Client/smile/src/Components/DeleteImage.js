import React, {useEffect} from 'react';

const DeleteImage = ({selectedIndex, getImageName }) => {

    const deleteSelectedImage = async (uid, imageIndex, imageName) => {
        
        await fetch(`http://localhost:3000/delete/user/image/${uid}/${imageIndex}/${imageName}`)

    }
    useEffect(() => {
        if (Number.isInteger(Number(selectedIndex))) {
            // const imageInfo = `${selectedIndex,getImageUrl}`
            deleteSelectedImage(window.localStorage.getItem('uid'),selectedIndex, getImageName)
        } else {
            return;
        }
    })
    return (
        <>
        </>
    )
}

export default DeleteImage;