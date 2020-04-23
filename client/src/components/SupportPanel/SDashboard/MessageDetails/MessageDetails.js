import React from 'react'
import './MessageDetails.css'

export default function MessageDetails() {
    return (
        <div className='msg-details-container'>
            <div className='date-time'>14 March 08:50AM</div>
            <div className='title-msg'>Title of the message</div>
            <div className='from-email'><span>From :</span> user@gmail.com</div>
            <div className='msg-body'>Body of the message. Some random text here</div>
            <div className='reply-btn'>
                <i class="fas fa-reply"></i>
                <span>Reply</span>
            </div>
        </div>
    )
}
