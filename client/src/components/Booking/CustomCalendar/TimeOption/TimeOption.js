import React from 'react'
import './TimeOption.css'

export default function TimeOption({ time, bgColor, color }) {
    const styleObj = {
        'backgroundColor': `${bgColor}`,
        'color': `${color}`
    }
    return (
        <div style={styleObj} className='time-option'>
            {time}
        </div>
    )
}
