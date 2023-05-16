import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    //loading albums
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then(response => response.json())
            .then(data => {setAlbums(data)});
    }, []);

    return (
        <div>
            <h2>Albums</h2>
            {albums.map(album =>
                <div key={album.id}>
                    <h3>{album.title}</h3>
                    <NavLink to={`/albums/${album.id}`}>Open</NavLink>
                </div>
            )}
        </div>
    )
}

export default Albums;