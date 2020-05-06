import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './SDashboard.css'
import SidebarMenu from '../../AdminPanel/Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../../AdminPanel/Dashboard/Navigation/Navigation'
import Message from './Message/Message'
import MessageController from './MessageController/MessageController'
import MessageDetails from './MessageDetails/MessageDetails'
import SearchBar from '../../AdminPanel/RemoveSport/SearchBar/SearchBar'
import Pagination from '@material-ui/lab/Pagination';

export default function SDashboard() {

    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
        console.log('decoded is ', decoded);
    }

    const [messages, setMessages] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedMessageDetails, setSelectedMessageDetails] = useState(null);
    const [ids, setIds] = useState([]);

    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get('http://localhost:5000/api/v1/messages/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(res.data);
            setMessages(res.data);
            console.log(res.data);
            setSelectedMessageDetails(res.data[0]);
            let selState = [];
            res.data.map(() => selState.push(false))
            setSelectedState(selState);
        }
        getMessages();

        return () => { console.log('unmount') }
    }, [])


    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
    }


    const setSelectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = true })
        setSelectedState(selectedState)
    }
    const setUnselectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = false })
        setSelectedState(selectedState)
    }

    const deleteMessages = async () => {
        let delIdx = [];
        let cpy = [...messages];
        let afterDelArr = messages.filter((item, idx) => { if (selectedState[idx]) delIdx.push(idx); return !selectedState[idx] })

        delIdx.map((item) => selectedState.splice(item, 1));
        let ids = [];
        delIdx.map((item) => ids.push(messages[item]._id));
        // setIds(temp);
        await axios.delete(`http://localhost:5000/api/v1/messages/deleteMessages`, {
            data: { ids },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // setSelectedState(selectedState);
        console.log('AFTER DEL ARRAY IS ', afterDelArr)
        // setMessages(afterDelArr);


    }

    const nrMessages = messages.length;

    const setMessageDetails = (index) => {
        let message = messages[index];
        console.log(message);
        setSelectedMessageDetails(message);
    }

    const applyFilterSearchMessagesByTitle = async (title) => {
        const res = await axios.get('http://localhost:5000/api/v1/messages/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(res.data);
        let filtered = res.data.filter((sl) => {
            if (sl.subject.toLowerCase().includes(title))
                return true;
            else
                return false;
        });
        setMessages(filtered);
    }


    return (
        role === 'support' ?
            (<div className='sdashboard-container'>
                <SidebarMenu faq={true} name='Support Panel' />
                <Navigation dashboard='support' />
                <div>
                    <div className='wrapper'>
                        <div>
                            <div className='msg-controller'>
                                <MessageController deleteMessages={deleteMessages} />
                            </div>
                            <div>
                                <SearchBar applyFilterSearchMessagesByTitle={applyFilterSearchMessagesByTitle} width='664px' />
                            </div>
                        </div>


                        <div className='msg-wrapper'>
                            <div className='msgs'>
                                {
                                    messages === [] || messages[0] === null ? null : messages.map((msg, idx) => {
                                        return idx >= index && idx <= index + 3 ?
                                            (
                                                <Message
                                                    index={idx}
                                                    setMessageDetails={setMessageDetails}
                                                    setSelectedItemState={setSelectedItemState}
                                                    setUnselectedItemState={setUnselectedItemState}
                                                    initialChecked={false}
                                                    nrMessages={messages.length}
                                                    msg={msg}
                                                />
                                            ) : null
                                    })
                                }
                            </div>
                            <div className='msg-detail'>
                                <MessageDetails msg={selectedMessageDetails} selectedMessageDetails={selectedMessageDetails} />
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                    id='pagination-component34'
                    page={pageNr}
                    onChange={(event, page) => { changePage(page) }}
                    count={Math.ceil(nrMessages / 4)}
                    variant="outlined"
                    shape="rounded"
                />


            </div>) : null
    )
}
