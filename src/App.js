import React, { Component }  from 'react';
import { controlerPositionTank, startPositionShell, controlerPositionShell } from './utils';

import mp3tank from './sound/tank2.mp3';
import mp3shot from './sound/shot2.mp3';


import Tank from './components/Tank/Tank';
import Shot from './components/Shot/Shot';



class App extends Component {
    constructor(props) {
        super(props);

        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,
            Space: false,
        };

        this.state = {
            positionTank: {
                left: 200,
                top: 500,
                vector: 'top',
            },
            shot: [],
        };

        this.start = true;
        this.speedTank = 3;
        this.gameArena;
        this.speedShot = 8;
        this.timeShot = true;
        this.speedTimeShot = 300;
        

        this.startRun = this.startRun.bind(this);
        this.stopRun = this.stopRun.bind(this);
        this.startGame = this.startGame.bind(this);

        this.soundTank = new Audio(mp3tank);
        this.soundShot = new Audio(mp3shot);

    }

    startRun(event) {
        event.preventDefault();
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Space'].includes(event.code)) {
            this.keys[event.code] = true;
            console.log(this.keys);
        }
    }    
    stopRun(event) {
        event.preventDefault();
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Space'].includes(event.code)) {
            this.keys[event.code] = false;
            console.log(this.keys);
        }
    }


    startGame() {
        if (this.keys.ArrowUp || this.keys.ArrowDown || this.keys.ArrowLeft || this.keys.ArrowRight) {
            this.setState({
                positionTank: controlerPositionTank(this.keys, this.state.positionTank, this.speedTank, this.gameArena)
            });
            this.soundTank.play();
        } else {
            this.soundTank.pause();
        }

        if (this.keys.Space && this.timeShot) {
            const positionShell = startPositionShell(this.state.positionTank, this.gameArena);
            if (positionShell) {
                this.timeShot = false;
                this.soundShot.currentTime = 0;
                this.soundShot.play();
                setTimeout(() => this.soundShot.pause(), (this.speedTimeShot - 10));
                setTimeout(() => this.timeShot = true, this.speedTimeShot);
                const shot = this.state.shot.concat();
                shot.push(positionShell)
                this.setState({ shot: shot });
            };
        };
        const shot = this.state.shot.concat().map(item => controlerPositionShell(item, this.speedShot, this.gameArena)).filter(item => item);
        this.setState({ shot: shot });
        requestAnimationFrame(this.startGame);
    }

    render() {      
        console.log('render');
        const shots = this.state.shot.map((item, index) => (
            <Shot position={item} key={index}/>
        ));

        return (
            <React.Fragment>
                <Tank position={this.state.positionTank}/>
                { shots }
            </React.Fragment>
        )
    }

    componentDidMount() {
        document.addEventListener('keydown',this.startRun);
        document.addEventListener('keyup', this.stopRun);
        this.gameArena = document.body.getBoundingClientRect();
        this.startGame();
    }
}

export default App;