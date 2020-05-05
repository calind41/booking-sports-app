import React, { Component } from 'react'
import './SportDescription.css';

export default function SportDescription({ title, location, sport, inventory }) {



    return (
        <div className='sport-desc'>
            <h3>{title}</h3>
            <h2>{location}</h2>
            <h2>{sport}</h2>
            <div className='desc-wrap'>
                {
                    inventory.map((item) => {
                        if (item.title.toLowerCase() === 'facilities') {
                            return (
                                <div>
                                    <h4>{item.title}</h4>
                                    <span>{item.value.split(' ')[0]}</span>
                                </div>
                            )
                        }
                        return (
                            <div>
                                <h4>{item.title}</h4>
                                <span>{item.value}</span>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}
