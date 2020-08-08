import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom'
import SportCategories from './SportCategories/SportCategories'
import SearchContainer from './SearchContainer/SearchContainer'
import Header from './Header/Header'
import './LandingPage.css'


export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bgImage: 'billiard-bg',
            selectedSport: 'billiard',
            loggedIn: false
        }
        this.changeBackgroundImg = this.changeBackgroundImg.bind(this)
    }
    componentDidMount() {
        if (localStorage.getItem('selectedSport') !== null)
            localStorage.removeItem('selectedSport');
        if (localStorage.getItem('selectedSector') !== null)
            localStorage.removeItem('selectedSector');
    }
    changeBackgroundImg(name) {

        this.setState(() => { return { bgImage: name, selectedSport: name.split('-')[0] } });
    }


    toggleSignOutDropdown() {
        let elem = document.querySelector('.sign-out-dropdown');
        console.log(elem.style.display);

        if (elem.style.display === 'none' || elem.style.display === '')
            elem.style.display = 'block';
        else
            elem.style.display = 'none';
    }
    // const [loggedIn, setLoggedIn] = useState(false);
    handleSignOut() {
        localStorage.setItem('userLoggedIn', false);
        localStorage.removeItem('token');
        window.location.reload();

    }

    render() {
        let name;
        if (localStorage.getItem('token') !== null) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.decode(localStorage.getItem('token'));
            name = decoded.firstName + ' ' + decoded.lastName;
        }

        return (
            <div className={'lp-container ' + this.state.bgImage} >
                <div className='lp-btns'>
                    {localStorage.getItem('userLoggedIn') === 'true' ?
                        <div className='lp-user-logged-in'>
                            <div style={window.location.pathname === '/booking' ? { right: '-1.30vw' } : null} className='navbar-part-user-logged-in'>

                                <div className='booked-btn-container'>
                                    <Link to='/userRes'>
                                        <button className='lp-booked'>Booked</button>
                                    </Link>
                                </div>

                                <div className='contact-btn-container'>
                                    <Link to='/contact'>
                                        <button className='lp-contact'>Contact</button>
                                    </Link>
                                </div>
                                <div onClick={this.toggleSignOutDropdown} className=' lp-username-container username-and-logout-container'>
                                    <i className="fas fa-user-circle userIcon"></i>
                                    <div className='lp-user-name'>{name}</div>
                                    <i id='arr-d-icon' class="fas fa-sort-down arrowDownIcon"></i>
                                </div>
                                <div className='lp-sign-out-dropdown sign-out-dropdown'>
                                    <i class="fas fa-sort-up"></i>
                                    <span onClick={this.handleSignOut}> Sign out <i class="fas fa-sign-out-alt"></i></span>
                                </div>
                            </div>
                        </div>
                        :
                        <Fragment>
                            <div className="box-2">
                                <Link to='/signin'>
                                    <button className='lp-signin'>Sign In</button>
                                </Link>
                            </div>

                            <div className="box-1">
                                <Link style={{ 'textDecoration': 'none' }} to='/signup'>
                                    <button className='lp-register'>Register</button>
                                </Link>
                            </div>
                        </Fragment>
                    }
                </div>

                <Header />
                <SearchContainer selectedSport={this.state.selectedSport} />
                <SportCategories changeBackgroundImg={this.changeBackgroundImg} />
            </div>
        )
    }
}
