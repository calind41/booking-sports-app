import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import './UserReservation.css'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 'auto',
            marginBottom: '3vh',
            width: '80vw',
            height: '25vh',
        },
    },
}));

export default function UserReservation() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
    };

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
                        <img src='https://images.unsplash.com/photo-1554653918-7889417d67d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' />
                    </div>
                    <div className='type-value'>
                        Tennis Court 60min
                    </div>
                    <div className='location-value'>
                        Sector 1
                    </div>
                    <div className='date-time-value'>
                        12 march 2020 / 09:00
                    </div>
                    <div className='price-value'>
                        100RON
                    </div>
                    <div className='available-value'>
                        Yes
                    </div>
                    <div className='cancel-container'>
                        <button>Cancel</button>
                    </div>

                </div>
            </Paper>
        </div>
    );
}
