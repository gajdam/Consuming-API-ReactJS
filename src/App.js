import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => setComments(data));
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ol>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <ol>
                            {comments
                                .filter(comment => comment.postId === post.id)
                                .map(comment => (
                                    <li key={comment.id}>
                                        <h5>{comment.name}</h5>
                                        <p>{comment.body}</p>
                                    </li>
                                ))}
                        </ol>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default App;