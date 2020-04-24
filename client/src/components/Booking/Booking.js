import React, { Component } from 'react'
import './Booking.css'
import './BookingConfirmation/BookingConfirmation'

import Navbar from '../SportLocations/Navbar/Navbar'
import ImageSlider from '../SportLocations/SportLocation/ImageSlider/ImageSlider'
import ServiceList from './ServiceList/ServiceList'
import CustomCalendar from './CustomCalendar/CustomCalendar'
import TimeOption from './CustomCalendar/TimeOption/TimeOption'
import LocationInfo from './LocationInfo/LocationInfo'
import BookModal from './BookModal/BookModal'


export default function Booking() {

    return (
        <div className='booking-container'>
            <Navbar searchBar='none' />
            <div className='imgslider-container'>
                <ImageSlider width='40%' height='45vh' />
            </div>
            <LocationInfo />
            <ServiceList />
            <div className='custom-calendar'>
                <div>
                    <CustomCalendar />
                </div>
                <div className='time-options'>
                    <div>
                        <TimeOption bgColor='#F98442' color='white' time='8:00' />
                    </div>
                    <div>
                        <TimeOption time='9:00' />
                    </div>
                    <div>
                        <TimeOption time='10:00' />
                    </div>
                    <div>
                        <TimeOption time='11:00' />
                    </div>
                    <div>
                        <TimeOption time='12:00' />
                    </div>
                    <div>
                        <TimeOption time='13:00' />
                    </div>
                    <div>
                        <TimeOption time='14:00' />
                    </div>
                    <div>
                        <TimeOption time='9:00' />
                    </div>
                    <div>
                        <TimeOption time='9:00' />
                    </div>


                </div>
            </div>
            <BookModal />
        </div>
    )
}
