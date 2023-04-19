import React, { useState, useEffect } from 'react';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [loadedComments, setLoadedComments] = useState([]);
    const [hideBtn, setHideBtn] = useState(false);

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
        const index = currentlyLoadedCount + 3;
        const moreComments = comments.slice(currentlyLoadedCount, currentlyLoadedCount + 3);
        setLoadedComments([...loadedComments, ...moreComments]); //spread

        if (index >= comments.length) {
            setHideBtn(true);
        }
    }

    const handleHideClick = () => {
        setLoadedComments(comments.slice(0, 2));
        setHideBtn(false);

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
            {!hideBtn ? (
                <button onClick = {handleLoadMoreClick}>Load more</button>
            ) : (
                <button onClick = {handleHideClick}>Hide</button>
            )}
        </div>
    );
};

export default Comments;
