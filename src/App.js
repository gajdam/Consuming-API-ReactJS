import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";
import ScrollUpButton from "./ScrollUpButton";
import GoogleLogin from "./GoogleLogin"
import {GoogleOAuthProvider} from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const ThemeContext = createContext(null);
const App = () => {
    const [postsOrAlbums, setPostsOrAlbums] = useState(true);
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--bg-color', isDarkThemeOn ? 'grey' : 'black');
        root.style.setProperty('--bg-color2', isDarkThemeOn ? '#888787' : 'pink');
        root.style.setProperty('--txt-color', isDarkThemeOn ? 'black' : 'white');
        root.style.setProperty('--btn-color', isDarkThemeOn ? '#41658A' : 'pink');
        root.style.setProperty('--btn-hover', isDarkThemeOn ? 'blue' : 'red');

        setIsDarkThemeOn(!isDarkThemeOn);
    };

    return (
        <GoogleOAuthProvider clientId={"167402479759-n01k31qjac5etm31ujfqn6d5trd88i5c.apps.googleusercontent.com"}>
            <div className="App" data-testid="container">
                <header>
                    <h1>Consuming json placeholder API</h1>
                        <nav>
                            <button onClick={() => setPostsOrAlbums(true)} disabled={postsOrAlbums}>Posts</button>
                            <button onClick={() => setPostsOrAlbums(false)} disabled={!postsOrAlbums}>Albums</button>
                        </nav>
                    <button onClick={toggleTheme} className="theme-switcher">
                        {isDarkThemeOn ? (
                        <FontAwesomeIcon icon={faSun}/>
                        ) : (
                        <FontAwesomeIcon icon={faMoon}/>
                            )}
                    </button>
                        <GoogleLogin />
                </header>
                <div className="main-content">
                {postsOrAlbums ? <Posts /> : <Albums />}
                <ScrollUpButton />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;

