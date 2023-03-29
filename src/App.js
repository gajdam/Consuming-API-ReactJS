import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const initialVisibleComments = {};
                data.forEach(post => {
                    initialVisibleComments[post.id] = 2; //2 comments are loaded when entering the page
                });
                setPosts(data);
                setVisibleComments(initialVisibleComments);
            });
    }, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => setComments(data));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                currentPage * 3 < posts.length
            ) {
                setCurrentPage(currentPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage, posts]);

    //onClick method
    //3 comments are loaded
    const showMoreComments = postId => {
        setVisibleComments({
            ...visibleComments,
            [postId]: (visibleComments[postId] || 0) + 3,
        });
    };

    const getCommentsToShow = postId => {
        const postComments = comments.filter(comment => comment.postId === postId);
        return postComments.slice(0, visibleComments[postId] || 0);
    };

    const hasMoreComments = postId => {
        const postComments = comments.filter(comment => comment.postId === postId);
        return getCommentsToShow(postId).length < postComments.length;
    };

    return (
        <div>
            <h1>Posts</h1>
            {posts.slice(0, currentPage * 3).map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <ul>
                        {getCommentsToShow(post.id).map(comment => (
                            <li key={comment.id}>
                                <h5>{comment.name}</h5>
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                    {hasMoreComments(post.id) && (
                        <button onClick={() => showMoreComments(post.id)}>Load more</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
