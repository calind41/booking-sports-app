import React, { useState } from 'react';
import './ImageSlider.css';
import ImageComponent from './ImageComponent';
import i1 from './i1.jpg'
import i2 from './i2.jpg'

export default function ImageSlider({ images, width, height }) {

    let sliderArr = [<ImageComponent src={i1} />, <ImageComponent src={i2} />];
    const [x, setX] = useState(0);

    const goLeft = () => {
        (x === 0) ? setX(-100 * (images.length - 1)) : setX(x + 100);
    }
    const goRight = () => {

        (x === -100 * (images.length - 1)) ? setX(0) : setX(x - 100);

    }
    const styleObj = {
        'width': `${width}`,
        'height': `${height}`
    }

    // import dynamically the images ?
    let imgs = require.context('../../../../../../server', true);
    let imageArr = [];
    images.map((image) => {
        let im = imgs('' + image);
        imageArr.push(im)
    });
    console.log(images);

    return (
        // if width and height are passed as props 
        <div style={styleObj} className='slider'>
            {
                imageArr.map((item, index) => {
                    return (
                        <div key={index} className='slide' style={{ transform: `translateX(${x}%)` }}>
                            <ImageComponent src={item} />
                        </div>
                    )
                })
            }
            <button id='goLeft' onClick={goLeft}><i class="material-icons">
                keyboard_arrow_left
</i></button>
            <button id='goRight' onClick={goRight}><i class="material-icons">
                keyboard_arrow_right
</i></button>
        </div>
    )
}
