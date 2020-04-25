import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './SportAction.css';

export default function SportAction({ title, location, sport, images, serviceOptions, availableTimes, format, type, surface, facilities }) {

    const scrollToTop = () => {
        const scrollOptions = {
            top: 0
        }
        window.scrollTo(scrollOptions);
    }
    const data = {
        title,
        location,
        sport,
        images,
        serviceOptions,
        availableTimes,
        format,
        type,
        surface,
        facilities
    }
    return (
        <div className='s-a-btns'>
            <Link onClick={scrollToTop} to={{ pathname: '/booking', state: data }}>
                <button className='book'>book</button>
            </Link>
            <button className='view'>view</button>
        </div>
    )
}
