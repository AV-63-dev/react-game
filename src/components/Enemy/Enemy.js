import React from 'react';
import s from './Enemy.modules.scss';

const Enemy = props => {
    const { left, top, vector } = props.position;
    let rotate;
    switch (vector) {
        case 'left':
            rotate = 'rotate(-90deg)';
            break;
        case 'top':
            rotate = 'rotate(0)';
            break;
        case 'right':
            rotate = 'rotate(90deg)';
            break;
        case 'bottom':
            rotate = 'rotate(180deg)';
            break;
    };
    const position = {
        left: left,
        top: top,
        transform: rotate,
    };
    
    return (
        <div className={s.Enemy} style={position}></div>
    )
}

export default Enemy;