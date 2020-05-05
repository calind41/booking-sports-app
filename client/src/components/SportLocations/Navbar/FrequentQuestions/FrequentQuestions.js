import React from 'react'
import './FrequentQuestions.css'

export default function FrequentQuestions({ inBooking, inBookingLout, userResClass, loggedIn, inFaq }) {
    return (
        <div className={loggedIn ? (inFaq ? 'infaq' : `fe-faq-loggedin ${userResClass} + ' ' ${inBooking}`) : (inFaq ? 'infaqNotLoggedIn' : `fe-faq ${inBookingLout}`)}>
            FAQ
        </div>
    )
}
