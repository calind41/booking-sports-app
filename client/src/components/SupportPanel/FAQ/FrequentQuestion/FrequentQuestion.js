import React from 'react'
import './FrequentQuestion.css'

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#F2F2F2',
        width: '28vw',
        height: '54vh',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '12px !important',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontSize: '14px'

    },
    closeIcon: {
        position: 'relative',
        left: '28.2vw',
        bottom: '5px',
        width: '10px',
        cursor: 'pointer',
        transition: '.2s ease-in-out',
        '&:hover': {
            color: 'red'
        }
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        bottom: '5vh'
    },
    qNr: {
        backgroundColor: 'gray',
        width: '30px',
        height: '20px',
        color: '#ffffff',
        position: 'relative',
        left: '0vw',
    },
    hText: {
        fontWeight: 'bold',
        position: 'relative',
        right: '19vw'
    },
    response: {
        position: 'relative',
        bottom: '4.1vh',
        height: '41vh'
    }

}));


export default function FrequentQuestion() {


    const [checked, setChecked] = React.useState(false);

    const handleChange = event => {
        setChecked(event.target.checked);
    };

    // modal setup
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className='frequenct-q-container'>
            <div>
                <div>Q1</div>
                <div>Question text</div>
            </div>
            <div>
                <div>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <div onClick={handleOpen}>View Answer</div>
            </div>
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
                    <div id='responnd-form-container' className={classes.paper}>
                        <div onClick={handleClose} className={classes.closeIcon}><i class="fas fa-times"></i></div>
                        <div className={classes.header}>
                            <div className={classes.qNr}>Q1</div>
                            <div className={classes.hText}>Question text</div>
                        </div>
                        <div className={classes.response}>
                            Response to question Q1. Here it goes, the answert to this question. its super simple.
                            Its an useful response, isn't it?
                        </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
