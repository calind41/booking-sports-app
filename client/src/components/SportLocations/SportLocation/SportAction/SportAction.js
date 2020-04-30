import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './SportAction.css';

export default function SportAction({ title, location, district, sport, images, sportOpts, inventory }) {
    // sportOptions={sportOptions} images={images} title={title} location={location} district={district} sport={sport} inventory={inventory}
    const scrollToTop = () => {
        const scrollOptions = {
            top: 0
        }
        window.scrollTo(scrollOptions);
    }
    const data = {
        title,
        location,
        district,
        sport,
        images,
        sportOpts,
        inventory
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
