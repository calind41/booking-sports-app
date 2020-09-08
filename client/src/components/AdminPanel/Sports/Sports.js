import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SportCard from './SportCard/SportCard'
import './Sports.css'

import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import SearchBar from '../RemoveSport/SearchBar/SearchBar'
import Pagination from '@material-ui/lab/Pagination';

let backend_addr = 'https://mysportsbooking.com/'




export default function Sports() {

    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
    }

    const [sports, setSports] = useState([]);
    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const getSportLocations = async () => {
            const res = await axios.get(`${backend_addr}api/v1/sportLocations/`)
            setSports(res.data);
            console.log(res.data);
        };
        getSportLocations();
    }, [])

    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 2 - 2);
        // display from array of products: prodArr[idx, idx+8]

    }

    const applyFilterSearchSportByTitle = async (title) => {
        console.log('from main ', title)

        const res = await axios.get(`${backend_addr}api/v1/sportLocations/`)
        let filtered = res.data.filter((sl) => {
            if (sl.title.toLowerCase().includes(title.toLowerCase()))
                return true;
            else
                return false;
        });
        setSports(filtered);
    }
    const nrSports = sports.length;
    return (
        role === 'admin' ?
            (<div>
                <SidebarMenu name="Admin Panel" />
                <Navigation dashboard='admin' location="Sports" />
                <div className='search-bar-container'>
                    <SearchBar applyFilterSearchSportByTitle={applyFilterSearchSportByTitle} width='980px' />
                </div>
                <div className='sports-cards-wrapper'>
                    {
                        sports === [] || sports[0] === null ? null : sports.map((sport, idx) => {
                            return idx >= index && idx <= index + 1 ?
                                (<div className='u-item'>
                                    <SportCard sport={sport} />
                                </div>) : null
                        })
                    }
                </div>
                <Pagination
                    id='pagination-component3'
                    page={pageNr}
                    onChange={(event, page) => { changePage(page) }}
                    count={Math.ceil(nrSports / 2)}
                    variant="outlined"
                    shape="rounded"
                />

            </div>) : null
    )
}
