import React, { Component } from 'react';

import ImageSlider from './ImageSlider/ImageSlider';
import SportDescription from './SportDescription/SportDescription';
import SportAction from './SportAction/SportAction';

import './SportLocation.css'

export default class SportLocation extends Component {
    render() {
        return (
            <div className='sport-location'>
                <ImageSlider />
                <SportDescription />
                <SportAction />
            </div>
        )
    }
}
