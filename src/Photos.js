import React, { useState, useEffect } from 'react';
import LoadFilters from "./LoadFilters";
import {useParams} from "react-router-dom";
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

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
            <h2 className="posts-title">Photos</h2>
            <div className="filter-buttons-div">
                <p>number of photos</p><LoadFilters onFilterClick = {handleLoadFilterClick}/>
            </div>
            <ResponsiveMasonry columnsCountBreakPoints={{300:1, 600:2, 900:3}} style={{padding: "10px"}}>
                <Masonry gutter="20px">
                    {loadedPhotos.map(photo => (
                    <div className="imageContainer" key={photo.id}>
                        <img src={photo.url} style={{width: "100%", display: "block"}} alt=""></img>
                        <div className='overlay'>
                            <div className='overlayText'>
                                <h3>{photo.title}</h3>
                            </div>
                        </div>
                    </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            {!hideBtn ? (
                <div className="load-more-posts"><button onClick={handleLoadMoreClick}>Load more photos</button></div>
            ) : (<div className="load-more-posts"><h4>No more photos</h4></div>)}
        </div>
    );
};

export default Photos;