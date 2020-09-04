import React from 'react';
import axios from 'axios'
// import jwt from 'jsonwebtoken'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './BookModal.css'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

toast.configure();

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none',
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
        if (localStorage.getItem('userLoggedIn') !== 'true') {
            alert('You need to log in for booking');
            history.push('/signin');
            return;
        }
        // Verify if the selected date is at least 24h in advance
        let resTime = new Date(date).getTime();
        let selectedHourInMs = 0;
        selectedHour.split(':').map((item, index) => {
            if (item.charAt(0) === '0') {
                if (index === 0) {
                    selectedHourInMs += 3600000 * parseInt(item.charAt(1));
                } else {
                    selectedHourInMs += 60000 * parseInt(item.charAt(1));
                }
            } else {
                if (index === 0) {
                    selectedHourInMs += 3600000 * parseInt(item);
                } else {
                    selectedHourInMs += 60000 * parseInt(item);
                }
            }
        });
        let nowTime = new Date().getTime();
        let diff = (resTime + selectedHourInMs - nowTime) / 3600000
        if (diff < 24) {
            console.log('diff is ', diff);
            alert('Reservations are made with at least 24h in advance!');
            handleClose();
            return;
        }


        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'));
        const userId = decoded.userId;
        // get user to find  nr of reservations 
        const user = await axios.get(`http://localhost:5000/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        });
        const nrReservations = user.data.nrReservations + 1;
        // update nr of reservations of userId
        await axios.put(`http://localhost:5000/api/v1/users/${userId}`, { nrReservations }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        let reservation = {
            userId,
            title,
            sport,
            location,
            selectedServiceOption,
            selectedHour,
            date,
            image,
            price: parseFloat(price),
            available: true,
            canceled: false
        }

        const res = await axios.post('http://localhost:5000/api/v1/reservations/', reservation, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        toast.success('Your reservation was successfully registered!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                id='book-modal-id'
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
                                <img id='book-modal-img-id' style={{ 'width': '250px', 'height': '250px' }} src={img} />
                            </div>
                            <div>
                                <ul id='summary-info-list-id'>
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
                        <div id='modal-btns-id' className='btns'>
                            <button onClick={handleClose} className='cancel-btn'>Cancel</button>
                            <button onClick={handleConfirmBooking} className='confirm-btn'>Confirm</button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}