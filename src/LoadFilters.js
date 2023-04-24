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
            <button onClick={() => handleFilterClick(2)}>5</button>
            <button onClick={() => handleFilterClick(3)}>8</button>
            <button onClick={() => handleFilterClick(4)}>10</button>
        </div>
    )
};

export default LoadFilters;