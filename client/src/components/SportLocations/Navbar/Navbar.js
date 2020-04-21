import React from 'react'
import Logo from './Logo/Logo';

import SearchBar from './SearchBar/SearchBar';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import Contact from './Contact/Contact';

import './Navbar.css';

export default function Navbar({ searchBar }) {
    return (
        <div className='navbar-container'>
            <Logo />
            {
                searchBar !== 'none' ? <SearchBar /> : null
            }

            <SignIn />
            <Register />
            <Contact />

        </div>
    )
}
