import React from 'react'
import './SearchBar.css'

export default function SearchBar({ width }) {
    return (
        <div className='searchbarr' style={{ 'width': `${width}` }}>
            <i id='s-icon' className="fas fa-search"></i>
            <input style={{ 'width': `${width}` }} type='text' />
        </div>
    )
}
