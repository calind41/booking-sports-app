import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/src/stylesheets/datepicker.scss'

import './CustomCalendar.css'

export default function CustomCalendar({ handleClickDateOption }) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='custom-calendar-container'>
            <div className='datepicker-header'>Select Date and Time</div>
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={date => { setStartDate(date); handleClickDateOption(date); }}
                    inline
                />
            </div>
        </div>

    );
}