import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
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
    position: 'absolute',
    top: '10.6vh',
    left: '18.4vw',
    width: '30vw',
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
}
const outlinedInputStyles = {
    width: '30vw',
    height: '6vh',
    backgroundColor: 'white',
    fontSize: '14px'

}


export default function UpdateFormComponent({ sportLoc }) {


    useEffect(() => {
        return () => {
            localStorage.removeItem('serviceDetails');
            localStorage.removeItem('title');
            localStorage.removeItem('sportType');
            localStorage.removeItem('inventory');
            localStorage.removeItem('location');
            localStorage.removeItem('sportOpts');
            localStorage.removeItem('images');
            localStorage.removeItem('oldImages');
        }
    }, [])

    const history = useHistory();
    console.log('here ', sportLoc);

    if (localStorage.getItem('title') === null) {
        localStorage.setItem('title', sportLoc.title);
    }
    if (localStorage.getItem('sportType') === null) {
        localStorage.setItem('sportType', sportLoc.sport);
    }
    if (localStorage.getItem('location') === null) {
        localStorage.setItem('location', sportLoc.location + ', Sector ' + sportLoc.district + ', ' + sportLoc.address);
    }
    if (localStorage.getItem('inventory') === null) {
        let temp = sportLoc.inventory.map((item) => `title: ${item.title}, value: ${item.value}; `);
        let s = '';
        temp.map((item) => s += `${item}\n`)

        localStorage.setItem('inventory', s);
    }


    const [name, setName] = React.useState(localStorage.getItem('title'));
    const [name2, setName2] = React.useState(localStorage.getItem('sportType'));
    const [name3, setName3] = React.useState(localStorage.getItem('location'));
    const [b64dataImages, setB64dataImages] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState(localStorage.getItem('inventory'));
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



    if (localStorage.getItem('sportOpts') === null) {
        localStorage.setItem('sportOpts', JSON.stringify(sportLoc.sportOpts));
    }
    let items = [];
    JSON.parse(localStorage.getItem('sportOpts')).map((sportOption, index) => {
        let text = '' + sportOption.serviceOption.split(',')[0] + ' / ';
        sportOption.availableHours.map((hour, idx) => {
            if (idx === 0)
                text += `${hour}`
            else
                text += `, ${hour}`
        });
        text += ' / ' + sportOption.serviceOption.split(',')[1];
        let item = {
            text,
            key: Date.now() + index * Math.random(0, 100)
        }
        items.push(item);
    })
    localStorage.setItem('serviceDetails', JSON.stringify(items));

    if (localStorage.getItem('images') === null) {
        let imgs = require.context('../../../../../../server', true)
        let temp = [];
        sportLoc.images.map((image) => {
            let im = imgs('' + image);
            let obj = {
                src: im,
                thumbnail: im,
                thumbnailWidth: 320,
                thumbnailHeight: 200,
                originalSrc: image
            }
            temp.push(obj);
        })
        console.log('temp is ', temp);
        // console.log(' final , ', sport.images);
        localStorage.setItem('images', JSON.stringify(temp));
    }

    const passImageData = (base64dataImage) => {
        b64dataImages.push(base64dataImage);
        setB64dataImages(b64dataImages);
        console.log('from parent: ', b64dataImages);
    }

    const updateSportLocationToDB = async () => {
        if (
            name.length === 0 ||
            name2.length === 0 ||
            name3.length === 0 ||
            textAreaValue.length === 0
        ) {
            alert('all fields are required!');
            return;
        }

        const title = name;
        const sport = name2.toLowerCase();
        const location = name3.split(',')[0];
        const district = parseInt(name3.split(',')[1].trim().split(' ')[1]);
        const address = name3.split(',')[2].toLowerCase();
        const inventoryArr = textAreaValue.split(';');
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

        // get the old image urls after deleting or not some of them
        let oldImages = [];
        if (localStorage.getItem('oldImages') === null) {
            oldImages = JSON.parse(localStorage.getItem('images')).map((item) => item.originalSrc);
        } else {
            oldImages = JSON.parse(localStorage.getItem('oldImages')).map((item) => item.originalSrc);
        }
        const data = {
            title,
            sport,
            location,
            district,
            address,
            sportOptions: sportOpts,
            oldImages,
            base64dataImages: b64dataImages,
            inventory
        }
        console.log('before update ', sportLoc._id);
        await axios.put(`http://localhost:5000/api/v1/sportLocations/${sportLoc._id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        localStorage.removeItem('serviceDetails');
        localStorage.removeItem('title');
        localStorage.removeItem('sportType');
        localStorage.removeItem('inventory');
        localStorage.removeItem('location');
        localStorage.removeItem('sportOpts');
        localStorage.removeItem('images');
        localStorage.removeItem('oldImages');
        history.push('/adminSports');
    }

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
                        <div className='update-service-container'>
                            <ServiceDetails addBtnClass='update-component-add-service' items={items} />
                        </div>
                    </div>
                </div>
                <div className='update-upload-imgs-container'>
                    <UploadImages passImageData={passImageData} />
                </div>
                <div id='g-gallery'>
                    <GridGallery images={JSON.parse(localStorage.getItem('images'))} />
                </div>
                <div onClick={updateSportLocationToDB} className='us-save-btn'>Update</div>

            </div>
        </Fragment>
    );
}

