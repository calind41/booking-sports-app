import React, { Fragment } from 'react'
import SportCategory from './SportCategory/SportCategory'
import './SportCategories.css'
import swimIcon from '../../../imgs/swim_icon.png'
import basketballIcon from '../../../imgs/basketball_icon2.png'
import soccerIcon from '../../../imgs/soccer_icon.png'
import billiardIcon from '../../../imgs/billiard_icon.png'
import tennisIcon from '../../../imgs/tennis_icon.png'
import bowlingIcon from '../../../imgs/bowling_icon.png'


export default class SportCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 'Swimming'
        }
        this.handleCategoryClick = this.handleCategoryClick.bind(this)
    }

    handleCategoryClick(name) {
        console.log(name);
        this.props.changeBackgroundImg(name.toLowerCase() + '-bg');
        this.setState(() => { return { selectedCategory: name } }, () => this.setState({ selectedCategory: name }));
    }

    render() {
        return (
            <div className='sport-c-container' >
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Swimming' iconName={swimIcon} selected={this.state.selectedCategory === 'Swimming' ? true : false} />
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Basketball' iconName={basketballIcon} selected={this.state.selectedCategory === 'Basketball' ? true : false} />
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Soccer' iconName={soccerIcon} selected={this.state.selectedCategory === 'Soccer' ? true : false} />
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Billiard' iconName={billiardIcon} selected={this.state.selectedCategory === 'Billiard' ? true : false} />
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Tennis' iconName={tennisIcon} selected={this.state.selectedCategory === 'Tennis' ? true : false} />
                <SportCategory handleCategoryClick={this.handleCategoryClick} name='Bowling' iconName={bowlingIcon} selected={this.state.selectedCategory === 'Bowling' ? true : false} />
            </div>
        )
    }
}
