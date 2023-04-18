import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import Filters from './Filters'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    //loading posts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setFilteredPosts(data); //at page start, filteredPosts are the same as Posts, its default value
            });
    }, []);

    const handleFilterClick = (filterType) => {
        let filtered = [];
        switch (filterType) {
            //less than 10 chars
            case 1:
                filtered = posts.filter(post => post.title.length < 10);
                break;
            case 2:
                //more than 10 and less than 30
                filtered = posts.filter(post => post.title.length >= 10 && post.title.length <= 30);
                break;
            case 3:
                //more than 30
                filtered = posts.filter(post => post.title.length > 30);
                break;
            case 4:
                //clear filters
                filtered = posts;
                break;
            default:
                filtered = posts;
                break;
        }
        setFilteredPosts(() => filtered);
    };


    return (
        <div>
            <h1>Posts</h1>
            <Filters onFilterClick = {handleFilterClick}/>
            {filteredPosts.map(post => (
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
