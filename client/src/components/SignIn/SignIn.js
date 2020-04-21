import React, { Component } from 'react'
import './SignIn.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'

export default class SignIn extends Component {
    render() {
        return (
            <div className='sign-in-container'>
                <div className='sign-in'>
                    <div className='si-logo'>
                        <Logo />
                    </div>
                    <div className='si-fields-wrapper'>
                        <div className='si-heading'>
                            Sign Up
                        </div>

                        <div className='username-wrap'>
                            <label for="username">username / email</label>
                            <input type="text" id="username" />
                        </div>
                        <div className='password-wrap'>
                            <label for="password">password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className='sign-in-btn-wrapper'>
                            <button id='sign-in-button'>Sign in</button>
                            <div className='su-alternative'>
                                <p>Don't have an account?<span className='si-redir-sign-up'>Sign Up</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
