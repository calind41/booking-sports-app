import React from 'react'
import './MessageDetails.css'
import axios from 'axios'

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
        paddingLeft: '10px',
        marginBottom: '10px'
    },
    to: {
        cursor: 'pointer',
        marginBottom: '10px'

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
        cursor: 'pointer',
        marginBottom: '10px'
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
        marginBottom: '10px'
    },
    messageArea: {
        width: '25vw',
        height: '10vh',
        resize: 'none',
        outline: 'none',
        paddingLeft: '10px',
        paddingTop: '11px',
        border: '2px solid red',
        position: 'relative',
        bottom: '1vh'

    },
    btns: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        bottom: '.4vh'
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
        bottom: '-18px',
        width: '10px',
        cursor: 'pointer',
        transition: '.2s ease-in-out',
        '&:hover': {
            color: 'red'
        }
    }
}));

export default function MessageDetails({ msg, selectedMessageDetails }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addToFaq = async () => {
        if (msg.inFaq === false) {
            await axios.put(`http://localhost:5000/api/v1/messages/${msg._id}`, { inFaq: true });
        }
    }

    const sendResponse = async () => {
        let msgId = msg._id;
        console.log('message id ', msgId);
        let response = document.querySelector('#txtarea').value;
        let alreadyResponded = true;
        console.log('message id is ', msgId);
        await axios.put(`http://localhost:5000/api/v1/messages/response/${msgId}`, { response });
        await axios.put(`http://localhost:5000/api/v1/messages/${msgId}`, { alreadyResponded });

        window.location.reload();

    }
    if (selectedMessageDetails)
        return (
            <div className='msg-details-container'>
                <div className='date-time'>{`${selectedMessageDetails.date} ${selectedMessageDetails.time}`}</div>
                <div className='title-msg'><span>Subject :</span>{selectedMessageDetails.subject}</div>
                <div className='from-email'><span>From :</span> {selectedMessageDetails.fromAuser ? selectedMessageDetails.user.email : selectedMessageDetails.email}</div>
                <div className='msg-body'>{selectedMessageDetails.messageBody}</div>
                <div onClick={msg.alreadyResponded ? null : handleOpen} className={msg.alreadyResponded ? 'reply-btn grayBg' : 'reply-btn'}>
                    <i class="fas fa-reply"></i>
                    <span>{msg.alreadyResponded ? 'Replied' : 'Reply'}</span>
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
                                    <input className={classes.fromInput} value='genmotionbooking@gmail.com' type='text' />
                                </div>
                            </div>
                            <div className={classes.to}>
                                <div className={classes.toText}>To</div>
                                <div className={classes.toEmail}>
                                    {msg.fromAuser ? msg.user.email : msg.email}
                                </div>
                            </div>
                            <div className={classes.subject}>
                                <div className={classes.subjectText}>Subject</div>
                                <div className={classes.subjectValue}>Title of the message</div>
                            </div>
                            <div className={classes.message}>
                                <div className={classes.messageText}>Message</div>
                                <div>
                                    <textarea id='txtarea' className={classes.messageArea} />
                                </div>
                            </div>
                            <div className={classes.btns}>
                                <div onClick={sendResponse} className={classes.sendBtn}>
                                    <span className={classes.sendBtnText}>Send</span>
                                    <span className={classes.sendBtnIcon + " material-icons"}>
                                        send
                                    </span>
                                </div>
                                <div onClick={addToFaq} className={classes.addToFaq}>
                                    <span className={classes.addToFaqSpan}>Add to FAQ</span>
                                </div>
                            </div>

                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    else
        return (<div></div>)
}
