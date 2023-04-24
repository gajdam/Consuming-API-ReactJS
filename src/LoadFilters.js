import React, {useState} from 'react';

const LoadFilters = ({onFilterClick}) => {
    const [activeFilter, setActiveFilter] = useState();

    const handleFilterClick = (filterType) => {
        setActiveFilter(filterType);
        onFilterClick(filterType);
    }
    return (
        //values to change
        <div>
            <button onClick={() => handleFilterClick(1)}>3</button>
            <button onClick={() => handleFilterClick(2)}>6</button>
            <button onClick={() => handleFilterClick(3)}>9</button>
            <button onClick={() => handleFilterClick(4)}>12</button>
        </div>
    )
};

export default LoadFilters;