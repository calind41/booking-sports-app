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

import ServiceDetails from '../../AddSport/ServiceDetails/ServiceDetails'
import './UpdateFormComponent.css'

import UploadImages from '../../AddSport/UploadImages/UploadImages'
import GridGallery from '../GridGallery/GridGallery';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'block',
            width: '550px'
        }
    },

}));

const formStyles = {
    'position': 'absolute',
    'top': '20vh',
    'left': '20vw',
    'width': '30vw'
}
const textareastyles = {
    'width': '29vw',
    'resize': 'none',
    'padding-left': '12px'
}
const inputLabelStyles = {
    'position': 'relative',
    'top': '10px',
}
const outlinedInputStyles = {
    'width': '30vw',
    'height': '6vh',

}


export default function FormComponent() {
    const [name, setName] = React.useState('defaultValue');
    const [name2, setName2] = React.useState('defaultValue2');
    const [name3, setName3] = React.useState('defaultValue3');
    const [textAreaValue, setTextAreaValue] = useState('defaultTextArea');
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

    const handleChangeTextArea = (e) => {
        setTextAreaValue(e.target.value);
    }


    let items = [{
        text: "30min / 12:00, 14:00",
        key: Date.now()
    },
    {
        text: "50min / 12:00, 14:00",
        key: Date.now() + 5
    }
    ]


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
                            value={textAreaValue}
                            onChange={handleChangeTextArea}
                        />
                    </form>

                    <div className='service-containrr'>
                        <div>
                            <ServiceDetails items={items} />
                        </div>
                    </div>
                </div>
                <div className='update-upload-imgs-container'>
                    <div className='as-save-btn'>Update</div>
                    <UploadImages />
                </div>
                <div id='g-gallery'>
                    <GridGallery />
                </div>
            </div>
        </Fragment>
    );
}

