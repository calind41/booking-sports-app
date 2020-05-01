import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Gallery from 'react-grid-gallery';
import CheckButton from './CheckButton';

import './GridGallery.css'

export default class GridGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.images,
            selectAllChecked: false
        };

        this.onSelectImage = this.onSelectImage.bind(this);
        this.getSelectedImages = this.getSelectedImages.bind(this);
        this.onClickSelectAll = this.onClickSelectAll.bind(this);
    }

    allImagesSelected(images) {
        var f = images.filter(
            function (img) {
                return img.isSelected == true;
            }
        );
        return f.length == images.length;
    }

    onSelectImage(index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });

        if (this.allImagesSelected(images)) {
            this.setState({
                selectAllChecked: true
            });
        }
        else {
            this.setState({
                selectAllChecked: false
            });
        }
    }


    getSelectedImages() {
        var selected = [];
        for (var i = 0; i < this.state.images.length; i++)
            if (this.state.images[i].isSelected == true)
                selected.push(i);
        return selected;
    }

    deleteSelectedImages() {
        const selected = this.getSelectedImages();
        console.log(selected);
        let result = this.state.images.filter((item, index) => !selected.includes(index))
        console.log(result);
        this.setState({ images: result });
        console.log('is called');
        localStorage.setItem('oldImages', JSON.stringify(result));
    }

    onClickSelectAll() {
        var selectAllChecked = !this.state.selectAllChecked;
        this.setState({
            selectAllChecked: selectAllChecked
        });

        var images = this.state.images.slice();
        if (selectAllChecked) {
            for (var i = 0; i < this.state.images.length; i++)
                images[i].isSelected = true;
        }
        else {
            for (var i = 0; i < this.state.images.length; i++)
                images[i].isSelected = false;

        }
        this.setState({
            images: images
        });
    }

    render() {
        return (<Fragment>
            <div className='gallery-wrapper'>
                <CheckButton
                    index={0}
                    isSelected={this.state.selectAllChecked}
                    onClick={this.onClickSelectAll}
                    parentHover={true}
                    color={"rgba(0,0,0,0.54)"}
                    selectedColor={"#4285f4"}
                    hoverColor={"rgba(0,0,0,0.54)"} />
                <div style={{
                    height: "36px",
                    display: "flex",
                    alignItems: "center"
                }}>
                    select all
                </div>
                <div style={{
                    padding: "2px",
                    color: "#666"
                }}>Selected images: {this.getSelectedImages().toString()}</div>
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"
                }}>
                    <Gallery
                        images={this.state.images}
                        onSelectImage={this.onSelectImage}
                        rowHeight={112}
                        showLightboxThumbnails={true} />
                </div>
            </div>
            <div onClick={() => this.deleteSelectedImages()} className='del-sel-imgs'>Delete</div>
        </Fragment>
        );
    }
}

GridGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool
        })
    ).isRequired
};

