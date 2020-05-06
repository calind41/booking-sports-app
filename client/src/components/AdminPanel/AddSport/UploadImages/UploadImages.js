import React from 'react'
import './UploadImages.css'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'

export default function UploadImages({ passImageData }) {

    let base64dataImages = [];

    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {
        console.log(file);
        console.log('meta name ----- ', meta.name);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var base64Data = reader.result;
            base64dataImages.push({ base64Data, name: meta.name });
            passImageData({ base64Data, name: meta.name })
        }

        return { url: 'https://httpbin.org/post' }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
        // title,
        // sport,
        // location,
        // sportOptions,
        // base64dataImages,
        // inventory
        const title = 'cool title55';
        const sport = 'basketball';
        const location = 'Bucharest';
        const sportOptions = [{
            serviceOption: 'optione uno',
            availableHours: ['09:00', '10:00', '12:00']
        }];
        const inventory = 'nice inventory bro!';
        const district = 5;

        const data = {
            title,
            sport,
            location,
            district,
            sportOptions,
            base64dataImages,
            inventory
        }

        // await axios.post('http://localhost:5000/api/v1/sportLocations/', data)
        base64dataImages = []
        allFiles.forEach(f => f.remove());
    }
    return (
        <Dropzone
            styles={classNames}
            inputContent='Click or Drag here images'
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/*"
        />
    )
}

const classNames = {
    dropzone: {
        width: "32.4vw",
        height: "89vh",
        overflowX: "auto",
        overflowY: "auto",
        backgroundColor: '#ffffff'
    },
    inputLabel: {
        fontSize: '16px'
    }
}
