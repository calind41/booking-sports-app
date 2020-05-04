import React from 'react'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'

import UpdateFormComponent from './UpdateFormComponent/UpdateFormComponent'

export default function UpdateSport({ location }) {

    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
        console.log('decoded is ', decoded);
    }

    const sport = location.data;
    return (
        role === 'admin' ?
            (<div>
                <SidebarMenu name="Admin Panel" />
                <Navigation dashboard='admin' location="UpdateSport" />
                <UpdateFormComponent sportLoc={sport} />

            </div>) : null
    )
}
