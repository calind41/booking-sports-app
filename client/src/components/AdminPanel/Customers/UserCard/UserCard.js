import React, { useState, Fragment, useEffect } from 'react'
import './UserCard.css'
import UserResModal from './UserResModal/UserResModal'

export default function UserCard({ user }) {

    const [openState, setOpenState] = useState(false);

    const openModal = () => {
        console.log('state before openmodal: ', openState);
        setOpenState(!openState);
        console.log('clicked ');
    }

    const setOpenStateInParentClassToFalse = () => {
        setOpenState(false);
    }

    return (
        <Fragment>



            <div className='usercard-wrapper'>
                <div className='bg-image'></div>
                <div className='round-picture'>
                    <i class="fas fa-user"></i>
                </div>
                <div className='full-name-class'>
                    {user.firstName + ' ' + user.lastName}
                </div>
                <div className='username'>
                    <span> Username:</span> {user.username ? user.username : '-'}
                </div>
                <div className='email'>
                    <span>Email:</span> {user.email ? user.email : '-'}
                </div>
                <div className='nr-reservations-class'>
                    <span>{user.nrReservations}</span>Reservations
                <div onClick={openModal}>Reservation History<i class="fas fa-arrow-right"></i></div>
                </div>
            </div>
            <UserResModal
                name={user.firstName + ' ' + user.lastName}
                nrReservations={user.nrReservations}
                reservations={user.reservations}
                setOpenStateInParentClassToFalse={setOpenStateInParentClassToFalse}
                state={openState} />
        </Fragment>

    )
}
