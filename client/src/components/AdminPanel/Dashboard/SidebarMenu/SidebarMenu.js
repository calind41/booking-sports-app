import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './SidebarMenu.css'

export default function SidebarMenu({ name, faq }) {
    const dashboardLink = faq === true ? '/supportDashboard' : '/adminDashboard';
    return (
        <div className='sbm-container'>

            <div className='admin-panel'>
                <Link style={{ textDecoration: 'none', color: '#056CF2' }} to={dashboardLink}><p>{name}</p></Link>
            </div>
            <hr />

            <div className='profile-picture'>
                <span className='img-profile-circular'>

                </span>
                <span className='name'>First N. Last N.</span>
            </div>
            <hr />

            <ul>
                <Link style={{ textDecoration: 'none' }} to={dashboardLink}>
                    <li className='blue_color'>
                        <span className="material-icons">
                            dashboard
                        </span>
                        <span className='li-txt'>Dashboard</span>
                    </li>
                </Link>
                <li>
                    <span className="material-icons">
                        account_circle
                        </span>
                    <span className='li-my-acct li-txt'>My Account</span>
                </li>
                {
                    faq === true ? <Link style={{ textDecoration: 'none', }} to='/supportFaq'><li className='faq-li'>
                        <i class="fas fa-question"></i>
                        <span className='li-faq- li-txt'>FAQ</span>
                    </li></Link> : null
                }
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <li>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className='li-so li-txt'> Sign out</span>
                    </li>
                </Link>
            </ul>
        </div >
    )
}
