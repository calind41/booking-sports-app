import React, { Component, useState, useEffect } from 'react'
import './Sidebar.css';
import SidebarCategory from './SidebarCategory/SidebarCategory';

export default function Sidebar({ styles, passParams, facilities, surface, type }) {

    let [f, setF] = useState([]);
    let [s, setS] = useState([]);
    let [t, setT] = useState([]);
    const [clear, setClear] = useState(false);

    const updateChecked = (type, item) => {
        console.log('in update');
        console.log('type ', type);
        console.log('item ', item);

        switch (type) {
            case 'Facilities':
                if (!f.includes(item)) {
                    let temp = [...f];
                    temp.push(item);
                    setF(temp);
                } else {
                    let idx = f.indexOf(item);
                    let temp = [...f];
                    temp.splice(idx, 1);
                    setF(temp);
                }
                break;
            case 'Surface':
                if (!s.includes(item)) {
                    let temp = [...s];
                    temp.push(item);
                    setS(temp);
                } else {
                    let idx = s.indexOf(item);
                    let temp = [...s];
                    temp.splice(idx, 1);
                    setS(temp);
                }
                break;
            case 'Type':
                if (!t.includes(item)) {
                    let temp = [...t];
                    temp.push(item);
                    setT(temp);
                } else {
                    let idx = t.indexOf(item);
                    let temp = [...t];
                    temp.splice(idx, 1);
                    setT(temp);
                }
                break;
        }

    }


    const handleApply = () => {
        passParams(f, s, t);

    }
    const handleClear = () => {
        window.location.reload()
    }

    facilities = facilities.map((item) => { return item.split(' ') }).flat();
    facilities = facilities.filter((v, i) => facilities.indexOf(v) === i);
    console.log('facilities ', facilities);
    return (
        <div style={styles} className='sidebar-container'>
            <SidebarCategory updateChecked={updateChecked} listItems={facilities} type="Facilities" />
            <SidebarCategory updateChecked={updateChecked} listItems={surface} type="Surface" />
            <SidebarCategory updateChecked={updateChecked} listItems={type} type='Type' />
            <div className='sidebar-btns'>
                <button onClick={handleApply}>Apply</button>
                <button onClick={handleClear}>Clear</button>
            </div>

        </div>
    )
}
