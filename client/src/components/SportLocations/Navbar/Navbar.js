import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

import Logo from './Logo/Logo';

import SearchBar from './SearchBar/SearchBar';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import Contact from './Contact/Contact';

import FrequentQuestions from './FrequentQuestions/FrequentQuestions'

import './Navbar.css';

export default function Navbar({ inBookingLout, inBooking, userResClass, filterResBySportType, filterBySporLocationTitle, searchBar }) {

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
    const history = useHistory()

    const toggleSignOutDropdown = () => {
        let elem = document.querySelector('.sign-out-dropdown');
        console.log(elem.style.display);

        if (elem.style.display === 'none' || elem.style.display === '')
            elem.style.display = 'block';
        else
            elem.style.display = 'none';
    }
    const [loggedIn, setLoggedIn] = useState(false);
    const handleSignOut = () => {
        localStorage.setItem('userLoggedIn', false);
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
    }

    useEffect(() => {
        if (localStorage.getItem('userLoggedIn') === null || localStorage.getItem('userLoggedIn') === 'false')
            setLoggedIn(false)
        else if (localStorage.getItem('userLoggedIn') === 'true')
            setLoggedIn(true);
    }, [])


    let name;
    if (localStorage.getItem('token') !== null) {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'));
        name = decoded.firstName + ' ' + decoded.lastName;
    }



    return (
        <Fragment>
            <div className='navbar-container'>
                <Logo logoStyles={logoStyles} />
                {
                    searchBar !== 'none' ? <SearchBar filterResBySportType={filterResBySportType} filterBySporLocationTitle={filterBySporLocationTitle} /> : null
                }

                {
                    loggedIn === false ?
                        (<div className='logged-out-wrapper'>
                            <Link to='/faq'>
                                <FrequentQuestions inBookingLout={inBookingLout} inBooking={inBooking} userResClass={userResClass} loggedIn={loggedIn} id='fqs' />
                            </Link>
                            <Link to='/signin'>
                                <SignIn signInStyles={signInStyles} />
                            </Link>
                            <Link to='/signup'>
                                <Register registerStyles={registerStyles} />
                            </Link>
                            <Link to='/contact'>
                                <Contact contactStyles={contactStyles} />
                            </Link></div>) : (
                            <Fragment>
                                <div style={window.location.pathname === '/booking' ? { right: '-1.30vw' } : null} className='navbar-part-user-logged-in'>

                                    <div className='booked-btn-container'>
                                        <Link to='/userRes'>
                                            <button>Booked</button>
                                        </Link>
                                    </div>

                                    <div className='contact-btn-container contact-btn-container-sl'>
                                        <Link to='/contact'>
                                            <button>Contact</button>
                                        </Link>
                                    </div>
                                    <div className='u-wrapper'>
                                        <div onClick={toggleSignOutDropdown} className='username-and-logout-container'>
                                            <i class="fas fa-user-circle"></i>
                                            <div>{name}</div>
                                            <i id='arr-d-icon' class="fas fa-sort-down"></i>
                                        </div>
                                        <div className='sign-out-dropdown'>
                                            <i class="fas fa-sort-up"></i>
                                            <span onClick={handleSignOut}> Sign out <i class="fas fa-sign-out-alt"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                }

            </div>

        </Fragment>
    )
}
