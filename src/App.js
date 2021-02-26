import React from 'react';
import cn from 'classnames';

import s from './App.modules.scss';
import './custom.css';

import Img from './RocketTrio.png'

const App = () => {
    return (
        <div>
            <div className={cn(s.header, 'color')}>
                React game!
            </div>
            <img src={Img} alt="Img" />
        </div>
    )
}

export default App;