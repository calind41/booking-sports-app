import React from 'react'
import './SignIn.css'

export default function SignIn({ signInStyles }) {
    return (
        <div className='signin-container'>
            <button style={{ left: `${signInStyles.left}` }}>Sign In</button>
        </div>
    )
}
