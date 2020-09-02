import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

import Logo from '../../SportLocations/Navbar/Logo/Logo'

import SignIn from '../../SportLocations/Navbar/SignIn/SignIn';
import Register from '../../SportLocations/Navbar/Register/Register';
import Contact from '../../SportLocations/Navbar/Contact/Contact';

import FrequentQuestions from '../../SportLocations/Navbar/FrequentQuestions/FrequentQuestions'

import './BookingNavbar.css';

export default function Navbar({ inBookingLout, inBooking, userResClass, filterResBySportType, filterBySporLocationTitle }) {

    const logoStyles = {
        left: '3.1vw'
    }
    const signInStyles = {
        left: '27.5vw'
    }
    const registerStyles = {
        left: '10.2vw'
    }
    const contactStyles = {
        left: '-7.1vw'
    }
    const history = useHistory()

    const toggleSignOutDropdown = () => {
        let elem = document.querySelector('.booking-sign-out-dropdown');
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
            <div className='booking-nav-container'>
                <Logo logoStyles={logoStyles} />
                {
                    loggedIn === false ?
                        (<div className='booking-logged-out-wrapper'>
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
                            </Link></div>)
                        :
                        (
                            <Fragment>
                                <div style={window.location.pathname === '/booking' ? { right: '-1.30vw' } : null} className='booking-navbar-part-user-logged-in'>

                                    <div className='booking-booked-btn-container'>
                                        <Link to='/userRes'>
                                            <button>Booked</button>
                                        </Link>
                                    </div>

                                    <div className='booking-contact-btn-container'>
                                        <Link to='/contact'>
                                            <button>Contact</button>
                                        </Link>
                                    </div>
                                    <div className='booking-u-wrapper'>
                                        <div onClick={toggleSignOutDropdown} className='booking-username-and-logout-container'>
                                            <i class="fas fa-user-circle"></i>
                                            <div>{name}</div>
                                            <i id='booking-arr-d-icon' class="fas fa-sort-down"></i>
                                        </div>
                                        <div className='booking-sign-out-dropdown'>
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
