import React from 'react'
import './Contact.css'

export default function Contact({ contactStyles }) {
    return (
        <div className='contact-container'>
            <button style={{ left: `${contactStyles.left}` }}>Contact</button>
        </div>
    )
}
