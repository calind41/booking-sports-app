import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ContactForm.css'
import Logo from '../SportLocations/Navbar/Logo/Logo'
import { toast } from 'react-toastify'

toast.configure();
let backend_addr = 'http://www.mysportsbooking.com/'


export default function ContactForm() {


    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(localStorage.getItem('token'));
            const userId = decoded.userId;

            const getUser = async () => {
                const { data } = await axios.get(`${backend_addr}api/v1/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const { firstName, lastName, email } = data;

                document.querySelector('#firstname').value = `${firstName}`;
                document.querySelector('#lastname').value = `${lastName}`;
                if (email) {
                    document.querySelector('#email').value = `${email}`
                }
            }
            getUser();

        }
    }, [])

    const sendMessage = async () => {
        const firstName = document.querySelector('#firstname').value;
        const lastName = document.querySelector('#lastname').value;
        const email = document.querySelector('#email').value;
        const subject = document.querySelector('#subject').value;
        const messageBody = document.querySelector('#txtarea').value;
        const date = new Date().toString().split(' ').filter((item, index) => index > 0 && index < 4).join(' ');
        const time = new Date().toString().split(' ').filter((item, index) => index > 3 && index < 5).join().substring(0, 5);
        const alreadyResponded = false;
        const alreadyRead = false;
        const inFaq = false;

        let fromAuser = false;
        let user = undefined;
        if (localStorage.getItem('token') !== null) {
            fromAuser = true;
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(localStorage.getItem('token'));
            user = decoded.userId;
        }


        console.log(firstName, lastName, email, subject, messageBody, date, time, user);

        const message = {
            user,
            fromAuser,
            inFaq,
            alreadyRead,
            alreadyResponded,
            firstName,
            lastName,
            email,
            subject,
            messageBody,
            date,
            time
        };

        await axios.post(`${backend_addr}api/v1/messages/`, message);
        toast.info("Message was sent successfully, we'll contact you by email!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        document.querySelector('#firstname').value = '';
        document.querySelector('#lastname').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#subject').value = '';
        document.querySelector('#txtarea').value = '';


    }






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
                        <button onClick={sendMessage} id='cntct-btn'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
