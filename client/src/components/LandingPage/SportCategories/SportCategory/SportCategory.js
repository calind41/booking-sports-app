import React, { Fragment } from 'react'
import './SportCategory.css';

export default class SportCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            iconName: this.props.iconName,
            selected: this.props.selected
        }
    }
    render() {
        return (
            <div onClick={() => { this.props.handleCategoryClick(this.state.name) }} className={this.props.selected === true ? 'sel-categ sport-c' : 'sport-c'}>
                <img className='sport-c-i' src={this.state.iconName} />
                <p>{this.state.name}</p>
            </div >
        )
    }
}
