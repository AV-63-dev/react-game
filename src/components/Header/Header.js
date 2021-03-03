import React from 'react';
import s from './Header.modules.scss';

import tank from './../Tank/assets/player.png';
import enemy from './../Enemy/assets/enemy.png';

const Header = props => {
    const { hp, counter, function: { playGameFu, pauseGameFu, menuGameFu }, btn: { start, menu, pause} } = props;
    let health, width;
    switch (hp) {
        case 4:
            health = s.normal;
            width = { width: '100%' };
            break;
        case 3:
            health = s.normal;
            width = { width: '75%' };
            break;
        case 2:
            health = s.low;
            width = { width: '50%' };
            break;
        case 1:
            health = s.critical;
            width = { width: '25%' };
            break;
        case 0:
            health = s.critical;
            width = { width: '0' };
            break;
    };
    
    return (
        <header className={s.header}>
            <div className={s.player}>
                <img src={tank} alt="tank" />
                <div className={s.bar}>
                    <div className={health} style={width}></div>
                </div>
            </div>
            <div className={s.killed_opponents}>
                <img src={enemy} alt="tank" />
                <span>
                    {counter}
                </span>
            </div>
            <div className={s.nav}>
                { menu ? <button className={s.btn} onClick={menuGameFu}>MENU</button> : null}
                { pause ? <button className={s.btn} onClick={pauseGameFu}>PAUSE</button> : null}
                { start ? <button className={s.btn} onClick={playGameFu}>START</button> : null }
            </div>
        </header>
    )
};

export default Header;