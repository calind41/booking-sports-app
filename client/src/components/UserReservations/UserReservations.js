import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import './UserReservations.css'
import UserReservation from './UserReservation/UserReservation'
import Navbar from '../SportLocations/Navbar/Navbar'

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
                const res = await axios.get(`http://localhost:5000/api/v1/reservations/user/${userId}`);

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
        await axios.delete(`http://localhost:5000/api/v1/reservations/deleteRes`, { data: { ids } });

        // update nr of reservations of the user
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'))
        const user = await axios.get(`http://localhost:5000/api/v1/users/${decoded.userId}`);
        const nrReservations = user.data.nrReservations - ids.length;
        await axios.put(`http://localhost:5000/api/v1/users/${decoded.userId}`, { nrReservations });

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


    return (
        <div className='user-reservations-wrapper'>
            <Navbar />
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
                        <div className='type-header'>
                            Type
                    </div>
                        <div className='loc-header'>
                            Location
                    </div>
                        <div className='date-t-header'>
                            Date / Time
                    </div>
                        <div className='price-header'>
                            Price
                    </div>
                        <div className='available-header'>
                            Available
                    </div>
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
