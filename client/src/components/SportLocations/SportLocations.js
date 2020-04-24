import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'

import SportLocation from './SportLocation/SportLocation';
import './SportLocations.css';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

export default function SportLocations() {

    const [sportLocs, setSportLocs] = useState([]);

    useEffect(() => {
        const getSportLocations = async () => {
            const res = await axios.get('http://localhost:5000/sport_locations');
            console.log(res);
            setSportLocs(res.data);
        }
        getSportLocations();

    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className='sport-loc-container'>
                <div className='sport-locations'>
                    {sportLocs.map((i) => <SportLocation data={i} />)}
                </div>
                <div className='sidebar-c'>
                    <Sidebar />
                </div>

            </div>


        </Fragment>
    )
}
