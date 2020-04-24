import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './SportAction.css';

export default function SportAction() {

    const scrollToTop = () => {
        const scrollOptions = {
            top: 0
        }
        window.scrollTo(scrollOptions);
    }
    return (
        <div className='s-a-btns'>
            <Link onClick={scrollToTop} to='/booking'>
                <button className='book'>book</button>
            </Link>
            <button className='view'>view</button>
        </div>
    )
}
