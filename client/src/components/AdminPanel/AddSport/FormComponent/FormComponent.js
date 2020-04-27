import React, { Fragment, useState } from 'react';
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

import ServiceDetails from '../ServiceDetails/ServiceDetails'
import './FormComponent.css'

import UploadImages from '../UploadImages/UploadImages'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'block',
            width: '550px',
            fontSize: '10px'
        }
    },

}));

const formStyles = {
    position: 'absolute',
    top: '10.9vh',
    left: '18.4vw',
    width: '30vw'
}
const textareastyles = {
    position: 'relative',
    top: '2vh',
    width: '29vw',
    resize: 'none',
    paddingLeft: '12px',
    paddingTop: '10px',
    fontSize: '14px',
    height: '10vh'
}
const inputLabelStyles = {
    position: 'relative',
    top: '10px',
    fontSize: '14px'
    // backgroundColor: '#ffffff'
}
const outlinedInputStyles = {
    width: '30vw',
    height: '6vh',
    backgroundColor: 'white',
    fontSize: '14px'


}



export default function FormComponent() {
    const [name, setName] = React.useState('');
    const [name2, setName2] = React.useState('');
    const [name3, setName3] = React.useState('');
    const classes = useStyles();

    const handleChange = event => {
        setName(event.target.value);
    };
    const handleChange2 = event => {
        setName2(event.target.value);
    };
    const handleChange3 = event => {
        setName3(event.target.value);
    };


    return (
        <Fragment>
            <div className='as-form-component-container'>
                <div>
                    <form style={formStyles} className={classes.root} noValidate autoComplete="off">
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Title</InputLabel>
                            <OutlinedInput style={outlinedInputStyles} id="component-outlined" value={name} onChange={handleChange} label="Title" />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Sport type</InputLabel>
                            <OutlinedInput style={outlinedInputStyles} id="component-outlined2" value={name2} onChange={handleChange2} label="Sport type" />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Location</InputLabel>
                            <OutlinedInput style={outlinedInputStyles} id="component-outlined3" value={name3} onChange={handleChange3} label="Location" />
                        </FormControl>
                        <TextareaAutosize
                            rowsMin={5}
                            rowsMax={10}
                            placeholder='Inventory Information '
                            aria-label="maximum height"
                            style={textareastyles}
                        />
                    </form>

                    <div className='service-containrr'>
                        <div>
                            <ServiceDetails items={[]} />
                        </div>
                    </div>
                </div>
                <div className='upload-imgs-container'>

                    <UploadImages />
                </div>
                <div className='as-save-btn'>Save</div>

            </div>
        </Fragment>
    );
}

