import React from 'react'
import './MessageController.css'

export default function MessageController({ deleteMessages }) {

    return (
        <div className='msg-controller-container'>
            <div className='refresh-icon'>
                <i class="fas fa-redo-alt"></i>
            </div>
            <div className='remove-icon'>
                <i onClick={() => deleteMessages()} class="fas fa-trash"></i>
            </div>
        </div>
    )
}
