import React from 'react'
import './MessageDetails.css'

import { makeStyles } from '@material-ui/core/styles';
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
        backgroundColor: '#e9ebee',
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
    from: {
    },
    fromText: {
        marginBottom: '5px'
    },
    fromInput: {
        width: '25vw',
        height: '4.7vh',
        border: 'none',
        borderRadius: '5px',
        outline: 'none',
        paddingLeft: '10px'
    },
    to: {
        cursor: 'pointer'
    },
    toText: {
        'marginBottom': '5px'
    },
    toEmail: {
        'width': '25vw',
        'height': '4vh',
        'borderRadius': '5px',
        'backgroundColor': '#ffffff',
        'paddingTop': '11px',
        'paddingLeft': '10px'
    },
    subject: {
        cursor: 'pointer'
    },
    subjectText: {
        marginBottom: '5px'
    },
    subjectValue: {
        width: '25vw',
        height: '4vh',
        borderRadius: '5px',
        paddingTop: '11px',
        paddingLeft: '10px',
        backgroundColor: '#ffffff',
    },
    message: {

    },
    messageText: {
        marginBottom: '5px'
    },
    messageArea: {
        width: '25vw',
        height: '10vh',
        resize: 'none',
        outline: 'none',
        paddingLeft: '10px',
        paddingTop: '11px'
    },
    btns: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    sendBtn: {
        backgroundColor: '#056CF2',
        borderRadius: '7px',
        color: '#ffffff',
        width: '7vw',
        height: '5vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: '.2s ease-in-out',
        '&:hover': {
            backgroundColor: '#0b55b5'
        }

    },
    sendBtnText: {
        position: 'relative',
        bottom: '1px',
        left: '4px'
    },
    sendBtnIcon: {
        position: 'relative',
        right: '8px',
        bottom: '0.5px',
        fontSize: '17px'
    },
    addToFaq: {
        position: 'relative',
        right: '13vw',
        width: '7vw',
        height: '5vh',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '7px',
        backgroundColor: '#98A7BB',
        color: '#ffffff',
        cursor: 'pointer',
        transition: '.2s ease-in-out',
        '&:hover': {
            backgroundColor: '#707b8a'
        }
    },
    addToFaqSpan: {
        marginLeft: '15px',
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
    }
}));

export default function MessageDetails() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='msg-details-container'>
            <div className='date-time'>14 March 08:50AM</div>
            <div className='title-msg'>Title of the message</div>
            <div className='from-email'><span>From :</span> user@gmail.com</div>
            <div className='msg-body'>Body of the message. Some random text here</div>
            <div onClick={handleOpen} className='reply-btn'>
                <i class="fas fa-reply"></i>
                <span>Reply</span>
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
                        <div className={classes.from}>
                            <div className={classes.fromText}>From</div>
                            <div>
                                <input className={classes.fromInput} type='text' />
                            </div>
                        </div>
                        <div className={classes.to}>
                            <div className={classes.toText}>To</div>
                            <div className={classes.toEmail}>
                                user@example.com
                            </div>
                        </div>
                        <div className={classes.subject}>
                            <div className={classes.subjectText}>Subject</div>
                            <div className={classes.subjectValue}>Title of the message</div>
                        </div>
                        <div className={classes.message}>
                            <div className={classes.messageText}>Message</div>
                            <div>
                                <textarea className={classes.messageArea} />
                            </div>
                        </div>
                        <div className={classes.btns}>
                            <div className={classes.sendBtn}>
                                <span className={classes.sendBtnText}>Send</span>
                                <span className={classes.sendBtnIcon + " material-icons"}>
                                    send
                                </span>
                            </div>
                            <div className={classes.addToFaq}>
                                <span className={classes.addToFaqSpan}>Add to FAQ</span>
                            </div>
                        </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
