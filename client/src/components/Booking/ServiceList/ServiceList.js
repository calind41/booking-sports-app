import React, { useState, Fragment } from 'react'
import './ServiceList.css'
import ServiceCard from './ServiceCard/ServiceCard'

export default function ServiceList({ sportOpts, handleClickServiceOption }) {

    const [selectedCard, setSelectedCard] = useState(0);

    const handleSelectOption = (index) => {
        setSelectedCard(index);
        handleClickServiceOption(index);
    }

    return (
        <div className='service-list-container'>
            <div>Select a Service</div>
            <div className='service-list'>
                {
                    sportOpts.map((s, index) => {
                        return index === selectedCard ?
                            <div><ServiceCard handleSelectOption={handleSelectOption} checkedValue={true} index={index} text={s.serviceOption} bgColor='#F98442' p1Color='white' p2Color='black' checkboxColor='white' /> </div>
                            :
                            <div> <ServiceCard handleSelectOption={handleSelectOption} checkedValue={false} index={index} text={s.serviceOption} /></div>
                    })
                }
            </div>
        </div>
    )

}
