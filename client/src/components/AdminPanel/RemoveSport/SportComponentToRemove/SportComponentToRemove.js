import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import './SportComponentToRemove.css'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 'auto',
            marginBottom: '3vh',
            width: '37vw',
            height: '25vh',
        },
    },
}));



export default function SportComponentToRemove({ index, setSelectedItemState, setUnselectedItemState, nrSports }) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        setChecked(false);
    }, [nrSports])

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
        event.target.checked ? setSelectedItemState(index) : setUnselectedItemState(index)
    };

    return (
        <div className={classes.root + ' sctr-container'}>
            <Paper>
                <div className='tr-sport-container'>
                    <div className='r-checkbox-wrapper'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                    <div id='awr'>
                        <div className='reser-img-container'>
                            <img src='https://images.unsplash.com/photo-1554653918-7889417d67d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' />
                        </div>
                        <div id='s-to-rem-desc-wrapper'>
                            <div className='title-value'>
                                Title 1s
                        </div>
                            <div className='type-value'>
                                Tennis Court
                        </div>
                            <div className='location-value'>
                                Sector 1
                        </div>
                        </div>

                    </div>



                </div>
            </Paper>
        </div>
    );
}
