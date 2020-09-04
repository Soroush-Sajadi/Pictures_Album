import React, {useEffect} from 'react';

const DeleteImage = ({selectedImageId, getImageName, dataIsUpDatedSecondChild, deleteImageState }) => {

    const deleteSelectedImage = async (uid, imageId, imageName) => {
        
        await fetch(`http://localhost:3000/delete/user/image/${uid}/${imageId}/${imageName}`)
            .then(res => res.json())
            .then(res => res === 'Its done' ? dataIsUpDatedSecondChild(true) : console.log('some thing went wrong!'));

    }
    useEffect(() => {
            // const imageInfo = `${selectedIndex,getImageUrl}`
            deleteSelectedImage(window.localStorage.getItem('uid'),selectedImageId, getImageName)
            deleteImageState(false)
    })
    return (
        <>
        </>
    )
}

export default DeleteImage;