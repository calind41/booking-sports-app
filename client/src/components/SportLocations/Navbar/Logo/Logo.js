import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
export default function Logo({ logoStyles }) {
    return (
        <Link style={{ textDecoration: 'none' }} to='/'>
            <div style={logoStyles !== undefined ? { left: `${logoStyles.left}` } : { color: '#056CF2', left: '-4vw', top: '4vh' }} className='logo'>
                GenMotion
            </div>
        </Link>
    )
}
