import React from 'react'
import './MessageController.css'

export default function MessageController({ deleteMessages, deleteFAQs }) {

    const handleClickRemoveIcon = () => {
        console.log('entered');
        if (deleteMessages === null) {
            console.log('delete faqs');
            deleteFAQs();
        }
        else
            deleteMessages();
    }
    return (
        <div className='msg-controller-container'>
            <div className='refresh-icon'>
                <i class="fas fa-redo-alt"></i>
            </div>
            <div className='remove-icon'>
                <i onClick={handleClickRemoveIcon} class="fas fa-trash"></i>
            </div>
        </div>
    )
}
