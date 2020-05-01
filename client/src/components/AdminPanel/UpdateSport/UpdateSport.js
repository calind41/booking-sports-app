import React from 'react'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'

import UpdateFormComponent from './UpdateFormComponent/UpdateFormComponent'

export default function UpdateSport({ location }) {

    const sport = location.data;
    return (
        <div>
            <SidebarMenu name="Admin Panel" />
            <Navigation dashboard='admin' location="UpdateSport" />
            <UpdateFormComponent sportLoc={sport} />

        </div>
    )
}
