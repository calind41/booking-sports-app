import React, { Component } from 'react'
import './SportDescription.css';

export default class SportDescription extends Component {
    render() {
        return (
            <div className='sport-desc'>
                <h3>Johan cruiff arena</h3>
                <h2>Hackney, E2 8BA</h2>
                <div className='desc-wrap'>
                    <div className='format'>
                        <h4>Format</h4>
                        <span>40X70m</span>
                    </div>
                    <div className='type'>
                        <h4>Type</h4>
                        <span>Indoor</span>
                    </div>
                    <div className='surface'>
                        <h4>Surface</h4>
                        <span>Grass</span>
                    </div>
                    <div className='min-zone-part'>
                        <h4>Min zone part</h4>
                        <span>1/2 zone</span>
                    </div>
                    <div className='price'>
                        <h4>Price</h4>
                        <span>560 KR/30min</span>
                    </div>
                </div>

            </div>
        )
    }
}
