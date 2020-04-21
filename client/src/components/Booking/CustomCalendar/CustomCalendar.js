import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/src/stylesheets/datepicker.scss'

import './CustomCalendar.css'

export default function CustomCalendar() {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <div className='datepicker-header'>Select Date and Time</div>
            <DatePicker
                selected={startDate}
                onChange={date => { setStartDate(date); console.log(date) }}
                inline
            />
        </div>

    );
}