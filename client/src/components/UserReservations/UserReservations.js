import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import './UserReservations.css'
import UserReservation from './UserReservation/UserReservation'
import Navbar from '../SportLocations/Navbar/Navbar'

let backend_addr = 'http://www.mysportsbooking.com/'


export default function UserReservations() {

    const [pastReservations, setPastReservations] = useState([]);
    const [selectedState, setSelectedState] = useState([]);

    useEffect(() => {
        const getReservations = async () => {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(localStorage.getItem('token'));
            if (localStorage.getItem('token') !== null) {
                const userId = decoded.userId;
                // get all reservations
                const res = await axios.get(`${backend_addr}api/v1/reservations/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // import dynamically the images ?
                let imgs = require.context('../../../../server', true);
                res.data.map((r) => {
                    r.image = imgs('' + r.image);
                });

                setPastReservations(res.data.sort((item1, item2) => item2.selectedDateOption - item1.selectedDateOption));
                let selState = [];
                res.data.map(() => selState.push(false))
                setSelectedState(selState);
            }

        }
        getReservations();
    }, [])

    const deleteReservations = async () => {
        let delIdx = [];
        let cpy = [...pastReservations];
        let afterDelArr = cpy.filter((item, idx) => { if (selectedState[idx]) delIdx.push(idx); return !selectedState[idx] })
        delIdx.map((item) => selectedState.splice(item, 1));
        let ids = [];
        delIdx.map((item) => ids.push(pastReservations[item]._id));

        await axios.delete(`${backend_addr}api/v1/reservations/deleteRes`, {
            data: { ids },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        // update nr of reservations of the user
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'))
        const user = await axios.get(`${backend_addr}api/v1/users/${decoded.userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const nrReservations = user.data.nrReservations - ids.length;
        await axios.put(`${backend_addr}api/v1/users/${decoded.userId}`, { nrReservations }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setSelectedState(selectedState);
        setPastReservations(afterDelArr);
    }



    const setSelectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = true })
        setSelectedState(selectedState)
    }

    const setUnselectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = false })
        setSelectedState(selectedState)
    }

    const filterResBySportType = async (resSportType) => {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'));
        if (localStorage.getItem('token') !== null) {
            const userId = decoded.userId;
            // get all reservations
            const res = await axios.get(`${backend_addr}api/v1/reservations/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            let filtered = res.data.filter((sl) => {
                if (resSportType.toLowerCase().includes('yes')) {
                    if (sl.available === true) {
                        return true;
                    } else {
                        return false;
                    }
                }
                else if (resSportType.toLowerCase().includes('no')) {
                    if (sl.available === false) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (sl.sport.toLowerCase().includes(resSportType))
                    return true;
                else
                    return false;
            });


            // import dynamically the images ?
            let imgs = require.context('../../../../server', true);
            filtered.map((r) => {
                r.image = imgs('' + r.image);
            });

            setPastReservations(filtered.sort((item1, item2) => item2.selectedDateOption - item1.selectedDateOption));

        }
    }


    return (
        <div className='user-reservations-wrapper'>
            <Navbar userResClass={'FaqUserResClass'} filterResBySportType={filterResBySportType} />
            <div className='past-res-and-del'>
                <div className='past-r'>Past Reservations</div>
                <div onClick={deleteReservations} className='del-button-wrapper'>
                    <button className='del-button'>
                        <span class="material-icons">
                            delete
                            </span>
                        <span id='del-txt'>Delete</span>
                    </button>
                </div>
            </div>
            <div className='column-headers'>
                {pastReservations.length !== 0 ?
                    <Fragment>
                    </Fragment> : <div className='no-reservations-text'>You have no reservations</div>
                }
            </div>
            <div className='user-res-list'>
                {
                    pastReservations.map((item, index) => {
                        return <UserReservation
                            setSelectedItemState={setSelectedItemState}
                            setUnselectedItemState={setUnselectedItemState}
                            reservation={item}
                            index={index}
                            initialChecked={false}
                            nrReservations={pastReservations.length}
                        />
                    })
                }
            </div>

        </div>
    )

}
