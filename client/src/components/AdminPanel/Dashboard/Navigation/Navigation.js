import React, { Component } from 'react'
import './Navigation.css'

export default function Navigation({ location }) {

    return (
        <div className='admin-p-nav-container'>
            <div className='curr-path'>
                <button>Dashboard</button>
                <span>></span>
                <span>{location}</span>
            </div>
        </div>
    )

}
