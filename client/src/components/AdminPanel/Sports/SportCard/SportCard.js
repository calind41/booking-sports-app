import React from 'react'
import { Link } from 'react-router-dom'

import './SportCard.css'

export default function SportCard({ sport }) {

    // import dynamically the images ?
    let imgs = require.context('../../../../../../server', true);
    let imageArr = [];
    sport.images.map((image) => {
        let im = imgs('' + image);
        imageArr.push(im)
    });
    // console.log(images);

    return (
        <div className='sport-card-container'>
            <div className='img-sport'>
                <img src={imageArr[0]} />
            </div>
            <div className='desc'>
                <div className='title-wrapper'>
                    <div className='title-heading'>Title</div>
                    <div className='title-value'>{sport.title}</div>
                </div>
                <div className='type-wrapper'>
                    <div className='type-heading'>Type</div>
                    <div className='type-value'>{sport.sport}</div>
                </div>
                <div className='location-wrapper'>
                    <div className='location-heading'>Location</div>
                    <div className='location-value'>{'Sector ' + sport.district}</div>
                </div>

            </div>
            <div id='avlb-h-wrapper'>
                <div>Available Hours</div>

                <div className='times'>
                    {
                        sport.sportOpts[0].availableHours.map((item) => {
                            return <div className='time'>{item}</div>
                        })
                    }

                </div>
            </div>
            <div id='options-wrapper'>
                <div>Options</div>
                <div className='options'>
                    {
                        sport.sportOpts.map((item) => {
                            return <div className='option'>
                                <div>{item.serviceOption}</div>
                                <div>{item.serviceOption.split(',')[1].trim()}</div>
                            </div>
                        })
                    }
                </div>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: '/adminUpdateSport', data: sport }}>
                    <div className='update-sport'>
                        <i className="icon-class fas fa-wrench"></i>
                        <span className='txt'>Update Sport</span>
                    </div>
                </Link>
            </div>
        </div >
    )
}
