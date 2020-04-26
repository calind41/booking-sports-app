import React from 'react'
import './TimeOption.css'

export default function TimeOption({ handleClickTimeOption, index, time, bgColor, color }) {
    const styleObj = {
        'backgroundColor': `${bgColor}`,
        'color': `${color}`
    }
    return (
        <div onClick={() => handleClickTimeOption(index)} style={styleObj} className='time-option'>
            {time}
        </div>
    )
}
