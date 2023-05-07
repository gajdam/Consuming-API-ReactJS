import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";
import ScrollUpButton from "./ScrollUpButton";

export const ThemeContext = createContext(null);
const App = () => {
    const [postsOrAlbums, setPostsOrAlbums] = useState(true);
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--bg-color', isDarkThemeOn ? 'grey' : 'black');
        root.style.setProperty('--txt-color', isDarkThemeOn ? 'black' : 'white');
        root.style.setProperty('--btn-color', isDarkThemeOn ? '#41658A' : 'pink');
        root.style.setProperty('--btn-hover', isDarkThemeOn ? 'blue' : 'red');

        setIsDarkThemeOn(!isDarkThemeOn);
    };

    return (
        <div className="App" data-testid="container">
            <h1>Consuming json placeholder API</h1>
            <button onClick={toggleTheme}>click</button>
            <div>
                <button onClick={() => setPostsOrAlbums(true)} disabled={postsOrAlbums}>Posts</button>
                <button onClick={() => setPostsOrAlbums(false)} disabled={!postsOrAlbums}>Albums</button>
            </div>
            {postsOrAlbums ? <Posts /> : <Albums />}
            <ScrollUpButton />
        </div>

    );
};

export default App;

