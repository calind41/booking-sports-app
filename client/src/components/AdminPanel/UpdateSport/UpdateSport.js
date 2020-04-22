import React from 'react'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'

import UpdateFormComponent from './UpdateFormComponent/UpdateFormComponent'

export default function UpdateSport() {
    return (
        <div>
            <SidebarMenu />
            <Navigation location="UpdateSport" />
            <UpdateFormComponent />

        </div>
    )
}
