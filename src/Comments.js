import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loadedComments, setLoadedComments] = useState([]);

    //loading comms
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setLoadedComments(data.slice(0, 2)); //default value
            });
    }, [postId]);

    const handleLoadMoreClick = () => {
        const currentlyLoadedCount = loadedComments.length;
        const moreComments = comments.slice(currentlyLoadedCount, currentlyLoadedCount + 3);
        setLoadedComments([...loadedComments, ...moreComments]);
    }

    return (
        <div>
            <h4>Comments</h4>
            <ul>
                {loadedComments.map(comment => (
                    <li key={comment.id}>
                        <h5>{comment.name}</h5>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
            {loadedComments.length < comments.length && (
                <button onClick = {handleLoadMoreClick}>Load more</button>
            )}
        </div>
    );
};

export default Comments;
