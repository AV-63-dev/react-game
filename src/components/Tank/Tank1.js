import React, { Component } from 'react';

import mp3 from './assets/tank.mp3';

import s from './Tank.modules.scss';

class Tank extends Component {
    constructor(props) {
        super(props);
        
        this.tank = new Audio(mp3);
    }

    rotate(rotate) {
        switch (rotate) {
            case 'left':
                return 'rotate(-90deg)';
            case 'top':
                return 'rotate(0)';
            case 'right':
                return 'rotate(90deg)';
            case 'bottom':
                return 'rotate(180deg)';
        }
    }

    componentDidMount() {
        this.tank.pause();
    }

    componentWillUnmount() {
        this.tank.pause();
    }

    render() {
        const position = {
            left: this.props.position.left,
            top: this.props.position.top,
            transform: this.rotate(this.props.position.vector),
        };
        this.tank.play();
        return (
            <div className={s.Tank} style={position}></div>
        )
    }
}

export default Tank;