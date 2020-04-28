import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    let [sportsArr, setSportsArr] = useState([]);
    const [selectedState, setSelectedState] = useState([]);


    useEffect(() => {
        const getSports = async () => {
            const res = await axios.get('http://localhost:5000/sports');

            // import dynamically the images ?
            // let imgs = require.context('../../imgs', true);
            // res.data.map((r) => {
            //     r.image = imgs('./' + r.image);
            // });
            setSportsArr(res.data.sports);
            let selState = [];
            res.data.sports.map(() => selState.push(false))
            setSelectedState(selState);
            console.log(res.data);
        }
        getSports();
    }, [])

    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    const deleteSports = () => {
        let delIdx = [];
        let cpy = [...sportsArr];
        let afterDelArr = cpy.filter((item, idx) => { if (selectedState[idx]) delIdx.push(idx); return !selectedState[idx] })
        console.log(delIdx);
        delIdx.map((item) => selectedState.splice(item, 1));
        setSelectedState(selectedState);
        setSportsArr(afterDelArr);
    }
    const setSelectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = true })
        setSelectedState(selectedState)
    }

    const setUnselectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = false })
        setSelectedState(selectedState)
    }

    const nrSports = sportsArr.length;

    return (
        <div id='remove-sport-container'>
            <SidebarMenu name="Admin Panel" />
            <Navigation dashboard='admin' location="Remove Sport" />
            <div className='remove-s-searchbar'>
                <SearchBar width='980px' />
            </div>
            <div className='remove-sport-reuse-del-button'>
                <div className='del-button-wrapper'>
                    <button onClick={deleteSports} className='del-button'>
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
                                <SportComponentToRemove
                                    setSelectedItemState={setSelectedItemState}
                                    setUnselectedItemState={setUnselectedItemState}
                                    index={idx}
                                    initialChecked={false}
                                    nrSports={sportsArr.length}
                                />
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
