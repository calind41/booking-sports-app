import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios'

import SportLocation from './SportLocation/SportLocation';
import './SportLocations.css';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';

export default function SportLocations({ location }) {

    const [sportLocs, setSportLocs] = useState([]);
    const [filteredSportLocs, setFilteredSportLocs] = useState([]);
    let [facilities, setFacilities] = useState([]);
    let [surface, setSurface] = useState([]);
    let [type, setType] = useState([]);

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

        const getSportLocations = async () => {
            const res = await axios.get(`http://localhost:5000/api/v1/sportLocations/sport/${selectedSport}/${selectedSector}`);

            res.data.map((item) => {
                let inventory = item.inventory;
                inventory.map((ivt) => {
                    if (ivt.title === 'facilities')
                        facilities.push(ivt.value);
                    if (ivt.title === 'surface')
                        surface.push(ivt.value);
                    if (ivt.title === 'type')
                        type.push(ivt.value);
                });
            });
            // remove duplicates
            facilities = facilities.filter((v, i) => facilities.indexOf(v) === i);
            surface = surface.filter((v, i) => surface.indexOf(v) === i);
            type = type.filter((v, i) => type.indexOf(v) === i);

            setFacilities(facilities);
            setSurface(surface);
            setType(type);

            setSportLocs(res.data);
            setFilteredSportLocs(res.data);
        }
        getSportLocations();

    }, [])

    const passParams = (f, s, t) => {
        console.log('in sport loc ');
        console.log('f ', f);
        console.log('s ', s);
        console.log('t ', t);

        applyFilter(f, s, t);
    }

    const applyFilter = (f, s, t) => {
        let filtered = sportLocs.filter((sl) => {
            console.log(sl);
            let ret = false;
            sl.inventory.map((item) => {
                if (item.title === 'facilities' || item.title === 'surface' || item.title === 'type') {
                    if (f.includes(item.value) || s.includes(item.value) || t.includes(item.value))
                        ret = true;
                }
            })
            return ret;
        });
        console.log('filtered', filtered);
        setFilteredSportLocs(filtered);
    }

    const filterBySporLocationTitle = async (title) => {
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

        const res = await axios.get(`http://localhost:5000/api/v1/sportLocations/sport/${selectedSport}/${selectedSector}`);

        let filtered = res.data.filter((sl) => {
            if (sl.title.toLowerCase().includes(title))
                return true;
            else
                return false;
        });
        setFilteredSportLocs(filtered);

    }

    return (
        <Fragment>
            <Navbar filterBySporLocationTitle={filterBySporLocationTitle} />
            <div className='sport-loc-container'>
                <div className='sport-locations'>
                    {filteredSportLocs.map((i) => <SportLocation data={i} />)}
                </div>
                <div className='sidebar-c'>
                    <Sidebar styles={sportLocs.length < 3 ? positioningStyles : null} passParams={passParams} facilities={facilities} surface={surface} type={type} />
                </div>

            </div>
        </Fragment>
    )
}

const positioningStyles = {
    position: 'relative',
    left: '.91vw'
}
