import React, {useState} from 'react';
import Posts from './Posts';
import Albums from "./Albums";

const App = () => {
    const [postsOrAlbums, setPostsOrAlbums] = useState(true);

    return (
        <div>
            <h1>Consuming json placeholder API</h1>
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
