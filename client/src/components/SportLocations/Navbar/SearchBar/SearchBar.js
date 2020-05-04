import React, { useEffect } from 'react'
import './SearchBar.css'


export default function SearchBar({ filterBySporLocationTitle, filterResBySportType }) {

    useEffect(() => {
        document.querySelector('#search-sl').addEventListener('keyup', (evt) => {
            if (evt.keyCode === 13) {
                evt.preventDefault();
                handleSearch();
            }
        })
    }, [])

    const handleSearch = () => {
        let value = document.querySelector('#search-sl').value;
        if (filterBySporLocationTitle)
            filterBySporLocationTitle(value);
        if (filterResBySportType)
            filterResBySportType(value);
        console.log('SEAAAARCHEEEED');
    }

    return (
        <div className='input-container'>
            <i onClick={handleSearch} class="material-icons">
                search
            </i>
            <input id='search-sl' type='text' placeholder='Search...' />
        </div>
    )
}
