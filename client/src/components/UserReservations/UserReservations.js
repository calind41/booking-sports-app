import React, { Component } from 'react'
import './UserReservations.css'
import UserReservation from './UserReservation/UserReservation'
import Navbar from '../SportLocations/Navbar/Navbar'

export default class UserReservations extends Component {
    render() {
        return (
            <div className='user-reservations-wrapper'>
                <Navbar />
                <div className='past-res-and-del'>
                    <div className='past-r'>Past Reservations</div>
                    <div className='del-button-wrapper'><button className='del-button'><span class="material-icons">
                        delete
</span><span id='del-txt'>Delete</span></button></div>
                </div>
                <div className='column-headers'>
                    <div className='type-header'>
                        Type
                    </div>
                    <div className='loc-header'>
                        Location
                    </div>
                    <div className='date-t-header'>
                        Date / Time
                    </div>
                    <div className='price-header'>
                        Price
                    </div>
                    <div className='available-header'>
                        Available
                    </div>
                </div>
                <div className='user-res-list'>
                    <UserReservation />
                    <UserReservation />
                    <UserReservation />
                    <UserReservation />
                    <UserReservation />
                </div>

            </div>
        )
    }
}
