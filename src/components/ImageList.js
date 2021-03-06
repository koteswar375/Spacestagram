import React from 'react';
import './ImageList.css';
import ImageCard from './ImageCard';

const Images = (props) => {
    const imageEls = props.images.map((image)=> {
        return <ImageCard  image={image} key={image.url}/>
    })
    return (
    <div className="image-list">{imageEls}</div>
   
    )
}

export default Images;