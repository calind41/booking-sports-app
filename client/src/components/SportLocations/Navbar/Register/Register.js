import React from 'react'
import './Register.css'

export default function Register({ registerStyles }) {


    return (
        <div className='register-container'>
            <button style={{ left: `${registerStyles.left}` }}>Register</button>
        </div>
    )
}
