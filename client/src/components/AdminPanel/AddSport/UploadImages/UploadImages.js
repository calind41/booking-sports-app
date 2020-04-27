import React from 'react'
import './UploadImages.css'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'

export default function UploadImages() {

    const base64dataImages = [];

    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var base64data = reader.result;
            base64dataImages.push(base64data);
        }
        return { url: 'https://httpbin.org/post' }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        axios.post('http://localhost:5000/upload', { base64dataImages })
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
