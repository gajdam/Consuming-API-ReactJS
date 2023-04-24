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
            <h1>Albums</h1>
            {/*<LoadFilters onFilterClick={}/>*/}
            {albums.map(album =>
                <div key={album.id}>
                    <button>Open</button>
                    <h2>{album.title}</h2>
                    <Photos albumId={album.id}/>
                </div>
            )}
        </div>
    )


}

export default Albums;