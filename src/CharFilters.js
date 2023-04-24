import React, {useState} from 'react';

const CharFilters = ({onFilterClick}) => {
    const [activeFilter, setActiveFilter] = useState();

    const handleFilterClick = (filterType) => {
        setActiveFilter(filterType);
        onFilterClick(filterType);
    }
    return (
        //values to change
        <div>
            <button onClick={() => handleFilterClick(1)}>-10</button>
            <button onClick={() => handleFilterClick(2)}>10-30</button>
            <button onClick={() => handleFilterClick(3)}>30+</button>
            <button onClick={() => handleFilterClick(4)}>All</button>
        </div>
    )
};

export default CharFilters;