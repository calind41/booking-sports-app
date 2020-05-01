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



export default function SportComponentToRemove({ sportLoc, index, setSelectedItemState, setUnselectedItemState, nrSports }) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    let imgs = require.context('../../../../../../server', true);
    let imageArr = [];
    sportLoc.images.map((image) => {
        let im = imgs('' + image);
        imageArr.push(im)
    });

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
                            <img src={imageArr[0]} />
                        </div>
                        <div id='s-to-rem-desc-wrapper'>
                            <div className='title-value'>
                                {sportLoc.title}
                            </div>
                            <div className='type-value'>
                                {sportLoc.sport}
                            </div>
                            <div className='location-value'>
                                {'Sector ' + sportLoc.district}
                            </div>
                        </div>

                    </div>



                </div>
            </Paper>
        </div>
    );
}
