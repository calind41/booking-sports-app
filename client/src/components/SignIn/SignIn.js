import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './SignIn.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'

export default function SignIn() {

    const history = useHistory();

    const handleSignIn = async () => {

        const un = document.querySelector('#username').value;
        const pass = document.querySelector('#password').value;
        let email = undefined, username = undefined;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(un)) {
            email = un;
        } else {
            username = un;
        }
        if (
            un === ''
            || pass === ''
        ) alert('All fields are required!');

        let data = {
            username,
            email,
            password: pass
        }
        const res = await axios.post('http://localhost:5000/api/v1/users/login', data);
        console.log(res);
        if (res.data) {
            alert('Logged in ');
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('token', res.data);
            history.push('/');
        }
        else
            alert('The user does not exist');
    }
    return (
        <div className='sign-in-container'>
            <div className='sign-in'>
                <div className='si-logo'>
                    <Logo />
                </div>
                <div className='si-fields-wrapper'>
                    <div className='si-heading'>
                        Sign In
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
                        <button onClick={handleSignIn} id='sign-in-button'>Sign in</button>
                        <div className='su-alternative'>
                            <p>Don't have an account?
                                   <Link style={{ textDecoration: 'none' }} to='/signup'> <span className='si-redir-sign-up'>Sign Up</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
