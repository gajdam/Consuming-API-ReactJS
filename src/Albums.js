import React, { useState, useEffect } from 'react';
import LoadFilters from "./LoadFilters";
import Photos from "./Photos";

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
                    <button>Open</button>
                    <Photos albumId={album.id}/>
                </div>
            )}
        </div>
    )


}

export default Albums;