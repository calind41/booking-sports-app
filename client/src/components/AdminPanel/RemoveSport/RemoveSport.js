import React, { useState } from 'react'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import SearchBar from './SearchBar/SearchBar'
import SportComponentToRemove from './SportComponentToRemove/SportComponentToRemove'
import './RemoveSport.css'



import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));


export default function RemoveSport() {


    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);
    let [sportsArr, setSportsArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    const nrSports = sportsArr.length;

    return (
        <div id='remove-sport-container'>
            <SidebarMenu name="Admin Panel" />
            <Navigation location="Remove Sport" />
            <SearchBar width='1000px' />
            <div className='remove-sport-reuse-del-button'>
                <div className='del-button-wrapper'>
                    <button className='del-button'>
                        <span class="material-icons">
                            delete
                            </span>
                        <span id='del-txt'>Delete</span>
                    </button>
                </div>
            </div>


            <div className='sports'>
                {
                    // arr.map((sport) => <SportComponentToRemove />)
                }
                {
                    sportsArr === [] || sportsArr[0] === null ? null : sportsArr.map((sport, idx) => {
                        return idx >= index && idx <= index + 3 ?
                            (<div className='s-item'>
                                <SportComponentToRemove />
                            </div>) : null
                    })
                }
            </div>
            <Pagination
                id='pagination-component'
                page={pageNr}
                onChange={(event, page) => { changePage(page) }}
                count={Math.ceil(nrSports / 4)}
                variant="outlined"
                shape="rounded"
            />
        </div>
    )
}
