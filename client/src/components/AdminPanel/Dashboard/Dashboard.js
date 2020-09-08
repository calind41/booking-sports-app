import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Dashboard.css'
import SidebarMenu from './SidebarMenu/SidebarMenu'
import Navigation from './Navigation/Navigation'

let backend_addr = 'https://mysportsbooking.com/'


export default function Dashboard() {

    const jwt = require('jsonwebtoken');
    let role;
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
    }

    const [res, setRes] = useState([]);
    const [members, setMembmers] = useState([]);
    let [earning, setEarning] = useState(0);

    useEffect(() => {
        const getMembers = async () => {
            const m = await axios.get(`${backend_addr}api/v1/users/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setMembmers(m.data);
        }
        const getRes = async () => {
            const res = await axios.get(`${backend_addr}api/v1/reservations/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });
            setRes(res.data);

            res.data.map((r) => {
                earning += r.price;
            })
            setEarning(earning);
        }

        getMembers();
        getRes();
    }, [])

    return (
        role === 'admin' ? (
            <div className='dashboard-container'>
                <div>
                    <SidebarMenu name="Admin Panel" />
                </div>
                <Navigation dashboard='admin' />
                <div className='content'>
                    <div className='sports-customers'>
                        <div className='sport-actions'>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminAddSport'>
                                <div className='add-sport'>
                                    <span className="icon-class material-icons">
                                        add
                                </span>
                                    <span className='txt'>Add Sport</span>
                                </div>
                            </Link>

                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminRemoveSport'>
                                <div className='remove-sport'>
                                    <span className="icon-class material-icons">
                                        remove
                                </span>
                                    <span className='txt'>Remove Sport</span>
                                </div>
                            </Link>
                        </div>
                        <div className='views'>

                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminSports'>
                                <div className='sport-spots-view'>
                                    <span>Sport Spots</span>
                                </div>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to='/adminCustomers'>
                                <div className='customers-view'>
                                    <span>Customers</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                    <div className='overview'>
                        <div className='overview-heading'>
                            Overview
                        </div>
                        <div className='cards-container'>
                            <div className='members-nr-card'>
                                <span>{members.length} members</span>
                            </div>
                            <div className='sport-types-card'>
                                <span>6 sport types</span>
                            </div>
                            <div className='total-earnings-card'>
                                <span>${earning} total earnings</span>
                            </div>
                            <div className='booked-spots-card'>
                                <span>{res.length} booked sports</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>) : null
    )
}
