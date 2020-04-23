import React from 'react'
import './MessageController.css'

export default function MessageController() {
    return (
        <div className='msg-controller-container'>
            <div className='refresh-icon'>
                <i class="fas fa-redo-alt"></i>
            </div>
            <div className='remove-icon'>
                <i class="fas fa-trash"></i>
            </div>
        </div>
    )
}
