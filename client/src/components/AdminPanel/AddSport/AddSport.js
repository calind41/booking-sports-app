import React, { useEffect } from 'react'
import './AddSport.css'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import FormComponent from './FormComponent/FormComponent'

export default function AddSport() {
    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
        console.log('decoded is ', decoded);
    }

    return (
        role === 'admin' ?
            (<div className='add-sport-wrapper'>
                <SidebarMenu name='Admin Panel' />
                <Navigation dashboard='admin' location="AddSport" />
                <FormComponent />
            </div>) : null
    )
}
