import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './BookModal.css'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                <img style={{ 'width': '250px', 'height': '250px' }} src='https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=713&q=80' />
                            </div>
                            <div>
                                <ul>
                                    <li>1 court 1.5hours</li>
                                    <li>23rd march 2020</li>
                                    <li>09:00</li>
                                    <li>Price: 100RON</li>
                                </ul>
                            </div>
                        </div>
                        <div className='btns'>
                            <button className='cancel-btn'>Cancel</button>
                            <button className='confirm-btn'>Confirm</button>
                        </div>
                        email confirmation -add design
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}