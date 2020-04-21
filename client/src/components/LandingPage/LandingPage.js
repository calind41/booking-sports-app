import React, { Component } from 'react';
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
                    {/* <button className='sign-in'>Sign In</button>
                    <button className='register'>Register</button> */}

                    <div className="box-2">
                        <div className="btn btn-two">
                            <span>Sign In</span>
                        </div>
                    </div>

                    <div className="box-1">
                        <div className="btn btn-one">
                            <span>Register</span>
                        </div>
                    </div>
                </div>

                <Header />
                <SearchContainer />
                <SportCategories changeBackgroundImg={this.changeBackgroundImg} />
            </div>
        )
    }
}
