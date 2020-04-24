import React, { Fragment } from 'react'
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
    return (
        <div className='navbar-container'>
            <Logo logoStyles={logoStyles} />
            {
                searchBar !== 'none' ? <SearchBar /> : null
            }

            {
                localStorage.getItem('userLoggedIn') === false ? (<Fragment><Link to='/signin'>
                    <SignIn signInStyles={signInStyles} />
                </Link>
                    <Link to='/signup'>
                        <Register registerStyles={registerStyles} />
                    </Link>
                    <Link to='/contact'>
                        <Contact contactStyles={contactStyles} />
                    </Link></Fragment>) : (
                        <Fragment>
                            <div>
                                <button>Booked</button>
                            </div>
                            <div>
                                Contact
                            </div>
                            <div>
                                <i></i>
                                <div>Calin Dodon</div>
                                <i></i>
                            </div>
                        </Fragment>
                    )
            }

        </div>
    )
}
