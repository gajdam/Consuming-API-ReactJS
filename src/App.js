import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";

export const ThemeContext = createContext(null);
const App = () => {
    const [postsOrAlbums, setPostsOrAlbums] = useState(true);
    const [bgTheme, setBgTheme] = useState(null);
    const [colorTheme, setColorTheme] = useState(null);
    const [btnTheme, setBtnTheme] = useState(null);
    const [btnHoverTheme, setBtnHoverTheme] = useState(null);

    const toggleTheme = () => {
        const root = document.documentElement;
        const newBgTheme = bgTheme === "light" ? "dark" : "light";
        const newColorTheme = bgTheme === "light" ? "dark" : "light";
        const newBtnTheme = bgTheme === "light" ? "dark" : "light";
        const newBtnHoverTheme = bgTheme === "light" ? "dark" : "light";
        root.style.setProperty('--bg-color', newBgTheme === "light" ? 'grey' : 'black');
        root.style.setProperty('--txt-color', newColorTheme === "light" ? 'black' : 'white');
        root.style.setProperty('--btn-color', newBtnTheme === "light" ? '#41658A' : 'pink');
        root.style.setProperty('--btn-hover', newBtnHoverTheme === "light" ? 'grey' : 'red');
        setBgTheme(newBgTheme);
        setColorTheme(newColorTheme);
        setBtnTheme(newBtnTheme);
        setBtnHoverTheme(newBtnHoverTheme);
    };

    return (
        <div className="App">
            <h1>Consuming json placeholder API</h1>
            <button onClick={toggleTheme}>klik</button>
            <div>
                <button onClick={() => setPostsOrAlbums(true)}>Posts</button>
                <button onClick={() => setPostsOrAlbums(false)}>Albums</button>
            </div>
            {postsOrAlbums
                ? <Posts/>
                : <Albums/>
            }
        </div>
    );
};

export default App;

