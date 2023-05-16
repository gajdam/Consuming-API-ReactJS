import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";
import ScrollUpButton from "./ScrollUpButton";
import GoogleLogin from "./GoogleLogin"
import {GoogleOAuthProvider} from "@react-oauth/google";
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom";
import Photos from "./Photos";

export const ThemeContext = createContext(null);
const App = () => {
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
            <Router>
                <div className="App" data-testid="container">
                    <h1>Consuming json placeholder API</h1>
                    <GoogleLogin />
                    <button onClick={toggleTheme}>click</button>
                    <div>
                        <NavLink to={"/posts"}>Posts</NavLink>
                        <NavLink to={"/albums"}>Albums</NavLink>
                    </div>
                    <Routes>
                        <Route path={"/posts"} element={<Posts />}/>
                        <Route exact path={"/albums"} element={<Albums />}/>
                        <Route path="/albums/:albumId" element={<Photos />} />
                    </Routes>
                    <ScrollUpButton />
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;

