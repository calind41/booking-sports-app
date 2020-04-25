import React from 'react'
import './ServiceCard.css'

import Checkbox from '@material-ui/core/Checkbox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

export default function ServiceCard({ text, bgColor, p1Color, p2Color, checkboxColor }) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = event => {
        setChecked(event.target.checked);
    };

    let color = checkboxColor != null ? checkboxColor : null;

    const stringArr = text.split(',');

    return (
        <div style={{ 'backgroundColor': `${bgColor}` }} className='servicecard-container'>
            <div className='check-container'>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleChecked />}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    style={{ color: color }}
                />
            </div>
            <div className='details'>
                <p style={{ 'color': `${p1Color}` }} className='p1'>{stringArr[0]}</p>
                <p style={{ 'color': `${p2Color}` }} className='price'>{stringArr[1]}</p>
            </div>
        </div>
    );
}