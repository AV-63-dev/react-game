import React from 'react';

// import useSound from 'use-sound';
// import mp3 from './assets/tank.mp3';

import s from './Tank.modules.scss';

const Tank = props => {
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
    }
    const position = {
        left: left,
        top: top,
        transform: rotate,
    }
    // const [play, { stop }] = useSound(mp3);
    // play();
    return (
        <div className={s.Tank} style={position}></div>
    )
}

export default Tank;