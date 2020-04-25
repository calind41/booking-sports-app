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


export default class Booking extends Component {
    // nst data = {
    //     title,
    //     location,
    //     sport,
    //     images,
    //     serviceOptions,
    //     availableTimes,
    //     format,
    //     type,
    //     surface,
    //     facilities

    render() {
        const { title, location, sport, images, serviceOptions, availableTimes, format, type, surface, facilities } = this.props.location.state
        console.log(title);
        console.log(location);
        console.log(serviceOptions);
        console.log(availableTimes);
        return (
            <div className='booking-container'>
                <Navbar searchBar='none' />
                <div className='upper-part'>
                    <div className='imgslider-container'>
                        <ImageSlider images={images} width='42vw' height='50vh' />
                    </div>
                    <div>
                        <ServiceList serviceOptions={serviceOptions} />
                    </div>
                </div>
                <div className='lower-part'>
                    <div>
                        <LocationInfo facilities={facilities} surface={surface} type={type} />
                    </div>
                    <div className='custom-calendar'>
                        <div>
                            <CustomCalendar />
                        </div>
                        <div className='time-options'>
                            {
                                availableTimes.map((time, index) => {
                                    return index === 0 ? <div><TimeOption bgColor='#f98442' color='white' time={time} /></div> : <div><TimeOption time={time} /></div>
                                })
                            }

                        </div>
                    </div>
                </div>
                <div className='bookModal-container'>
                    <BookModal />
                </div>
            </div>
        )
    }
}
