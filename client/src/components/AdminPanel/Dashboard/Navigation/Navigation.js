import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Navigation.css'

export default function Navigation({ dashboard, location }) {
    const dashboardLink = dashboard === 'admin' ? '/adminDashboard' : '/supportDashboard';
    return (
        <div className='admin-p-nav-container'>
            <div className='curr-path'>
                <Link to={dashboardLink} >
                    <button>Dashboard</button>
                </Link>
                <span>></span>
                <span>{location}</span>
            </div>
        </div>
    )

}
