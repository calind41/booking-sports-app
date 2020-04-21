import React, { Component } from 'react'
import './SportAction.css';
export default class SportAction extends Component {
    render() {
        return (
            <div className='s-a-btns'>
                <button className='book'>book</button>
                <button className='view'>view</button>
            </div>
        )
    }
}
