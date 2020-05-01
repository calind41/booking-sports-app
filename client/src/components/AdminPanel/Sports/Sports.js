import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SportCard from './SportCard/SportCard'
import './Sports.css'

import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import SearchBar from '../RemoveSport/SearchBar/SearchBar'

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Sports() {

    const [sports, setSports] = useState([]);
    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const getSportLocations = async () => {
            const res = await axios.get('http://localhost:5000/api/v1/sportLocations/')
            console.log(res);
            setSports(res.data);
        };
        getSportLocations();
    }, [])

    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 2 - 2);
        // display from array of products: prodArr[idx, idx+8]

    }

    const nrSports = sports.length;
    return (
        <div>
            <SidebarMenu name="Admin Panel" />
            <Navigation dashboard='admin' location="Sports" />
            <div className='search-bar-container'>
                <SearchBar width='980px' />
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

        </div>
    )
}
