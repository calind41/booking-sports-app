import React, { Component, Fragment } from 'react'
import './ServiceList.css'
import ServiceCard from './ServiceCard/ServiceCard'

export default function ServiceList({ serviceOptions }) {


    return (
        <div className='service-list-container'>
            <div>Select a Service</div>
            <div className='service-list'>
                {
                    serviceOptions.map((s, index) => {
                        return index === 0 ?
                            <div><ServiceCard text={s} bgColor='#F98442' p1Color='white' p2Color='black' checkboxColor='white' /> </div>
                            :
                            <div> <ServiceCard text={s} /></div>
                    })
                }
            </div>
        </div>
    )

}
