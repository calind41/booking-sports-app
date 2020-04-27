import React, { useState, Fragment, useEffect } from 'react'
import './UserCard.css'
import UserResModal from './UserResModal/UserResModal'

export default function UserCard() {

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
                <div onClick={openModal}>Reservation History<i class="fas fa-arrow-right"></i></div>
                </div>
            </div>
            <UserResModal
                name="Calin Dodon"
                title="Coolest Basketball Place"
                location="Bucharest, Sector 5"
                sportType='Basketball'
                nrReservations="55"
                selectedServiceOption="1 court 60min, 40$"
                selectedDateOption="28 Apr 2020"
                selectedTimeOption="09:00"
                setOpenStateInParentClassToFalse={setOpenStateInParentClassToFalse}
                state={openState} />
        </Fragment>

    )
}
