import React, { Component } from 'react'
import './SidebarMenu.css'

export default class SidebarMenu extends Component {
    render() {
        return (
            <div className='sbm-container'>
                <div className='admin-panel'>
                    <p>{this.props.name}</p>
                </div>
                <hr />

                <div className='profile-picture'>
                    <span className='img-profile-circular'>

                    </span>
                    <span className='name'>First N. Last N.</span>
                </div>
                <hr />

                <ul>
                    <li className='blue_color'>
                        <span className="material-icons">
                            dashboard
                        </span>
                        <span className='li-txt'>Dashboard</span>
                    </li>
                    <li>
                        <span className="material-icons">
                            account_circle
                        </span>
                        <span className='li-my-acct li-txt'>My Account</span>
                    </li>
                    {
                        this.props.faq === true ? <li className='faq-li'>
                            <i class="fas fa-question"></i>
                            <span className='li-faq- li-txt'>FAQ</span>
                        </li> : null
                    }

                    <li>
                        <i className="fas fa-sign-out-alt"></i>
                        <span className='li-so li-txt'> Sign out</span>
                    </li>
                </ul>
            </div >
        )
    }
}
