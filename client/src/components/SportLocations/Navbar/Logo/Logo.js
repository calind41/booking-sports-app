import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
export default function Logo({ logoStyles }) {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        if (logoStyles)
            logoStyles.left = '0.28vw';

    }
    if (localStorage.getItem('userLoggedIn') === 'true'
        && window.location.pathname === '/booking') {
        if (logoStyles)
            logoStyles.left = '-5.69vw'

    }
    return (
        <Link style={{ textDecoration: 'none' }} to='/'>
            <div style={logoStyles !== undefined ? { left: `${logoStyles.left}` } : { color: '#056CF2', left: '-4vw', top: '4vh' }} className='logo'>
                GenMotion
            </div>
        </Link>
    )
}
