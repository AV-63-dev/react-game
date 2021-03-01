import React from 'react';
import s from './Shot.modules.scss';

const Shot = props => {
    const { left, top } = props.position;
    const position = {
        left: left,
        top: top,
    }
    return (
        <div className={s.Shot} style={position}></div>
    )
}

export default Shot;