import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Logo from './Logo/Logo';

import SearchBar from './SearchBar/SearchBar';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import Contact from './Contact/Contact';

import './Navbar.css';

export default function Navbar({ searchBar }) {

    const logoStyles = {
        left: searchBar === 'none' ? '3.1vw' : '5vw'
    }
    const signInStyles = {
        left: searchBar === 'none' ? '27.5vw' : '18.4vw'
    }
    const registerStyles = {
        left: searchBar === 'none' ? '10.2vw' : '4.7vw'
    }
    const contactStyles = {
        // right: searchBar === 'none' ? '-7.1vw !important' : '9vw'
        left: searchBar === 'none' ? '-7.1vw' : '-9.1vw'
    }

    const toggleSignOutDropdown = () => {
        let elem = document.querySelector('.sign-out-dropdown');
        if (elem.style.display !== 'none')
            elem.style.display = 'none';
        else
            elem.style.display = 'block';
    }
    const [loggedIn, setLoggedIn] = useState(false);
    const handleSignOut = () => {
        localStorage.setItem('userLoggedIn', false);
        setLoggedIn(false);
    }

    useEffect(() => {
        if (localStorage.getItem('userLoggedIn') === null || localStorage.getItem('userLoggedIn') === 'false')
            setLoggedIn(false)
        else if (localStorage.getItem('userLoggedIn') === 'true')
            setLoggedIn(true);
    }, [])
    return (
        <div className='navbar-container'>
            <Logo logoStyles={logoStyles} />
            {
                searchBar !== 'none' ? <SearchBar /> : null
            }

            {
                loggedIn === false ?
                    (<Fragment><Link to='/signin'>
                        <SignIn signInStyles={signInStyles} />
                    </Link>
                        <Link to='/signup'>
                            <Register registerStyles={registerStyles} />
                        </Link>
                        <Link to='/contact'>
                            <Contact contactStyles={contactStyles} />
                        </Link></Fragment>) : (
                        <Fragment>
                            <div style={window.location.pathname === '/booking' ? { right: '-1.30vw' } : null} className='navbar-part-user-logged-in'>
                                <div className='booked-btn-container'>
                                    <button>Booked</button>
                                </div>
                                <div className='contact-btn-container'>
                                    <button>Contact</button>
                                </div>
                                <div className='username-and-logout-container'>
                                    <i class="fas fa-user-circle"></i>
                                    <div>Calin Dodon</div>
                                    <i onClick={toggleSignOutDropdown} id='arr-d-icon' class="fas fa-sort-down"></i>
                                </div>
                                <div className='sign-out-dropdown'>
                                    <i class="fas fa-sort-up"></i>
                                    <span onClick={handleSignOut}> Sign out <i class="fas fa-sign-out-alt"></i></span>
                                </div>
                            </div>
                        </Fragment>
                    )
            }

        </div>
    )
}
