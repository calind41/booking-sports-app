import React from 'react'
import { Link } from 'react-router-dom'

import './SportCard.css'

export default function SportCard() {
    return (
        <div className='sport-card-container'>
            <div className='img-sport'>
                <img src='https://images.unsplash.com/photo-1554653918-7889417d67d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' />
            </div>
            <div className='desc'>
                <div className='title-wrapper'>
                    <div className='title-heading'>Title</div>
                    <div className='title-value'>Title1</div>
                </div>
                <div className='type-wrapper'>
                    <div className='type-heading'>Type</div>
                    <div className='type-value'>Type</div>
                </div>
                <div className='location-wrapper'>
                    <div className='location-heading'>Location</div>
                    <div className='location-value'>Location1</div>
                </div>

            </div>
            <div id='avlb-h-wrapper'>
                <div>Available Hours</div>
                <div className='times'>
                    <div className='time'>10:00</div>
                    <div className='time'>10:00</div>
                    <div className='time'>10:00</div>
                    <div className='time'>10:00</div>
                    <div className='time'>10:00</div>
                    <div className='time'>10:00</div>
                </div>
            </div>
            <div id='options-wrapper'>
                <div>Options</div>
                <div className='options'>
                    <div className='option'>
                        <div>1 court 45min</div>
                        <div>price</div>
                    </div>
                    <div className='option'>
                        <div>1 court 45min</div>
                        <div>price</div>
                    </div>
                    <div className='option'>
                        <div>1 court 45min</div>
                        <div>price</div>
                    </div>
                    <div className='option'>
                        <div>1 court 45min</div>
                        <div>price</div>
                    </div>
                </div>
                <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminUpdateSport'>
                    <div className='update-sport'>
                        <i className="icon-class fas fa-wrench"></i>
                        <span className='txt'>Update Sport</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
