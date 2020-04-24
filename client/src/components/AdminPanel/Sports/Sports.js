import React, { useState } from 'react'
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

    const [sports, setSports] = useState([1, 2, 3, 4, 5, 6, 1, 2, 1, 1, 1, 1, 1, 11, 4]);

    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

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
            <SearchBar width='1000px' />
            <div className='sports-cards-wrapper'>
                {
                    sports === [] || sports[0] === null ? null : sports.map((user, idx) => {
                        return idx >= index && idx <= index + 1 ?
                            (<div className='u-item'>
                                <SportCard />
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
