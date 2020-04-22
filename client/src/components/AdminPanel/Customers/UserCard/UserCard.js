import React from 'react'
import './UserCard.css'

export default function UserCard() {
    return (
        <div className='usercard-wrapper'>
            <div className='bg-image'></div>
            <div className='round-picture'>
                <i class="fas fa-user"></i>
            </div>
            <div className='full-name-class'>
                Calin Dodon
            </div>
            <div className='username'>
                <span> Username:</span> calin_dodon
            </div>
            <div className='email'>
                <span>Email:</span> calin@example.com
            </div>
            <div className='nr-reservations-class'>
                <span>55</span>Reservations
                <div>Reservation History<i class="fas fa-arrow-right"></i></div>
            </div>
        </div>
    )
}
