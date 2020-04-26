import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import './UserReservation.css'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            position: 'relative',
            left: '12vw',
            marginBottom: '3vh',
            width: '70.4vw',
            height: '25vh',
            fontSize: '14px'
        },
    },
}));


export default function UserReservation({ initialChecked, setSelectedItemState, setUnselectedItemState, reservation, index, nrReservations }) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(initialChecked);

    useEffect(() => {
        setChecked(false);
    }, [nrReservations])

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
        event.target.checked ? setSelectedItemState(index) : setUnselectedItemState(index)

    };

    const expired = reservation.selectedDateOption < new Date().getTime();

    const cancelReservation = (evt) => {
        evt.target.style.color !== 'gray' ? evt.target.textContent = 'Canceled' : evt.target.textContent = 'Cancel'
    }

    return (
        <div className={classes.root}>
            <Paper>
                <div className='reser-container'>
                    <div className='r-checkbox-wrapper'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    <div className='reser-img-container'>
                        <img src={reservation.image} />
                    </div>
                    <div className='type-value'>
                        {reservation.selectedServiceOption.split(',')[0]}
                    </div>
                    <div className='location-value'>
                        {reservation.location}
                    </div>
                    <div className='date-time-value'>
                        {new Date(reservation.selectedDateOption).toUTCString().split(' ').filter((s, index) => (index > 0 && index < 4)).join(' ')} / {reservation.selectedTimeOption}
                    </div>
                    <div className='price-value'>
                        {reservation.selectedServiceOption.split(',')[1]}
                    </div>
                    <div className='available-value'>
                        {expired ? 'No' : 'Yes'}
                    </div>
                    <div className='cancel-container'>
                        <button id='cancel-res-btn' onClick={cancelReservation} style={expired ? { color: 'gray' } : null}>Cancel</button>
                    </div>

                </div>
            </Paper>
        </div>
    );
}
