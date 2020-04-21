import React, { Component } from 'react'
import './Sidebar.css';
import SidebarCategory from './SidebarCategory/SidebarCategory';
export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar-container'>
                <SidebarCategory />
                <SidebarCategory />
                <SidebarCategory />
            </div>
        )
    }
}
