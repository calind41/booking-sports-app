import React, { useState, useEffect, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './SearchContainer.css'
import Select from 'react-select';

const techCompanies = [
    { label: "All sectors", value: 0 },
    { label: "Sector 1", value: 1 },
    { label: "Sector 2", value: 2 },
    { label: "Sector 3", value: 3 },
    { label: "Sector 4", value: 4 },
    { label: "Sector 5", value: 5 },
    { label: 'Sector 6', value: 6 }
]

export default function SearchContainer({ selectedSport }) {


    const [selectedSector, setSelectedSector] = useState(-1);


    const handleSearchBtnClick = async () => {
        console.log('selected sport is ', selectedSport);
        console.log('selected sector is ', selectedSector);



    }
    const handleSelectChange = (selectedValue) => {
        setSelectedSector(selectedValue.value);
    }
    return (
        <Fragment>
            <div className='search-container'>
                <div className='city'>
                    <span>Bucharest</span>
                </div>
                <div className='vertical-line'></div>
                <div className='select-container'>

                    <Select
                        options={techCompanies}
                        styles={customStyles}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className='btn-container'>
                    <Link to={{ pathname: '/sportLocations', data: { selectedSport, selectedSector } }}>
                        <button onClick={handleSearchBtnClick}>
                            <i class="material-icons">
                                search
                            </i>

                            <span>Search</span>
                        </button>
                    </Link>

                </div>
            </div>
        </Fragment>
    )
}


const customStyles = {
    // menu: (provided, state) => ({
    //     ...provided,
    //     backgroundColor: 'transparent',
    //     color: 'white'
    // }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        backgroundColor: 'transparent',
        color: state.isSelected ? 'red' : 'blue',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}