import React, { useEffect } from 'react'
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
        left: '27.2vw',
        bottom: '-1.2vh',
        width: '10px',
        cursor: 'pointer',
        transition: '.2s ease-in-out',
        '&:hover': {
            color: 'red'
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        bottom: '3vh',
        width: '24vw',
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
        right: '11vw',
        width: '10vw',
    },
    fontWeightBold: {
        fontWeight: 'bold'
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '43vh'
    },
    question: {
        marginBottom: '2vh',
    },
    response: {

    }

}));


export default function FrequentQuestion({ q, index, setSelectedItemState, setUnselectedItemState, initialChecked, nrQuestions }) {


    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        setChecked(false);
    }, [nrQuestions])

    const handleChange = event => {
        setChecked(event.target.checked);
        event.target.checked ? setSelectedItemState(index) : setUnselectedItemState(index)
    };

    // modal setup
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log('closed ')
    };


    return (
        <div className='frequenct-q-container'>
            <div>
                <div>Q{index + 1}</div>
                <div className='fq-subject'>{q.subject}</div>
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
                            <div className={classes.qNr}>Q{index + 1}</div>
                            <div className={classes.hText}>{q.subject}</div>
                        </div>
                        <div className={classes.bodyContainer}>
                            <div className={classes.question}>
                                <span className={classes.fontWeightBold}>Question:</span><br /> {q.messageBody}
                            </div>
                            <div className={classes.response}>
                                <span className={classes.fontWeightBold}>Response:</span><br /> {q.response}
                            </div>
                        </div>


                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
