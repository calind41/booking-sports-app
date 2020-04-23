import React from 'react'
import './FrequentQuestion.css'

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';


export default function FrequentQuestion() {


    const [checked, setChecked] = React.useState(false);

    const handleChange = event => {
        setChecked(event.target.checked);
    };

    return (
        <div className='frequenct-q-container'>
            <div>
                <div>Q1</div>
                <div>Question text</div>
            </div>
            <div>
                <div>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <div>View Answer</div>
            </div>
        </div>
    )
}
