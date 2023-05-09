import React, { useEffect } from 'react';
import DebounceHooks from "./DebounceHooks";


const SearchInput = ({ queryInput, setQueryInput, getCountryByName, getAllCountries }) => {

    const handleChange = (e) => {
        const { value} = e.target;

        setQueryInput(value);
    };

    const debounceSearch = DebounceHooks(queryInput, 500);

    useEffect(() => {
        if (debounceSearch) {
            getCountryByName()
            console.log("debounce");
        } else if (queryInput === "") {
            getAllCountries()
        }
    }, [debounceSearch]);


    return (
        <div className='search-container'>
            <input
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Search the Countries Here"
                value={queryInput}
            />
        </div>

    )

}

export default SearchInput