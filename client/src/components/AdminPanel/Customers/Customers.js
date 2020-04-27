import React, { useState } from 'react'
import UserCard from './UserCard/UserCard';
import './Customers.css'

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

export default function Customers() {

    const [users, setUsers] = useState([1, 2, 3, 4, 5, 6, 1, 2, 1, 1, 1, 1, 1, 11, 4]);

    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    const nrUsers = users.length;
    return (
        <div>
            <SidebarMenu name='Admin Panel' />
            <Navigation dashboard='admin' location="Customers" />
            <div className='customers-searchbar'>
                <SearchBar width='980px' />
            </div>
            <div className='user-cards-wrapper'>
                {
                    users === [] || users[0] === null ? null : users.map((user, idx) => {
                        return idx >= index && idx <= index + 3 ?
                            (<div className='u-item'>
                                <UserCard />
                            </div>) : null
                    })
                }
            </div>
            <Pagination
                id='pagination-component2'
                page={pageNr}
                onChange={(event, page) => { changePage(page) }}
                count={Math.ceil(nrUsers / 4)}
                variant="outlined"
                shape="rounded"
            />

        </div>
    )
}
