import React, { Component } from 'react'
import './Sidebar.css';
import SidebarCategory from './SidebarCategory/SidebarCategory';

export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar-container'>
                <SidebarCategory listItems={['All', 'Parking', 'Field Lightning', 'Toilets', 'Cantine']} type="Facilities" />
                <SidebarCategory listItems={['Any', 'Grass', 'Ground', 'Asphalt', 'Water']} type="Surface" />
                <SidebarCategory listItems={['Any', 'Indoor', 'Outdoor']} type='Type' />
                <div className='sidebar-btns'>
                    <button>Apply</button>
                    <button>Clear</button>
                </div>

            </div>
        )
    }
}
