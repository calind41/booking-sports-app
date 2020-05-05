import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Message.css'
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 'auto',
            marginBottom: '3vh',
            width: '80vw',
            height: '25vh',
        },
    },
}));
export default function Message({ msg, setMessageDetails, initialChecked, setSelectedItemState, setUnselectedItemState, index, nrMessages }) {


    const [checked, setChecked] = React.useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [alreadyRead, setAlreadyRead] = useState(msg.alreadyRead);
    const [alreadyResponded, setAlreadyResponded] = useState(msg.alreadyResponded);
    const [inFaq, setInFaq] = useState(msg.inFaq);

    useEffect(() => {
        setChecked(false);
    }, [nrMessages])

    useEffect(() => {
        console.log('already read');
    }, [alreadyRead])
    useEffect(() => {

        const initialize = async () => {
            if (msg.fromAuser) {
                setFirstName(msg.user.firstName);
                setLastName(msg.user.lastName);
                setEmail(msg.user.email)
            } else {
                setFirstName(msg.firstName);
                setLastName(msg.lastName);
                setEmail(msg.email);
            }
            if (index === 0) {
                document.querySelector('.msg-container').style.backgroundColor = 'rgb(177, 205, 240)';
                setAlreadyRead(true);
                await axios.put(`http://localhost:5000/api/v1/messages/${msg._id}`, { alreadyRead: true }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('called');
                document.querySelector('.color-coded-read-or-not').style.backgroundColor = 'yellow';

            }
        }
        initialize();

    }, [])

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
        event.target.checked ? setSelectedItemState(index) : setUnselectedItemState(index)

    };
    const toggleStarColor = async (evt) => {
        if (inFaq === false && msg.alreadyResponded) {
            evt.target.style.color = 'rgb(255,0,0)';
            setInFaq(true);
            await axios.put(`http://localhost:5000/api/v1/messages/${msg._id}`, { inFaq: true }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } else {
            evt.target.style.color = 'rgb(164,171,180)';
            setInFaq(false);
            await axios.put(`http://localhost:5000/api/v1/messages/${msg._id}`, { inFaq: false }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
    }
    const handleMessageClick = async (evt) => {
        setMessageDetails(index);
        let el = evt.target;
        if (el.className.includes('custom-class')) {
            return;
        }
        while (el.className !== 'msg-container')
            el = el.parentNode;

        // document.getElementsByClassName('msg-container').forEach((item) => item.style.backgroundColor = 'rgb(255, 255, 255)')
        let els = document.getElementsByClassName('msg-container');
        Array.from(els).forEach((item) => item.style.backgroundColor = 'rgb(255, 255, 255)')
        // el.style.backgroundColor = 'rgb(177, 205, 240)';
        // console.log(evt.target.parentNode.className);
        if (el.style.backgroundColor === '') {
            el.style.backgroundColor = 'rgb(177, 205, 240)';
        } else if (el.style.backgroundColor === 'rgb(177, 205, 240)') {
            // document.querySelectorAll
            el.style.backgroundColor = 'rgb(255, 255, 255)'
        } else {
            el.style.backgroundColor = 'rgb(177, 205, 240)';
        }
        if (alreadyRead === false) {
            setAlreadyRead(true);
            // window.location.reload();
            await axios.put(`http://localhost:5000/api/v1/messages/${msg._id}`, { alreadyRead: true }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }

    }


    return (
        <div onClick={(evt) => handleMessageClick(evt)} className='msg-container'>
            <div className='top-container'>
                <div className={msg.alreadyResponded ? ('color-coded-read-or-not bgGreen') : (alreadyRead ? 'color-coded-read-or-not bgYellow' : 'color-coded-read-or-not')}></div>
                <div className='from-name'>{firstName} {lastName}</div>
                <div className='add-to-faq-icon'>
                    <i onClick={(e) => toggleStarColor(e)} className={inFaq ? "fas fa-star custom-class redColor" : "fas fa-star custom-class"} ></i>
                </div>
            </div>
            <div className='title-msg'>
                {msg.subject}
            </div>
            <div className='bottom-container'>
                <div className='checkbox-container'>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <div className='time-received'>{msg.time}</div>
            </div>
        </div>
    )
}
