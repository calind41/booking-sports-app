import React, { Component, Fragment } from 'react'
import './ServiceList.css'
import ServiceCard from './ServiceCard/ServiceCard'

export default class ServiceList extends Component {
    render() {
        return (
            <div className='service-list-container'>
                <div>Select a Service</div>
                <div className='service-list'>
                    <ServiceCard bgColor='#F98442' p1Color='white' p2Color='black' checkboxColor='white' />
                    <ServiceCard />
                    <ServiceCard />
                    <ServiceCard />

                </div>
            </div>
        )
    }
}
