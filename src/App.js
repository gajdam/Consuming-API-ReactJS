import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState({});

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

    const showMoreComments = (postId) => {
        setVisibleComments({
            ...visibleComments,
            [postId]: (visibleComments[postId] || 0) + 3,
        });
    }

    const getCommentsToShow = (postId) =>
        comments
            .filter((comment) => comment.postId === postId)
            .slice(0, visibleComments[postId] || 0);


  // const commentsToShow = comments.slice(0, visibleComments);

  return (
      <div>
        <h1>Posts</h1>
        <ol>
          {posts.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <ol>
                  {getCommentsToShow(post.id)
                      // .filter(comment => comment.postId === post.id)
                      .map(comment => (
                          <li key={comment.id}>
                            <h5>{comment.name}</h5>
                            <p>{comment.body}</p>
                          </li>
                      ))}
                </ol>
                  {getCommentsToShow(post.id).length < comments.length && (
                  <button onClick={() => showMoreComments(post.id)}>Load more</button>
                  )}
              </li>
          ))}
        </ol>
      </div>
  );
}

export default App;