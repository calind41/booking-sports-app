import React from 'react'
import './SearchBar.css'


export default function SearchBar() {
    return (
        <div className='input-container'>
            <i class="material-icons">
                search
</i>
            <input type='text' placeholder='Search...' />
        </div>
    )
}
