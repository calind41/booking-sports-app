import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SidebarMenu from '../../AdminPanel/Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../../AdminPanel/Dashboard/Navigation/Navigation'

import MessageController from '../SDashboard/MessageController/MessageController'
import SearchBar from '../../AdminPanel/RemoveSport/SearchBar/SearchBar'

import FrequentQuestion from './FrequentQuestion/FrequentQuestion'
import './Faq.css'

import Pagination from '@material-ui/lab/Pagination';
let backend_addr = 'http://138.68.71.139:5000/'


export default function Faq() {

    let role;

    const jwt = require('jsonwebtoken');
    if (localStorage.getItem('token') !== null) {
        const decoded = jwt.decode(localStorage.getItem('token'));
        role = decoded.role;
        console.log('decoded is ', decoded);
    }

    const [questions, setQuestions] = useState([]);
    const [selectedState, setSelectedState] = useState([]);


    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);
    const nrQuestions = questions.length;

    useEffect(() => {

        const getQuestions = async () => {
            const res = await axios.get(`${backend_addr}api/v1/messages/inFaq`);
            setQuestions(res.data);
            let selState = [];
            res.data.map(() => selState.push(false))
            setSelectedState(selState);
            console.log(res.data);
        }
        getQuestions();
    }, [])


    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    const setSelectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = true })
        setSelectedState(selectedState)
    }
    const setUnselectedItemState = (index) => {
        selectedState.map((item, idx) => { if (index === idx) selectedState[idx] = false })
        setSelectedState(selectedState)
    }


    const deleteFAQs = () => {
        let delIdx = [];
        let cpy = [...questions];
        let afterDelArr = cpy.filter((item, idx) => { if (selectedState[idx]) delIdx.push(idx); return !selectedState[idx] })
        delIdx.map((item) => selectedState.splice(item, 1));

        let ids = [];
        delIdx.map((item) => ids.push(questions[item]._id));
        ids.map(async (item) => {
            await axios.put(`${backend_addr}api/v1/messages/${item}`, { inFaq: false }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        });
        setSelectedState(selectedState);
        setQuestions(afterDelArr);
    }

    const applyFilterSearchMessagesByTitleInFaq = async (title) => {
        const res = await axios.get(`${backend_addr}api/v1/messages/inFaq`);
        let filtered = res.data.filter((sl) => {
            if (sl.subject.toLowerCase().includes(title))
                return true;
            else
                return false;
        });
        setQuestions(filtered);
    }

    return (
        role === 'support' ?
            (<div className='faq-container'>
                <SidebarMenu faq={true} name='Support Panel' />
                <Navigation location="FAQ" />

                <div className='faq-wrapper'>
                    <div>
                        <div>
                            <MessageController deleteMessages={null} deleteFAQs={deleteFAQs} />
                        </div>
                        <div>
                            <SearchBar applyFilterSearchMessagesByTitleInFaq={applyFilterSearchMessagesByTitleInFaq} width='664px' />
                        </div>
                    </div>
                    <div className='fquestions-wrapper'>
                        {
                            questions === [] || questions[0] === null ? null : questions.map((q, idx) => {
                                return idx >= index && idx <= index + 3 ?
                                    (<div>
                                        <FrequentQuestion
                                            index={idx}
                                            setSelectedItemState={setSelectedItemState}
                                            setUnselectedItemState={setUnselectedItemState}
                                            initialChecked={false}
                                            nrQuestions={questions.length}
                                            q={q}
                                        />
                                    </div>) : null
                            })
                        }
                    </div>

                </div>
                <div>
                    <Pagination
                        id='pagination-component5'
                        page={pageNr}
                        onChange={(event, page) => { changePage(page) }}
                        count={Math.ceil(nrQuestions / 4)}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>) : null
    )
}
