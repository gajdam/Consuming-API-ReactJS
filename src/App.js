import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";
import {createContext} from "react";
import ScrollUpButton from "./ScrollUpButton";
import GoogleLogin from "./GoogleLogin"
import {GoogleOAuthProvider} from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import {BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom";
import Photos from "./Photos";

export const ThemeContext = createContext(null);
const App = () => {
    const [isDarkThemeOn, setIsDarkThemeOn] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.style.setProperty('--bg-color', isDarkThemeOn ? 'grey' : '#37323E');
        root.style.setProperty('--bg-color2', isDarkThemeOn ? '#888787' : '#473f54');
        root.style.setProperty('--txt-color', isDarkThemeOn ? 'black' : 'white');
        root.style.setProperty('--btn-color', isDarkThemeOn ? '#41658A' : '#6d5793');
        root.style.setProperty('--btn-hover', isDarkThemeOn ? 'blue' : '#8c71bb');
        root.style.setProperty('--nav-color', isDarkThemeOn ? '#5e5e5e' : '#2c2931');
        root.style.setProperty('--shadow-color', isDarkThemeOn ? 'rgba(0, 0, 0, 0.1)' : 'rgb(44,41,49, 1.5)');
        // 44 41 49
        setIsDarkThemeOn(!isDarkThemeOn);
    };

    return (
        <GoogleOAuthProvider clientId={"167402479759-n01k31qjac5etm31ujfqn6d5trd88i5c.apps.googleusercontent.com"}>
          <Router>
            <div className="App" data-testid="container" id="app">
                <header>
                    <h1><a href="#top"> json placeholder API</a></h1>
                        <nav className="first-nav">
                            <NavLink to={"/posts"}>Posts</NavLink>
                            <NavLink to={"/albums"}>Albums</NavLink>
                        </nav>
                    <button onClick={toggleTheme} className="theme-switcher" id="themeBtn">
                        {isDarkThemeOn ? (
                        <FontAwesomeIcon icon={faSun}/>
                        ) : (
                        <FontAwesomeIcon icon={faMoon}/>
                            )}
                    </button>
                        <div className="google-div">
                        <GoogleLogin />
                        </div>
                </header>
                <div className="main-content">
                  <Routes>
                      <Route path={"/posts"} element={<Posts />}/>
                      <Route exact path={"/albums"} element={<Albums />}/>
                      <Route path="/albums/:albumId" element={<Photos />} />
                  </Routes>                
              </div>
              <ScrollUpButton />
            </div>
          </Router>
        </GoogleOAuthProvider>
    );
};

export default App;

