import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import SidebarMenu from './SidebarMenu/SidebarMenu'
import Navigation from './Navigation/Navigation'

export default function Dashboard() {

    const jwt = require('jsonwebtoken');
    let role;
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
    }

    return (
        role === 'admin' ? (
            <div className='dashboard-container'>
                <div>
                    <SidebarMenu name="Admin Panel" />
                </div>
                <Navigation dashboard='admin' />
                <div className='content'>
                    <div className='sports-customers'>
                        <div className='sport-actions'>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminAddSport'>
                                <div className='add-sport'>
                                    <span className="icon-class material-icons">
                                        add
                                </span>
                                    <span className='txt'>Add Sport</span>
                                </div>
                            </Link>

                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminRemoveSport'>
                                <div className='remove-sport'>
                                    <span className="icon-class material-icons">
                                        remove
                                </span>
                                    <span className='txt'>Remove Sport</span>
                                </div>
                            </Link>
                        </div>
                        <div className='views'>

                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminSports'>
                                <div className='sport-spots-view'>
                                    <span>Sport Spots</span>
                                </div>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminCustomers'>
                                <div className='customers-view'>
                                    <span>Customers</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className='overview'>
                        <div className='overview-heading'>
                            Overview
                        </div>
                        <div className='cards-container'>
                            <div className='members-nr-card'>
                                <span>500 members</span>
                            </div>
                            <div className='sport-types-card'>
                                <span>5 sport types</span>
                            </div>
                            <div className='total-earnings-card'>
                                <span>$12345 total earnings</span>
                            </div>
                            <div className='booked-spots-card'>
                                <span>1400 booked sports</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>) : null
    )
}
