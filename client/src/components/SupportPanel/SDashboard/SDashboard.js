import React, { Component } from 'react'
import './SDashboard.css'
import SidebarMenu from '../../AdminPanel/Dashboard/SidebarMenu/SidebarMenu'
import Navigation from '../../AdminPanel/Dashboard/Navigation/Navigation'
import Message from './Message/Message'
import MessageController from './MessageController/MessageController'
import MessageDetails from './MessageDetails/MessageDetails'
import SearchBar from '../../AdminPanel/RemoveSport/SearchBar/SearchBar'

export default function SDashboard() {


    return (
        <div className='sdashboard-container'>
            <SidebarMenu faq={true} name='Support Panel' />
            <Navigation dashboard='support' />
            <div className='wrapper'>
                <div>
                    <div>
                        <MessageController />
                    </div>
                    <div>
                        <SearchBar width='500px' />
                    </div>
                </div>


                <div className='msg-wrapper'>
                    <div className='msgs'>
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className='msg-detail'>
                        <MessageDetails />
                    </div>
                </div>

            </div>


        </div>
    )
}
