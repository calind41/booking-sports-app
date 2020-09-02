import React, { useState, useEffect } from 'react';
import axios from 'axios'
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
            marginBottom: '22px',
            width: '70.4vw',
            height: '177px',
            fontSize: '14px'
        },
    },
}));


export default function UserReservation({ initialChecked, setSelectedItemState, setUnselectedItemState, reservation, index, nrReservations }) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(initialChecked);
    const [canceled, setCanceled] = useState(reservation.canceled);

    useEffect(() => {
        setChecked(false);
    }, [nrReservations])

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
        event.target.checked ? setSelectedItemState(index) : setUnselectedItemState(index)

    };

    const expired = reservation.selectedDateOption < new Date().getTime();

    const cancelReservation = async (evt) => {
        // update cancel field 
        console.log('in cancel reservation ');
        let data;
        await axios.put(`http://localhost:5000/api/v1/reservations/${reservation._id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCanceled(true);
    }

    return (
        <div className={classes.root}>
            <Paper id='u-res-wrapper'>
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
                    <div className='wrapper'>
                        <div className='type-value'>
                            {reservation.selectedServiceOption.split(',')[0]}
                        </div>
                        <div className='location-value'>
                            {reservation.location}
                        </div>
                        <div className='date-time-value'>
                            {new Date(reservation.date).toUTCString().split(' ').filter((s, index) => (index > 0 && index < 4)).join(' ')} / {reservation.selectedHour}
                        </div>
                        <div className='price-value'>
                            {reservation.selectedServiceOption.split(',')[1]}
                        </div>
                        <div className='available-value'>
                            {expired ? 'No' : 'Yes'}
                        </div>
                        <div className='cancel-container'>
                            <button id='cancel-res-btn' onClick={cancelReservation} style={expired ? { color: 'gray' } : null}>{canceled ? 'Canceled' : 'Cancel'}</button>
                        </div>
                    </div>


                </div>
            </Paper>
        </div>
    );
}
