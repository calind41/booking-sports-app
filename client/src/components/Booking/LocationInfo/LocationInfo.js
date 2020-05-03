import React, { Component } from 'react'
import './LocationInfo.css'

export default function LocationInfo({ inventory }) {
    return (
        <div className='location-info-container'>
            <div className='l-info'>Location Info</div>
            <div className='wrapper'>
                {
                    inventory.map((item) => {
                        return (
                            <div>
                                <p>{item.title}</p>
                                <p>{item.value}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
