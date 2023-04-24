import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";



export const ThemeContext = createContext(null);
const App = () => {

    const [postsOrAlbums, setPostsOrAlbums] = useState(true);

    const [theme, setTheme] = useState("light");

    const toggleTheme = () => setTheme((curr) => (curr === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App" id={theme}>
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
        </ThemeContext.Provider>
    );
};

export default App;

