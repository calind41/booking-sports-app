import React, { useState, useEffect } from 'react'
import './SidebarCategory.css';

import Checkbox from '@material-ui/core/Checkbox';

export default function SidebarCategory({ updateChecked, listItems, type }) {



    let temp = new Array(listItems.length);
    for (let i = 0; i < listItems.length; i++) {
        temp[i] = false;
    }
    const [checked, setChecked] = React.useState(temp);




    const handleChange = (index, item) => {
        let temp = [...checked];
        temp[index] = !temp[index];
        setChecked(temp);
        updateChecked(type, item);
    };

    return (
        <div className='category'>
            <h3>{type}</h3>
            <ul>
                {
                    listItems.map((item, index) => {
                        return <li>
                            <Checkbox
                                checked={checked[index]}
                                onChange={() => handleChange(index, item)}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <span>{item}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    )

}
