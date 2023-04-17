import React, { useState, useEffect } from 'react';
import Comments from './Comments';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    //loading posts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {/*Passing postID to Comments*/}
                    <Comments postId={post.id} />
                </div>
            ))}
        </div>
    );
};

export default Posts;
