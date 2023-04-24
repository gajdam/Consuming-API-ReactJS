import React, { useState, useEffect } from 'react';

const Photos = ({ albumId }) => {
    const [photos, setPhotos] = useState([]);

    //loading photos
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => setPhotos(data));
    }, [albumId]);

    return (
        <div>
            {photos.map(photo => (
                <div key={photo.id}>
                    <h4>{photo.title}</h4>
                    <img src={photo.url}></img>
                </div>
            ))}
        </div>
    );
};

export default Photos;