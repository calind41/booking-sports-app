import React, { Component } from 'react';

import ImageSlider from './ImageSlider/ImageSlider';
import SportDescription from './SportDescription/SportDescription';
import SportAction from './SportAction/SportAction';

import './SportLocation.css'

export default function SportLocation({ data }) {
    const { images, title, location, sport, format, type, surface, min_zone_part, price } = data;

    return (
        <div className='sport-location'>
            <ImageSlider images={images} />
            <SportDescription title={title} location={location} sport={sport} format={format} type={type} surface={surface} min_zone_part={min_zone_part} price={price} />
            <SportAction />
        </div>
    )
}
