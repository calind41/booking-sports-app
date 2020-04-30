import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'

import SportLocation from './SportLocation/SportLocation';
import './SportLocations.css';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

export default function SportLocations({ location }) {

    const [sportLocs, setSportLocs] = useState([]);

    useEffect(() => {
        let selectedSport, selectedSector;
        if (localStorage.getItem('selectedSport') === null || localStorage.getItem('selectedSector') === null) {
            selectedSport = location.data.selectedSport;
            selectedSector = location.data.selectedSector;
            localStorage.setItem('selectedSport', selectedSport);
            localStorage.setItem('selectedSector', selectedSector);
        } else {
            selectedSport = localStorage.getItem('selectedSport');
            selectedSector = localStorage.getItem('selectedSector');
        }
        console.log('in sport locations , ', selectedSport, selectedSector);

        const getSportLocations = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/sportLocations/sport/${selectedSport}/${selectedSector}`);
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
