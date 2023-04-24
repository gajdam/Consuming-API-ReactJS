import React, {useState} from 'react';
import Posts from './Posts';
import {createContext} from "react";


export const ThemeContext = createContext(null);
const App = () => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => setTheme((curr) => (curr === "light" ? "dark" : "light"));
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App" id={theme}>
            <h1>Consuming json placeholder API</h1>
            <button onClick={toggleTheme}>klik</button>
            <Posts/>
        </div>
        </ThemeContext.Provider>
    );
};

export default App;

