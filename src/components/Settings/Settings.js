import React from 'react';
import s from './Settings.modules.scss';



const Settings = props => {
    const { menuGameFu } = props;
            
    return (
        <dif className={s.bg}>
            <div className={s.modal}>

                

                <button className={s.btn} onClick={menuGameFu}>CONTINUE</button>
            </div>
        </dif>
    )
};

export default Settings;