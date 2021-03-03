import React from 'react';
import s from './Footer.modules.scss';

import tg from './assets/tg.jpg';
import git from './assets/git.jpg';
import rs from './assets/rs.jpg';
import yt from './assets/yt.jpg';

const Footer = () => (
    <footer className={s.footer}>        
        <div className={s.ikon}>
            <a href="https://t.me/joinchat/NZPjEeg4hH43N2Iy" target="_blank">
                <img src={tg} alt="telegram" />
            </a>
            <a href="https://github.com/AV-63-dev/react-game/" target="_blank">
                <img src={git} alt="git hub" />
            </a>
            <a href="https://community-z.com/events/react-rsschool-2021/" target="_blank">
                <img src={rs} alt="rs school" />
            </a>
            <a href="#" target="_blank">
                <img src={yt} alt="you tube" />
            </a>
        </div>
        <p className={s.text}>React Course · RS School 2021Q1 · Task 1</p>
    </footer>
);

export default Footer;