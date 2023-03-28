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
                    initialVisibleComments[post.id] = 2;
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
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPage, posts]);

    const showMoreComments = (postId) => {
        setVisibleComments({
            ...visibleComments,
            [postId]: (visibleComments[postId] || 0) + 3,
        });
    };

    const getCommentsToShow = (postId) => {
        const postComments = comments.filter((comment) => comment.postId === postId);
        return postComments.slice(0, visibleComments[postId] || 0);
    };

    const hasMoreComments = (postId) => {
        const postComments = comments.filter((comment) => comment.postId === postId);
        return getCommentsToShow(postId).length < postComments.length;
    };

    const paginatedPosts = posts.slice(0, currentPage * 3);

    return (
        <div>
            <h1>Posts</h1>
            <ol>
                {paginatedPosts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <ol>
                            {getCommentsToShow(post.id).map(comment => (
                                <li key={comment.id}>
                                    <h5>{comment.name}</h5>
                                    <p>{comment.body}</p>
                                </li>
                            ))}
                        </ol>
                        {hasMoreComments(post.id) && (
                            <button onClick={() => showMoreComments(post.id)}>Load more</button>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default App;
