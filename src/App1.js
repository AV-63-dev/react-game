import React, { useState, useEffect, useMemo } from 'react';

import { startRun, stopRun} from './utils';
import useSound from 'use-sound';


//import Tank from './components/Tank/Tank';

import mp3 from './sound/assets/tank.mp3';

function App() {
    //const [ArrowUp, setArrowUp] = useState(false);
    //const [ArrowDown, setArrowDown] = useState(false);

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false,
    };
    
    let DDD = false;

    const [play, { stop }] = useSound(mp3);
    //play();
    //useEffect(() => {console.log('key'); }, [DDD]);

    //let playOn = false;
    
    useEffect(() => {
        document.addEventListener('keydown', event => {startRun(event, keys)});
        document.addEventListener('keyup', event => stopRun(event, keys));
        startGame();
        
        
        return () => {
            document.addEventListener('keydown', event => startRun(event, keys));
            document.addEventListener('keyup', event => stopRun(event, keys));
        };        
    }, []);
    
    const startGame = () => {
        if (!DDD) {
            play();
            DDD = !DDD;
        }
        // if (keys.ArrowUp || keys.ArrowDown || keys.ArrowLeft || keys.ArrowRight) {
        //     DDD = 2;
        //     console.log(DDD);
        // } else {
        //     DDD = 1;
        //     console.log(DDD);
        // }

        console.log('Animation');
        requestAnimationFrame(startGame);
    }

    console.log('render');
    
    return (        
        <button>TANK</button>
    );
}

export default App;