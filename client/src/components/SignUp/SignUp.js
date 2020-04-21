import React, { Component } from 'react'
import './SignUp.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'

export default class SignUp extends Component {
    render() {
        return (
            <div className='signup-container'>
                <div className='signup'>
                    <div className='su-logo'>
                        <Logo />
                    </div>
                    <div className='su-fields-wrapper'>
                        <div className='su-heading'>
                            Sign Up
                        </div>
                        <div className='firstname-wrap'>
                            <label for="firstname">Your First Name</label>
                            <input type="text" id="firstname" />
                        </div>
                        <div className='lastname-wrap'>
                            <label for="lastname">Your Last Name</label>
                            <input type="text" id="lastname" />
                        </div>
                        <div className='username-wrap'>
                            <label for="username">Your username</label>
                            <input type="text" id="username" />
                        </div>
                        <div className='email-wrap'>
                            <label for="email">Your email</label>
                            <input type="email" id="email" />
                        </div>
                        <div className='password-wrap'>
                            <label for="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className='retype-pass-wrap'>
                            <label for="retypepass">Retype Password</label>
                            <input type="password" id="retypepass" />
                        </div>
                        <div>
                            <button className='su-btn'>Create account</button>
                            <div className='alternative'>
                                <p>Already have an account?<span className='su-redir-sign-in'>Sign In</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
