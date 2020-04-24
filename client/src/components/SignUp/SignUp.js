import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './SignUp.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'



export default function SignUp() {

    const handleCreateAccount = async (evt) => {
        const fn = document.querySelector('#firstname').value;
        const ln = document.querySelector('#lastname').value;
        const un = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const pass = document.querySelector('#password').value;
        const repass = document.querySelector('#retypepass').value;

        if (pass !== repass)
            alert('Passwords do not match!');
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            alert('Wrong format for email!');
        if (
            fn === ''
            || ln === ''
            || un === ''
            || email === ''
            || pass === ''
            || repass === '') alert('All fields are required!');

        const data = {
            firstname: fn,
            lastname: ln,
            username: un,
            email,
            password: pass
        };

        const res = await axios.post('http://localhost:5000/register', { data });
        console.log(res);
    }

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
                        <button onClick={(e) => handleCreateAccount(e)} className='su-btn'>Create account</button>
                        <div className='alternative'>
                            <p>Already have an account?
                                    <Link style={{ 'textDecoration': 'none' }} to='/signin'><span className='su-redir-sign-in'>Sign In</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
