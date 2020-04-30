import React, { Component } from 'react';

import ImageSlider from './ImageSlider/ImageSlider';
import SportDescription from './SportDescription/SportDescription';
import SportAction from './SportAction/SportAction';

import './SportLocation.css'

export default function SportLocation({ data }) {
    const { images, title, location, district, sport, sportOpts, inventory } = data;

    return (
        <div className='sport-location'>
            <ImageSlider images={images} />
            <SportDescription title={title} location={location} sport={sport} inventory={inventory} />
            <SportAction sportOpts={sportOpts} images={images} title={title} location={location} district={district} sport={sport} inventory={inventory} />
        </div>
    )
}
