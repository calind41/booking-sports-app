import React from 'react'
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
export default function Message() {

    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
    };
    const toggleStarColor = (evt) => {
        if (evt.target.style.color !== 'rgb(255, 0, 0)') {
            evt.target.style.color = 'rgb(255,0,0)';
        } else {
            evt.target.style.color = 'rgb(164,171,180)';
        }
    }
    const handleMessageClick = (evt) => {
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
    }
    return (
        <div onClick={(evt) => handleMessageClick(evt)} className='msg-container'>
            <div className='top-container'>
                <div className='color-coded-read-or-not'></div>
                <div className='from-name'>Louis Adkins</div>
                <div className='add-to-faq-icon'>
                    <i onClick={(e) => toggleStarColor(e)} className="fas fa-star custom-class"></i>
                </div>
            </div>
            <div className='title-msg'>
                Title of the message
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
                <div className='time-received'>08:50AM</div>
            </div>
        </div>
    )
}
