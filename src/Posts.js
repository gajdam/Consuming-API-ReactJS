import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import CharFilters from './CharFilters'
import LoadFilters from "./LoadFilters";
import './index.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [loadNumber, setLoadNumber] = useState(3);
    const [hideBtn, setHideBtn] = useState(false);

    //loading posts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setFilteredPosts(data); //at page start, filteredPosts are the same as Posts, its default value
                setLoadedPosts(data.slice(0,loadNumber));
            });
    }, []);

    useEffect(() => {
        setLoadedPosts(() => filteredPosts.slice(0,loadNumber));
    }, [loadNumber, filteredPosts]);

    useEffect(() => {
        if(loadedPosts.length >= filteredPosts.length){
            setHideBtn(true);
        }
        else setHideBtn(false);
    }, [loadedPosts]);

    const handleCharFilterClick = (filterType) => {
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

    const handleLoadFilterClick = (filterType) => {
        switch(filterType){
            case 1:
                setLoadNumber(() => 3);
                break;
            case 2:
                setLoadNumber(() => 6);
                break;
            case 3:
                setLoadNumber(() => 9);
                break;
            case 4:
                setLoadNumber(() => 12);
                break;
            default:
                setLoadNumber(() => 3);
                break;
        }
    };

    //loading mechanic
    const handleLoadMoreClick = () => {
        const currentlyLoadedCount = loadedPosts.length;
        const morePosts = filteredPosts.slice(currentlyLoadedCount, currentlyLoadedCount + loadNumber);
        setLoadedPosts([...loadedPosts, ...morePosts]);
    }

    return (
        <div>
            <h2>Posts</h2>
            <CharFilters onFilterClick = {handleCharFilterClick}/>
            <LoadFilters onFilterClick = {handleLoadFilterClick}/>
            {loadedPosts.map(post => (
                <div key={post.id} className="posts">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {/*Passing postID to Comments*/}
                    <Comments postId={post.id} />
                </div>
            ))}
            {!hideBtn ? (
                <button onClick={handleLoadMoreClick}>Load more posts</button>
            ) : (<h4>No more posts</h4>)}
        </div>
    );
};

export default Posts;
