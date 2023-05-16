import React, { useState, useEffect } from 'react';
import LoadFilters from "./LoadFilters";
import {useParams} from "react-router-dom";

const Photos = () => {
    const {albumId} = useParams();
    const [photos, setPhotos] = useState([]);
    const [loadedPhotos, setLoadedPhotos] = useState([]);
    const [loadNumber, setLoadNumber] = useState(3);
    const [hideBtn, setHideBtn] = useState(false);

    //loading photos
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => response.json())
            .then(data => {
                setPhotos(data);
                setLoadedPhotos(data.slice(0, loadNumber));
            });
    }, [albumId]);

    useEffect(() => {
        setLoadedPhotos(() => photos.slice(0,loadNumber));
    }, [loadNumber]);

    useEffect(() => {
        if(loadedPhotos.length >= photos.length){
            setHideBtn(true);
        }
        else setHideBtn(false);
    }, [loadedPhotos]);

    const handleLoadFilterClick = (filterType) => {
        switch(filterType){
            case 1:
                setLoadNumber(() => 3);
                break;
            case 2:
                setLoadNumber(() => 6);
                break;
            case 3:
                setLoadNumber(() => 9);
                break;
            case 4:
                setLoadNumber(() => 12);
                break;
            default:
                setLoadNumber(() => 3);
                break;
        }
    };

    const handleLoadMoreClick = () => {
        const currentlyLoadedCount = loadedPhotos.length;
        const morePhotos = photos.slice(currentlyLoadedCount, currentlyLoadedCount + loadNumber);
        setLoadedPhotos([...loadedPhotos, ...morePhotos]);
    };

    return (
        <div>
            <h2>Photos</h2>
            <LoadFilters onFilterClick = {handleLoadFilterClick}/>
            {loadedPhotos.map(photo => (
                <div key={photo.id}>
                    <h4>{photo.title}</h4>
                    <img src={photo.url}></img>
                </div>
            ))}
            {!hideBtn ? (
                <button onClick={handleLoadMoreClick}>Load more photos</button>
            ) : (<h4>No more photos</h4>)}
        </div>
    );
};

export default Photos;