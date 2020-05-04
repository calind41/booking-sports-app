import React, { useEffect } from 'react'
import './SearchBar.css'

export default function SearchBar({ applyFilterSearchSportByTitle, applyFilterSearchCustomersByName, applyFilterSearchMessagesByTitle, applyFilterSearchMessagesByTitleInFaq, width }) {

    useEffect(() => {
        document.querySelector('#search-admin').addEventListener('keyup', (evt) => {
            if (evt.keyCode === 13) {
                evt.preventDefault();
                handleSearchSports();

            }
        })
    }, [])

    const handleSearchSports = () => {
        let value = document.querySelector('#search-admin').value;
        if (applyFilterSearchSportByTitle)
            applyFilterSearchSportByTitle(value);
        if (applyFilterSearchCustomersByName)
            applyFilterSearchCustomersByName(value)
        if (applyFilterSearchMessagesByTitle)
            applyFilterSearchMessagesByTitle(value);
        if (applyFilterSearchMessagesByTitleInFaq)
            applyFilterSearchMessagesByTitleInFaq(value);
    }

    return (
        <div className='searchbarr' style={{ 'width': `${width}` }}>
            <i id='s-icon' className="fas fa-search"></i>
            <input id='search-admin' style={{ 'width': `${width}` }} type='text' />
        </div>
    )
}
