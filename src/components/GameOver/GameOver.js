import React from 'react';
import s from './GameOver.modules.scss';

const GameOver = props => {
    const { left, top } = props.position;
    const position = {
        left: left,
        top: top,
    };
    
    return (
        <p className={s.GameOver} style={position}>
            {props.children}
        </p>
    )
}

export default GameOver;