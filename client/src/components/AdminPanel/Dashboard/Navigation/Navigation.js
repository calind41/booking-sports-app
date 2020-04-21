import React, { Component } from 'react'
import './Navigation.css'

export default class Navigation extends Component {
    render() {
        return (
            <div className='admin-p-nav-container'>
                <div className='curr-path'>
                    <button>Dashboard</button>
                    <span>></span>
                </div>
            </div>
        )
    }
}
