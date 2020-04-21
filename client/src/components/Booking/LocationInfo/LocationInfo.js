import React, { Component } from 'react'
import './LocationInfo.css'

export default class LocationInfo extends Component {
    render() {
        return (
            <div className='location-info-container'>
                <div className='l-info'>Location Info</div>
                <div className='wrapper'>
                    <div className='facilites'>
                        <p>Facilities</p>
                        <ul>
                            <li>All</li>
                            <li>Parking</li>
                            <li>Field Lightning</li>
                            <li>Toilets</li>
                            <li>Cantine</li>
                        </ul>
                    </div>
                    <div className='surface'>
                        <p>Surface</p>
                        <ul>
                            <li>Any</li>
                            <li>Grass</li>
                            <li>Ground</li>
                            <li>Asphalt</li>
                        </ul>
                    </div>
                    <div className='type'>
                        <p>Type</p>
                        <ul>
                            <li>Any</li>
                            <li>Indoor</li>
                            <li>Outdoor</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
