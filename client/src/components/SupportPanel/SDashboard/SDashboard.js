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

    const [messages, setMessages] = useState([]);
    const [selectedState, setSelectedState] = useState([]);


    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get('http://localhost:5000/messages');

            // import dynamically the images ?
            // let imgs = require.context('../../imgs', true);
            // res.data.map((r) => {
            //     r.image = imgs('./' + r.image);
            // });
            // setPastReservations(res.data.sort((item1, item2) => item2.selectedDateOption - item1.selectedDateOption));
            setMessages(res.data.messages);
            let selState = [];
            res.data.messages.map(() => selState.push(false))
            setSelectedState(selState);
            console.log(res.data);
        }
        getMessages();
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

    const deleteMessages = () => {
        let delIdx = [];
        let cpy = [...messages];
        let afterDelArr = cpy.filter((item, idx) => { if (selectedState[idx]) delIdx.push(idx); return !selectedState[idx] })

        delIdx.map((item) => selectedState.splice(item, 1));
        setSelectedState(selectedState);
        setMessages(afterDelArr);
    }
    const nrMessages = messages.length;


    return (
        <div className='sdashboard-container'>
            <SidebarMenu faq={true} name='Support Panel' />
            <Navigation dashboard='support' />
            <div>
                <div className='wrapper'>
                    <div>
                        <div className='msg-controller'>
                            <MessageController deleteMessages={deleteMessages} />
                        </div>
                        <div>
                            <SearchBar width='664px' />
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
                                                setSelectedItemState={setSelectedItemState}
                                                setUnselectedItemState={setUnselectedItemState}
                                                initialChecked={false}
                                                nrMessages={messages.length}
                                            />
                                        ) : null
                                })
                            }
                        </div>
                        <div className='msg-detail'>
                            <MessageDetails />
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


        </div>
    )
}
