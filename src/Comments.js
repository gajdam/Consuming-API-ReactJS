import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);

    //loading comms
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [postId]);

    return (
        <div>
            <h4>Comments</h4>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <h5>{comment.name}</h5>
                        <p>{comment.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
