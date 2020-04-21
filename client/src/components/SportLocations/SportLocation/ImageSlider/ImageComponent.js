import React from 'react'

export default function ImageComponent({ src }) {
    let imgStyles = {
        width: '100%',
        maxHeight: '100%',
        objectFit: 'cover'
    }
    return (
        <img src={src} alt='slide-img' style={imgStyles}>
        </img>
    )
}

