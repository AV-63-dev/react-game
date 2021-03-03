import React, { Component } from 'react';
import s from './Settings.modules.scss';


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            effects: true,
            music: true,
        }

        this.menuGameFu = props.menuGameFu;
    }

    render() {
        return (
            <div className={s.bg}>
                <div className={s.modal}>
                    <div className={s.sound}>
                        <label className={s.switch}>
                            <input type="checkbox" checked={this.state.effects} onChange={() => this.setState({ effects: !this.state.effects })} />
                            <span className={s.slider}></span>
                            <span className={s.signature}>Effects</span>
                        </label>

                        <label className={s.switch}>
                            <input type="checkbox" checked={this.state.music} onChange={() => this.setState({ music: !this.state.music })} />
                            <span className={s.slider}></span>
                            <span className={s.signature}>Music</span>
                        </label>
                    </div>
                    <button className={s.btn} onClick={this.menuGameFu}>CONTINUE</button>
                </div>
            </div>
        )
    }
};

export default Settings;