import React, { Component }  from 'react';

import { impact, generateId } from './utils';
import { controlerPositionTank } from './utils';
import { startPositionShell, controlerPositionShell } from './utils';
import { startPositionEnemies, controlerPositionEnemies, startPositionShellEnemies } from './utils';
import { randomGameOver } from './utils';

import './App.scss';

import mp3game from './sound/game.mp3';
import mp3tank from './sound/tank.mp3';
import mp3shot from './sound/shot.mp3';
import mp3deadEnemy from './sound/deadEnemy.mp3';
import mp3сollision from './sound/сollision.mp3';
import mp3damageTank from './sound/damageTank.mp3';
import mp3deadTank from './sound/deadTank.mp3';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Settings from './components/Settings/Settings';

import Tank from './components/Tank/Tank';
import Shot from './components/Shot/Shot';
import Enemy from './components/Enemy/Enemy';
import GameOver from './components/GameOver/GameOver';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            positionTank: {
                left: 225,
                top: 130,
                vector: 'top',
                id: generateId(),
            },
            shot: [],
            enemy: [],
            start: false,
            pause: false,
            menuModal: false,
        };

        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,
            Space: false,
        };

        this.counter = 0;
        this.life = 4;
        this.speedShot = 6;
        this.changeSpeedTimeEnemy = 100;
        this.gameArena;
        this.renderTank = false;
        this.renderBtnStart = true;
        this.renderBtnMenu = true;
        this.renderBtnPause = false;
        this.pause = false;
        this.menuModal = false;

        // эти настройки будем задавать из модалки + 2 флага на звук
        this.speedTank = 3; 
        this.speedTimeShotTank = 300;
        this.speedEnemy = 1;
        this.speedTimeShotEnemy = 500;
        this.maxQuantityEnemy = 3;       

        this.startRun = this.startRun.bind(this);
        this.stopRun = this.stopRun.bind(this);
        this.playGame = this.playGame.bind(this);
        this.startGame = this.startGame.bind(this);

        this.soundGame = new Audio(mp3game);
        this.soundTank = new Audio(mp3tank);
        this.soundShot = new Audio(mp3shot);
        this.soundDeadEnemy = new Audio(mp3deadEnemy);
        this.soundСollision = new Audio(mp3сollision);
        this.soundDamageTank = new Audio(mp3damageTank);
        this.soundDeadTank = new Audio(mp3deadTank);
    }

    startRun(event) {
        event.preventDefault();
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Space'].includes(event.code)) {
            this.keys[event.code] = true;
        }
    };
    stopRun(event) {
        event.preventDefault();
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Space'].includes(event.code)) {
            this.keys[event.code] = false;
        }
    };

    moveTank() {
        if (this.keys.ArrowUp || this.keys.ArrowDown || this.keys.ArrowLeft || this.keys.ArrowRight) {
            this.setState({
                positionTank: controlerPositionTank(this.keys, this.state.positionTank, this.speedTank, this.gameArena)
            });
            this.soundTank.play();
        } else {
            this.soundTank.pause();
        }
    };
    moveShot() {
        if (this.keys.Space && this.timeShotTank) {
            const positionShell = startPositionShell(this.state.positionTank, this.gameArena);
            if (positionShell) {
                this.timeShotTank = false;
                this.soundShot.currentTime = 0;
                this.soundShot.play();
                setTimeout(() => this.soundShot.pause(), (this.speedTimeShotTank - 10));
                setTimeout(() => this.timeShotTank = true, this.speedTimeShotTank);
                const shot = this.state.shot.concat();
                shot.push(positionShell)
                this.setState({ shot: shot });
            };
        };

        const shot = this.state.shot.concat().map(item => controlerPositionShell(item, this.speedShot, this.gameArena)).filter(item => item);
        this.setState({ shot: shot });
    };
    moveEnemy() {
        if (this.timeEnemy && this.state.enemy.length < this.maxQuantityEnemy) {
            const positionEnemy = startPositionEnemies(this.state.positionTank, this.state.enemy, this.gameArena);
            if (positionEnemy) {
                if (this.speedTimeEnemy > 500) {
                    this.speedTimeEnemy -= this.changeSpeedTimeEnemy;
                } else {
                    this.speedTimeEnemy = 500;
                }
                this.timeEnemy = false;
                setTimeout(() => this.timeEnemy = true, this.speedTimeEnemy);
                const enemy = this.state.enemy.concat();
                enemy.push(positionEnemy);
                this.setState({ enemy: enemy });
            };
        };

        if (this.state.enemy.length > 0) {
            const enemy = this.state.enemy.concat();
            const enemies = enemy.map(item => controlerPositionEnemies(this.state.positionTank, item, this.speedEnemy));
            this.setState({ enemy: enemies });
        };

        if (this.timeShotEnemy && this.state.enemy.length > 0) {
            const enemy = this.state.enemy.concat();            
            const enemyShot = enemy.map(item => startPositionShellEnemies(this.state.positionTank, item, this.gameArena)).filter(item => item);
            if (enemyShot.length > 0) {
                this.timeShotEnemy = false;
                setTimeout(() => this.timeShotEnemy = true, this.speedTimeShotEnemy);
                const shot = this.state.shot;
                this.setState({ shot: shot.concat(enemyShot) });
            };
        }
    };     

    damageEnemy() {
        const shot = this.state.shot.concat();
        const enemy = this.state.enemy.concat();
        let dead = false;
        for (let iEnemy = 0; iEnemy < enemy.length ; iEnemy++) {
            for (let iShot = 0; iShot < shot.length ; iShot++) {
                if (impact(enemy[iEnemy], shot[iShot], this.gameArena, 'tank', 'shot')) {
                    shot.splice(iShot, 1);
                    enemy.splice(iEnemy, 1);
                    dead = true;
                    this.counter++;
                    this.soundDeadEnemy.currentTime = 0;
                    this.soundDeadEnemy.play();
                    setTimeout(() => this.soundDeadEnemy.pause(), 300);
                    this.setState({ shot: shot, enemy: enemy });
                    break;
                }
            };
            if (dead) break;
        };
    };
    damageСollision() {
        const tank = this.state.positionTank;
        const enemy = this.state.enemy.concat();
        for (let iEnemy = 0; iEnemy < enemy.length ; iEnemy++) {
            if (impact(enemy[iEnemy], tank, this.gameArena)) {
                this.soundСollision.currentTime = 0;
                this.soundСollision.play();
                setTimeout(() => this.soundСollision.pause(), 800);
                enemy.splice(iEnemy, 1);
                this.life--;
                this.counter++;
                this.setState({ enemy: enemy });
                break;
            }
        };

        const enemies = this.state.enemy.concat();
        let dead = false;
        for (let iEnemy = 0; iEnemy < enemies.length - 1; iEnemy++) {
            if (enemies[iEnemy]) {
                for (let iEnemies = iEnemy + 1; iEnemies < enemies.length ; iEnemies++) {
                    if (enemies[iEnemies]) {
                        if (impact(enemies[iEnemy], enemies[iEnemies], this.gameArena)) {
                            this.soundСollision.currentTime = 0;
                            this.soundСollision.play();
                            setTimeout(() => this.soundСollision.pause(), 800);
                            enemies[iEnemy] = null;
                            enemies[iEnemies] = null;
                            dead = true;
                            this.counter++;
                            this.counter++;
                            break;
                        }
                    }
                };
            }
        };
        if (dead) this.setState({ enemy: enemies.filter(item => item) });

        const shot = this.state.shot.concat();
        let deadShot = false;
        for (let iShot = 0; iShot < shot.length - 1; iShot++) {
            if (shot[iShot]) {
                for (let iShell = iShot + 1; iShell < shot.length ; iShell++) {
                    if (shot[iShell]) {
                        if (impact(shot[iShot], shot[iShell], this.gameArena, 'shot', 'shot')) {
                            shot[iShot] = null;
                            shot[iShell] = null;
                            deadShot = true;
                            break;
                        }
                    }
                };
            }
        };
        if (deadShot) this.setState({ shot: shot.filter(item => item) });
    };
    damageTank() {
        const shot = this.state.shot.concat();
        for (let iShot = 0; iShot < shot.length ; iShot++) {
            if (impact(this.state.positionTank, shot[iShot], this.gameArena, 'tank', 'shot')) {
                shot.splice(iShot, 1);
                this.life--;
                this.soundDamageTank.currentTime = 0;
                this.soundDamageTank.play();
                setTimeout(() => this.soundDamageTank.pause(), 300);
                this.setState({ shot: shot });
                break;
            }
        };
    };

    playGame() {
        this.setState({ start: true, shot: [], enemy: [] });
        this.counter = 0;
        this.life = 4;
        this.timeShotTank = true;
        this.timeShotEnemy = true;
        this.timeEnemy = false;
        this.speedTimeEnemy = 3000;
        this.renderTank = true;
        this.renderBtnStart = false;
        this.renderBtnMenu = false;
        this.renderBtnPause = true;
        if (this.state.start) {
            this.startGame();
            setTimeout(() => this.timeEnemy = true, this.speedTimeEnemy);
            this.soundGame.currentTime = 0;
            this.soundGame.play();
            setTimeout(() => this.soundGame.pause(), 6000);
        } else {
            requestAnimationFrame(this.playGame);
        }
    }
    startGame() {
        if (!this.pause) {
            this.moveTank();
            this.moveEnemy();
            this.moveShot();
            this.damageEnemy();
            this.damageСollision();
            this.damageTank();

            if (this.life > 0) {
                requestAnimationFrame(this.startGame);
            } else {
                this.soundTank.pause();
                this.soundShot.pause();
                this.soundDeadEnemy.pause();
                this.soundСollision.pause();
                this.soundDamageTank.pause();
                this.soundDeadTank.play();
                setTimeout(() => this.soundDeadTank.pause(), 2000);
                this.renderBtnStart = true;
                this.renderBtnMenu = true;
                this.renderBtnPause = false;
                this.setState({ start: false });
            };
        };        
    }

    render() {
        const btn = {
            start: this.renderBtnStart,
            menu: this.renderBtnMenu,
            pause: this.renderBtnPause,
        }
        const fu = {
            playGameFu: this.playGame,
            pauseGameFu: () => { 
                this.pause = !this.pause;
                this.setState({ pause: this.pause });
                if (!this.pause) this.startGame();
            },
            menuGameFu: () => {
                this.menuModal = !this.menuModal;
                this.setState({ menuModal: this.menuModal });
            },
        }

        return (
            <React.Fragment>
                <Header hp={this.life} counter={this.counter} function={fu} btn={btn}/>
                <div className={'arena'} >
                    { !this.life ? <GameOver position={randomGameOver(this.state.positionTank, this.gameArena)}>GAME OVER</GameOver> : null }
                    { this.pause ? <GameOver position={randomGameOver(this.state.positionTank, this.gameArena)}>PAUSE</GameOver> : null }
                    { this.renderTank ? <Tank position={this.state.positionTank} life={this.life} key={this.state.positionTank.id}/> : null }
                    { this.state.shot.map(item => ( <Shot position={item} key={item.id}/> )) }
                    { this.state.enemy.map(item => ( <Enemy position={item} key={item.id}/> )) }                    
                </div>
                <Footer/>
                { this.menuModal ? <Settings menuGameFu={fu.menuGameFu} /> : null}
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.gameArena = document.querySelector('.arena').getBoundingClientRect();
        document.addEventListener('keydown',this.startRun);
        document.addEventListener('keyup', this.stopRun);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown',this.startRun);
        document.removeEventListener('keyup', this.stopRun);
    }

    // Это только если изменять размер окна браузера в процессе игры иначе - удали
    componentDidUpdate() {
        this.gameArena = document.querySelector('.arena').getBoundingClientRect();
    }
}

export default App;