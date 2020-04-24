import React, { useState } from 'react'
import './SidebarCategory.css';

import Checkbox from '@material-ui/core/Checkbox';

export default function SidebarCategory({ listItems, type }) {

    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [checked5, setChecked5] = React.useState(false);

    const handleChange = event => {
        console.log(event.target);
        setChecked(event.target.checked);
    };
    const handleChange2 = event => {
        console.log(event.target);
        setChecked2(event.target.checked);
    };
    const handleChange3 = event => {
        console.log(event.target);
        setChecked3(event.target.checked);
    };
    const handleChange4 = event => {
        console.log(event.target);
        setChecked4(event.target.checked);
    };
    const handleChange5 = event => {
        console.log(event.target);
        setChecked5(event.target.checked);
    };

    return (
        <div className='category'>
            <h3>{type}</h3>
            <ul>
                <li>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>{listItems[0]}</span>
                </li>
                <li>
                    <Checkbox
                        checked={checked2}
                        onChange={handleChange2}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>{listItems[1]}</span>

                </li>
                <li>
                    <Checkbox
                        checked={checked3}
                        onChange={handleChange3}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <span>{listItems[2]}</span>
                </li>

                <li>
                    {listItems.length > 3 ? (<Checkbox
                        checked={checked4}
                        onChange={handleChange4}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />) : null}
                    <span>{listItems[3]}</span>
                </li>
                <li>
                    {listItems.length > 3 ? (<Checkbox
                        checked={checked5}
                        onChange={handleChange5}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />) : null}
                    <span>{listItems[4]}</span>
                </li>
            </ul>
        </div>
    )

}
