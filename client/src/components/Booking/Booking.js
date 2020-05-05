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

    constructor(props) {
        super(props);
        this.state = {
            selectedTimeOption: 0,
            selectedServiceOption: 0,
            selectedDateOption: new Date()

        }

        this.handleClickTimeOption = this.handleClickTimeOption.bind(this);
        this.handleClickServiceOption = this.handleClickServiceOption.bind(this);
        this.handleClickDateOption = this.handleClickDateOption.bind(this);
    }

    handleClickTimeOption(index) {
        this.setState({ selectedTimeOption: index });
    }

    handleClickServiceOption(index) {
        this.setState({ selectedServiceOption: index })
    }
    handleClickDateOption(date) {
        this.setState({ selectedDateOption: date });
    }

    render() {
        const { title,
            location,
            district,
            sport,
            images,
            sportOpts,
            inventory } = this.props.location.state



        return (
            <div className='booking-container'>
                <Navbar inBookingLout={'inBookingLout'} inBooking={'inBooking'} searchBar='none' />
                <div className='upper-part'>
                    <div className='imgslider-container'>
                        <ImageSlider images={images} width='42vw' height='50vh' />
                    </div>
                    <div>
                        <ServiceList handleClickServiceOption={this.handleClickServiceOption} sportOpts={sportOpts} />
                    </div>
                </div>
                <div className='lower-part'>
                    <div>
                        <LocationInfo inventory={inventory} />
                    </div>
                    <div className='custom-calendar'>
                        <div>
                            <CustomCalendar handleClickDateOption={this.handleClickDateOption} />
                        </div>
                        <div className='time-options'>
                            {
                                sportOpts[this.state.selectedServiceOption].availableHours.map((time, index) => {
                                    return index === this.state.selectedTimeOption ?
                                        <div><TimeOption handleClickTimeOption={this.handleClickTimeOption} index={index} bgColor='#f98442' color='white' time={time} /></div>
                                        :
                                        <div><TimeOption handleClickTimeOption={this.handleClickTimeOption} index={index} bgColor='#ffffff' color='black' time={time} /></div>
                                })
                            }

                        </div>
                    </div>
                </div>
                <div className='bookModal-container'>
                    <BookModal
                        selectedHour={sportOpts[this.state.selectedServiceOption].availableHours[this.state.selectedTimeOption]}
                        selectedServiceOption={sportOpts[this.state.selectedServiceOption].serviceOption}
                        selectedDateOption={this.state.selectedDateOption}
                        image={images[0]}
                        title={title}
                        sport={sport}
                        location={location}
                        price={sportOpts[this.state.selectedServiceOption].serviceOption.split(',')[1]}
                        date={this.state.selectedDateOption.toString().split(' ').filter((s, index) => (index > 0 && index < 4)).join(' ')}
                        available={'yes'}

                    />
                </div>
            </div>
        )
    }
}
