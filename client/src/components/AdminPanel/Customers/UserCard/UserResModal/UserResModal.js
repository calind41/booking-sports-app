import React, { Fragment, useEffect } from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import './UserResModal.css'
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
        height: '82vh !important  ',
        width: '28vw !important'
    },
    headerText: {
        marginLeft: '3vw'
    },
    nrResH4: {
        position: 'relative',
        left: '9vw',
        bottom: '2vh',
        fontSize: '14px'
    },
    rescontainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '74vh',
        width: '100%',
        paddingLeft: '1vw',
        overflow: 'auto',
        position: 'relative',
        bottom: '3vh',
        right: '0.5vw'
    },
    reservation: {
        display: 'flex',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2vh',
        border: '1px solid #000000',
        padding: '10px'
    },
    resTextDesc: {
        position: 'relative',
        right: '2vw',
        // top: '3vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontSize: '12px'
    },
    boldText: {
        fontWeight: 'bold'
    },
    img: {
        position: 'relative',
        // top: '3vh',
        width: '10vh',
        height: '10vh'
    }
}));

export default function UserResModal({ setOpenStateInParentClassToFalse, state, name, nrReservations, reservations }) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (state === true)
            setOpen(true);
    }, [state])

    const handleClose = () => {
        setOpen(false);
        setOpenStateInParentClassToFalse();
    };

    let imgs = require.context('../../../../../../../server', true);


    return (
        <div>

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
                        <h3 className={classes.headerText} id="transition-modal-title">Reservation History for {name}</h3>
                        <h4 className={classes.nrResH4}>Nr. reservations: {nrReservations}</h4>
                        <div className={classes.rescontainer}>
                            {
                                reservations.map((reservation) => {

                                    let im = imgs('' + reservation.image);
                                    return (
                                        <div className={classes.reservation}>
                                            <div>
                                                <div><img className={classes.img} src={im} /></div>
                                            </div>
                                            <div className={classes.resTextDesc}>
                                                <div><span className={classes.boldText}>Title:</span> {reservation.title}</div>
                                                <div><span className={classes.boldText}>Location:</span> {reservation.location}</div>
                                                <div><span className={classes.boldText}>Sport:</span> {reservation.sport}</div>
                                                <div><span className={classes.boldText}>Service Option:</span> {reservation.selectedServiceOption}</div>
                                                <div><span className={classes.boldText}>Date/Time:</span> {reservation.date}/{reservation.selectedHour}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>

                    </div>
                </Fade>
            </Modal>
        </div >
    );
}