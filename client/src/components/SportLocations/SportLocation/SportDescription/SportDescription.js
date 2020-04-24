import React, { Component } from 'react'
import './SportDescription.css';

export default function SportDescription({ title, location, sport, format, type, surface, min_zone_part, price }) {

    return (
        <div className='sport-desc'>
            <h3>{title}</h3>
            <h2>{location}</h2>
            <h2>{sport}</h2>
            <div className='desc-wrap'>
                <div className='format'>
                    <h4>Format</h4>
                    <span>{format}</span>
                </div>
                <div className='type'>
                    <h4>Type</h4>
                    <span>{type}</span>
                </div>
                <div className='surface'>
                    <h4>Surface</h4>
                    <span>{surface}</span>
                </div>
                <div className='min-zone-part'>
                    <h4>Min zone part</h4>
                    <span>{min_zone_part}</span>
                </div>
                <div className='price'>
                    <h4>Price</h4>
                    <span>{price}</span>
                </div>
            </div>

        </div>
    )
}
