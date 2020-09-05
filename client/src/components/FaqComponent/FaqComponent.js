import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Logo from '../SportLocations/Navbar/Logo/Logo';

import SearchBar from '../SportLocations/Navbar/SearchBar/SearchBar';
import SignIn from '../SportLocations/Navbar/SignIn/SignIn';
import Register from '../SportLocations/Navbar/Register/Register';
import Contact from '../SportLocations/Navbar/Contact/Contact';

import FrequentQuestions from '../SportLocations/Navbar/FrequentQuestions/FrequentQuestions'
import './FaqComponent.css'
let backend_addr = 'http://138.68.71.139:5000/'





export default function FaqComponent({ filterResBySportType, filterBySporLocationTitle, searchBar }) {

    const logoStyles = {
        left: searchBar === 'none' ? '3.1vw' : '5vw'
    }
    const signInStyles = {
        left: searchBar === 'none' ? '27.5vw' : '18.4vw'
    }
    const registerStyles = {
        left: searchBar === 'none' ? '10.2vw' : '4.7vw'
    }
    const contactStyles = {
        // right: searchBar === 'none' ? '-7.1vw !important' : '9vw'
        left: searchBar === 'none' ? '-7.1vw' : '-9.1vw'
    }
    const history = useHistory()

    const toggleSignOutDropdown = () => {
        let elem = document.querySelector('.sign-out-dropdown');
        console.log(elem.style.display);

        if (elem.style.display === 'none' || elem.style.display === '')
            elem.style.display = 'block';
        else
            elem.style.display = 'none';
    }
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSignOut = () => {
        localStorage.setItem('userLoggedIn', false);
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/');
    }

    useEffect(() => {
        if (localStorage.getItem('userLoggedIn') === null || localStorage.getItem('userLoggedIn') === 'false')
            setLoggedIn(false)
        else if (localStorage.getItem('userLoggedIn') === 'true')
            setLoggedIn(true);
    }, [])


    let name;
    if (localStorage.getItem('token') !== null) {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(localStorage.getItem('token'));
        name = decoded.firstName + ' ' + decoded.lastName;
    }



    return (
        <Fragment>
            <div className='navbar-container'>
                <Logo logoStyles={logoStyles} />
                {
                    searchBar !== 'none' ? <SearchBar filterResBySportType={filterResBySportType} filterBySporLocationTitle={filterBySporLocationTitle} /> : null
                }

                {
                    loggedIn === false ?
                        (
                            <div className='logged-out-wrapper'>
                                <Link to='/signin'>
                                    <SignIn signInStyles={signInStyles} />
                                </Link>
                                <Link to='/signup'>
                                    <Register registerStyles={registerStyles} />
                                </Link>
                                <Link to='/contact'>
                                    <Contact contactStyles={contactStyles} />
                                </Link>
                            </div>
                        ) : (
                            <Fragment>
                                <div style={window.location.pathname === '/booking' ? { right: '-1.30vw' } : null} className='navbar-part-user-logged-in'>

                                    <div className='booked-btn-container'>
                                        <Link to='/userRes'>
                                            <button>Booked</button>
                                        </Link>
                                    </div>

                                    <div className='contact-btn-container'>
                                        <Link to='/contact'>
                                            <button>Contact</button>
                                        </Link>
                                    </div>
                                    <div onClick={toggleSignOutDropdown} className='username-and-logout-container'>
                                        <i class="fas fa-user-circle"></i>
                                        <div>{name}</div>
                                        <i id='arr-d-icon' class="fas fa-sort-down"></i>
                                    </div>
                                    <div className='sign-out-dropdown'>
                                        <i class="fas fa-sort-up"></i>
                                        <span onClick={handleSignOut}> Sign out <i class="fas fa-sign-out-alt"></i></span>
                                    </div>
                                </div>
                            </Fragment>
                        )
                }

            </div>
            <Link to='/faq'>
                <FrequentQuestions inFaq={true} loggedIn={loggedIn} id='fqs' />
            </Link>
            <div className='faqs-list'>
                <div className='faq-heading'>FAQ</div>
                <Accordion />
            </div>
        </Fragment>
    )
}


class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };
    }

    componentDidMount() {
        window.setTimeout(() => {
            const el = ReactDOM.findDOMNode(this);
            const height = el.querySelector('.panel__inner').scrollHeight;
            this.setState({
                height
            });
        }, 333);
    }

    render() {
        const { label, content, activeTab, index, activateTab } = this.props;
        const { height } = this.state;
        const isActive = activeTab === index;
        const innerStyle = {
            height: `${isActive ? height : 0}px`
        }

        return (
            <div className='panel'
                role='tabpanel'
                aria-expanded={isActive}>
                <button className='panel__label'
                    role='tab'
                    onClick={activateTab}>
                    {label}
                </button>
                <div className='panel__inner'
                    style={innerStyle}
                    aria-hidden={!isActive}>
                    <p className='panel__content'>
                        {content}
                    </p>
                </div>
            </div>
        );
    }
}

class Accordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0,
            panels: []
        };

        this.activateTab = this.activateTab.bind(this);
    }

    componentDidMount() {
        const getFaqs = async () => {
            const res = await axios.get(`${backend_addr}api/v1/messages//inFaq`);
            let p = [];
            res.data.map((item) => {
                p.push({
                    label: item.messageBody,
                    content: item.response
                });
            })
            this.setState({ panels: p })
        }
        getFaqs();
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {
        const { panels } = this.state;
        const { activeTab } = this.state;
        return (
            <div className='accordion' role='tablist'>
                {panels.map((panel, index) =>
                    <Panel
                        key={index}
                        activeTab={activeTab}
                        index={index}
                        {...panel}
                        activateTab={this.activateTab.bind(null, index)}
                    />
                )}
            </div>
        );
    }
}

