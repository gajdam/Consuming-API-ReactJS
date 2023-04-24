import React, { useState, useEffect } from 'react';
import Comments from './Comments';
import CharFilters from './CharFilters'
import LoadFilters from "./LoadFilters";

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
                setLoadedPosts(filteredPosts.slice(0,loadNumber));
            });
    }, []);

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
        setLoadedPosts(filtered.slice(0,loadNumber));

        if(loadedPosts.length >= filteredPosts.length){
            setHideBtn(true);
        }
        else setHideBtn(false);
    };

    const handleLoadFilterClick = (filterType) => {
        let loadFrequency;
        switch(filterType){
            case 1:
                loadFrequency = 3;
                break;
            case 2:
                loadFrequency = 6;
                break;
            case 3:
                loadFrequency = 9;
                break;
            case 4:
                loadFrequency = 12;
                break;
            default:
                loadFrequency = 3;
                break;
        }
        setLoadNumber(() => loadFrequency);
        setLoadedPosts(() => filteredPosts.slice(0,loadNumber));

        if(loadedPosts.length >= filteredPosts.length){
            setHideBtn(true);
        }
        else setHideBtn(false);
    };

    const handleLoadMoreClick = () => {
        const currentlyLoadedCount = loadedPosts.length;
        const index = currentlyLoadedCount + loadNumber;
        const morePosts = filteredPosts.slice(currentlyLoadedCount, currentlyLoadedCount + loadNumber);
        setLoadedPosts([...loadedPosts, ...morePosts]);

        if(index >= filteredPosts.length) {
            setHideBtn(true);
        }
        else setHideBtn(false);
    }

    return (
        <div>
            <h1>Posts</h1>
            <CharFilters onFilterClick = {handleCharFilterClick}/>
            <LoadFilters onFilterClick = {handleLoadFilterClick}/>
            {loadedPosts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {/*Passing postID to Comments*/}
                    <Comments postId={post.id} />
                </div>
            ))}
            {!hideBtn && (
                <button onClick={handleLoadMoreClick}>Load More</button>
            )}
        </div>
    );
};

export default Posts;
