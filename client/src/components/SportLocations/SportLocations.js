import React, { Component, Fragment } from 'react';
import SportLocation from './SportLocation/SportLocation';
import './SportLocations.css';

import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

export default class SportLocations extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <Sidebar />
                <div className='sport-locations'>
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                    <SportLocation />
                </div>
            </Fragment>
        )
    }
}
