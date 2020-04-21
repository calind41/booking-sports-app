import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

import TodoItems from '../../../../test/TodoItems'
import './ServiceDetails.css'


export default class ServiceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(key) {
        let filteredItems = this.state.items.filter((item) => {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            let newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    render() {
        const toRender = this.state.arr;
        return (
            <div className='srv-det-container'>

                <div className='service-heading'>Service details</div>
                <div className='format-example'>
                    <div><span>Format: </span> xmin / 09:00,14:00,19:00... </div>
                </div>
                <div className="todoListMain">
                    <div className="header">
                        <form onSubmit={this.addItem}>
                            <input ref={(a) => this._inputElement = a} placeholder="duration min / available times">
                            </input>
                            <button type="submit">add</button>
                        </form>
                    </div>
                    <TodoItems entries={this.state.items}
                        delete={this.deleteItem} />
                </div>



            </div>
        )
    }
}
