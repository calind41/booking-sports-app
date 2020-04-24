import React, { useState } from 'react'
import SidebarMenu from '../../AdminPanel/Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../../AdminPanel/Dashboard/Navigation/Navigation'

import MessageController from '../SDashboard/MessageController/MessageController'
import SearchBar from '../../AdminPanel/RemoveSport/SearchBar/SearchBar'

import FrequentQuestion from './FrequentQuestion/FrequentQuestion'
import './Faq.css'

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


export default function Faq() {

    const [questions, setQuestions] = useState([1, 2, 3, 4, 5, 6, 1, 2, 1, 1, 1, 1, 1,]);

    const [pageNr, setPageNr] = useState(1);
    const [index, setIndex] = useState(0);
    const nrQuestions = questions.length;


    const changePage = (page) => {
        setPageNr(page);
        setIndex(page * 4 - 4);
        // display from array of products: prodArr[idx, idx+8]

    }

    return (
        <div>
            <SidebarMenu faq={true} name='Support Panel' />
            <Navigation location="FAQ" />

            <div className='faq-wrapper'>
                <div>
                    <div>
                        <MessageController />
                    </div>
                    <div>
                        <SearchBar width='500px' />
                    </div>
                </div>
                <div className='fquestions-wrapper'>
                    {
                        questions === [] || questions[0] === null ? null : questions.map((q, idx) => {
                            return idx >= index && idx <= index + 3 ?
                                (<div>
                                    <FrequentQuestion />
                                </div>) : null
                        })
                    }
                </div>

            </div>
            <div>
                <Pagination
                    id='pagination-component3'
                    page={pageNr}
                    onChange={(event, page) => { changePage(page) }}
                    count={Math.ceil(nrQuestions / 4)}
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </div>
    )
}
