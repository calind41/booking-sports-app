import React from 'react';
import axios from 'axios'
// import jwt from 'jsonwebtoken'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './BookModal.css'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function BookModal({ selectedHour, selectedServiceOption, selectedDateOption, image, title, sport, location, price, date, available }) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmBooking = async () => {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'));
        const userId = decoded.userId;
        const nrReservations = decoded.nrReservations + 1;

        // update nr of reservations of userId
        await axios.put(`http://localhost:5000/api/v1/users/${userId}`, { nrReservations })
        console.log('jwt decoded is ', userId);
        let reservation = {
            selectedServiceOption,
            selectedDateOption: selectedDateOption.getTime(),
            selectedHour,
            image,
            location: 'Sector 5'
        }

        const res = await axios.post('http://localhost:5000/book', { reservation });
        history.push('/sportLocations')

    }

    // import dynamically the images ?
    let imgs = require.context('../../../../../server', true);
    let img = imgs('' + image);


    return (
        <div>
            <button className='book-btn' type="button" onClick={handleOpen}>
                Book
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div id='container' className={classes.paper}>
                        <h2 id="transition-modal-title">Please confirm the request</h2>
                        <div className='summary-info'>
                            <div>
                                <img style={{ 'width': '250px', 'height': '250px' }} src={img} />
                            </div>
                            <div>
                                <ul>
                                    <li>{title}</li>
                                    <li>{sport}</li>
                                    <li>{location}</li>
                                    <li>{selectedServiceOption}</li>
                                    <li>{date}</li>
                                    <li>{selectedHour}</li>
                                    <li>Price: {price}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='btns'>
                            <button onClick={handleClose} className='cancel-btn'>Cancel</button>
                            <button onClick={handleConfirmBooking} className='confirm-btn'>Confirm</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}