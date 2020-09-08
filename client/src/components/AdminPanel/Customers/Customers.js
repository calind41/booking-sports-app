import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserCard from './UserCard/UserCard';
import './Customers.css'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import SearchBar from '../RemoveSport/SearchBar/SearchBar'
import Pagination from '@material-ui/lab/Pagination';

let backend_addr = 'https://mysportsbooking.com/'

export default function Customers() {

    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
        console.log('decoded is ', decoded);
    }

    const [users, setUsers] = useState([]);

    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const getCustomers = async () => {
            const res = await axios.get(`${backend_addr}api/v1/users/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            setUsers(res.data);
        }
        getCustomers();
    }, [])
    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    const applyFilterSearchCustomersByName = async (name) => {
        const res = await axios.get(`${backend_addr}api/v1/users/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        let filtered = res.data.filter((sl) => {
            let str = sl.firstName + ' ' + sl.lastName;
            console.log('string is ', str);
            if (str.toLowerCase().includes(name.toLowerCase())) {
                console.log('entering on true side');
                return true;
            }
            else {
                console.log('enterring on false side ')
                return false;
            }
        });
        setUsers(filtered);
    }

    const nrUsers = users.length;
    return (
        role === 'admin' ?
            (<div>
                <SidebarMenu name='Admin Panel' />
                <Navigation dashboard='admin' location="Customers" />
                <div className='customers-searchbar'>
                    <SearchBar applyFilterSearchCustomersByName={applyFilterSearchCustomersByName} width='980px' />
                </div>
                <div className='user-cards-wrapper'>
                    {
                        users === [] || users[0] === null ? null : users.map((user, idx) => {
                            return idx >= index && idx <= index + 3 ?
                                (<div className='u-item'>
                                    <UserCard user={user} />
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

            </div>) : null
    )
}
