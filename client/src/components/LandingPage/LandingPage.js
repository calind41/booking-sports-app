import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SportCategories from './SportCategories/SportCategories'
import SearchContainer from './SearchContainer/SearchContainer'
import Header from './Header/Header'
import './LandingPage.css'


export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgImage: 'swimming-bg'
        }
        this.changeBackgroundImg = this.changeBackgroundImg.bind(this)
    }
    changeBackgroundImg(name) {
        this.setState(() => { return { bgImage: name } });
        console.log('changed');
    }

    render() {
        return (
            <div className={'lp-container ' + this.state.bgImage} >
                <div className='lp-btns'>
                    <div className="box-2">
                        <Link to='/signin'>
                            <div className="btn btn-two">
                                <span>Sign In</span>
                            </div>
                        </Link>
                    </div>

                    <div className="box-1">
                        <Link style={{ 'textDecoration': 'none' }} to='/signup'>
                            <div className="btn btn-one">
                                <span>Register</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <Header />
                <SearchContainer />
                <SportCategories changeBackgroundImg={this.changeBackgroundImg} />
            </div>
        )
    }
}
