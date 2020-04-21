import React, { Component } from 'react'
import './ContactForm.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'

export default class SignUp extends Component {
    render() {
        return (
            <div className='cntct-container'>
                <div className='cntct'>
                    <div className='cntct-logo'>
                        <Logo />
                    </div>
                    <div className='cntct-fields-wrapper'>
                        <div className='cntct-heading'>
                            Contact Support
                        </div>
                        <div className='firstname-wrap'>
                            <label for="firstname">Your First Name</label>
                            <input type="text" id="firstname" />
                        </div>
                        <div className='lastname-wrap'>
                            <label for="lastname">Your Last Name</label>
                            <input type="text" id="lastname" />
                        </div>
                        <div className='email-wrap'>
                            <label for="email">Your email</label>
                            <input type="email" id="email" />
                        </div>
                        <div className='subject-wrap'>
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" />
                        </div>
                        <div className='your-msg-container'>
                            <label for="txtarea">Your message</label>
                            <textarea id='txtarea'>

                            </textarea>
                        </div>
                        <div>
                            <button id='cntct-btn'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
