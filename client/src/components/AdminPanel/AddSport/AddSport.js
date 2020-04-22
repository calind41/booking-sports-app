import React, { Component } from 'react'
import './AddSport.css'
import SidebarMenu from '../Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../Dashboard/Navigation/Navigation'
import FormComponent from './FormComponent/FormComponent'

export default class AddSport extends Component {
    render() {
        return (
            <div>
                <SidebarMenu />
                <Navigation location="AddSport" />
                <FormComponent />
            </div>
        )
    }
}
