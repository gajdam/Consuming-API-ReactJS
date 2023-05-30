import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import LoadFilters from "./LoadFilters";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [loadedAlbums, setLoadedAlbums] = useState([]);
    const [loadNumber, setLoadNumber] = useState(3);
    const [hideBtn, setHideBtn] = useState(false);

    //loading albums
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then(response => response.json())
            .then(data => {
                setAlbums(data);
                setLoadedAlbums(data.slice(0, loadNumber));
            });
    }, []);

    useEffect(() => {
        setLoadedAlbums(() => albums.slice(0,loadNumber));
    }, [loadNumber]);

    useEffect(() => {
        if(loadedAlbums.length >= albums.length){
            setHideBtn(true);
        }
        else setHideBtn(false);
    }, [loadedAlbums]);

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
        const currentlyLoadedCount = loadedAlbums.length;
        const moreAlbums = albums.slice(currentlyLoadedCount, currentlyLoadedCount + loadNumber);
        setLoadedAlbums([...loadedAlbums, ...moreAlbums]);
    };

    return (
        <div>
            <h2 className='posts-title'>Albums</h2>
            <div className="filter-buttons-div">
                <p>number of albums</p><LoadFilters onFilterClick = {handleLoadFilterClick}/>
            </div>
            {loadedAlbums.map(album =>
                <div className='posts' key={album.id}>
                    <h3>{album.title}</h3>
                    <AuthorInfo userID={album.userId}/>
                    <NavLink  to={`/albums/${album.id}`}>Open</NavLink>
                </div>
            )}
            {!hideBtn ? (
                <div className="load-more-posts"><button onClick={handleLoadMoreClick}>Load more albums</button></div>
            ) : (<div className="load-more-posts"><h4>No more albums</h4></div>)}
        </div>
    )
}

const AuthorInfo = ({ userID }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data);
            });
    }, [userID]);

    return (
        <>
            {author && (
                <h4>Author: {author.name}</h4>
            )}
        </>
    )
}

export default Albums;