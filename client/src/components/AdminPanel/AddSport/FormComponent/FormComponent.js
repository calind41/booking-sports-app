import React, { Fragment, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import ServiceDetails from '../ServiceDetails/ServiceDetails'
import './FormComponent.css'

import UploadImages from '../UploadImages/UploadImages'

let backend_addr = 'http://138.68.71.139:5000/'


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
    top: '77px',
    left: '281px',
    width: '30vw'
}
const textareastyles = {
    position: 'relative',
    top: '14px',
    width: '29vw',
    resize: 'none',
    paddingLeft: '12px',
    paddingTop: '10px',
    fontSize: '14px',
    height: '72px'
}
const inputLabelStyles = {
    position: 'relative',
    top: '10px',
    fontSize: '14px'
}
const outlinedInputStyles = {
    width: '30.2vw',
    height: '43px',
    backgroundColor: 'white',
    fontSize: '14px'
}



export default function FormComponent() {
    const [name, setName] = React.useState('');
    const [name2, setName2] = React.useState('');
    const [name3, setName3] = React.useState('');
    const [name4, setName4] = React.useState('');
    const [b64dataImages, setB64dataImages] = useState([]);
    const classes = useStyles();
    const [serviceDetails, setServiceDetails] = useState([]);

    const handleChange = event => {
        setName(event.target.value);
    };
    const handleChange2 = event => {
        setName2(event.target.value);
    };
    const handleChange3 = event => {
        setName3(event.target.value);
    };
    const handleChange4 = event => {
        setName4(event.target.value);
    }


    const passImageData = (base64dataImage) => {
        b64dataImages.push(base64dataImage);
        setB64dataImages(b64dataImages);
        console.log('from parent: ', b64dataImages);
    }
    const saveSportLocationToDB = async () => {

        if (
            name.length === 0 ||
            name2.length === 0 ||
            name3.length === 0 ||
            name4.length === 0
        ) {
            alert('all fields are required!');
            return;
        }

        const title = name;
        const sport = name2.toLowerCase();
        const location = name3.split(',')[0];
        const district = parseInt(name3.split(',')[1].trim().split(' ')[1]);
        const address = name3.split(',')[2].toLowerCase();
        const inventoryArr = name4.split(';');
        let inventory = [];


        // put up inventory array data
        inventoryArr.map((item, index) => {
            if (index === inventoryArr.length - 1) return;
            let temp = item.split(',');
            let title = temp[0].split(':');
            let value = temp[1].split(':');

            inventory.push({ title: title[1].trim(), value: value[1].trim() })
        });

        // put up sportOpts data 
        const sportOpts = [];
        let serviceDetails = JSON.parse(localStorage.getItem('serviceDetails'));
        console.log('service details ', serviceDetails);
        serviceDetails.map((item) => {
            let text = item.text;
            console.log('splitted ', text.split('/'));
            const serviceOption = text.split('/')[0].trim() + ', ' + text.split('/')[2].trim();
            const availableHours = text.split('/')[1].split(',').map((time) => time.trim());
            sportOpts.push({ serviceOption, availableHours });
        });

        const data = {
            title,
            sport,
            location,
            district,
            address,
            sportOptions: sportOpts,
            base64dataImages: b64dataImages,
            inventory
        }
        console.log('BEFORE SAVE, DATA IS ', data);
        await axios.post(`${backend_addr}api/v1/sportLocations/`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('serviceDetails');
        window.location.reload();
    }


    return (
        <Fragment>
            <div className='as-form-component-container'>
                <div>
                    <form id='form-add-sport-c' style={formStyles} className={classes.root} noValidate autoComplete="off">
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Title</InputLabel>
                            <OutlinedInput className='outlined-input' style={outlinedInputStyles} id="component-outlined" value={name} onChange={handleChange} label="Title" />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Sport type</InputLabel>
                            <OutlinedInput className='outlined-input' style={outlinedInputStyles} id="component-outlined2" value={name2} onChange={handleChange2} label="Sport type" />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel style={inputLabelStyles} htmlFor="component-outlined">Location</InputLabel>
                            <OutlinedInput className='outlined-input' style={outlinedInputStyles} id="component-outlined3" value={name3} onChange={handleChange3} placeholder="Lname, Sector X, Addr" label="Location" />
                        </FormControl>
                        <TextareaAutosize
                            rowsMin={5}
                            rowsMax={10}
                            placeholder='Inventory Information, FORMAT: title: titleValue, value: actualValue; - repeat '
                            aria-label="maximum height"
                            style={textareastyles}
                            onChange={handleChange4}
                            className='textarea-classname'
                        />
                    </form>

                    <div className='service-containrr'>
                        <div>
                            <ServiceDetails items={serviceDetails} />
                        </div>
                    </div>
                </div>
                <div className='upload-imgs-container'>

                    <UploadImages passImageData={passImageData} />
                </div>
                <div onClick={saveSportLocationToDB} className='as-save-btn'>Save</div>

            </div>
        </Fragment>
    );
}

