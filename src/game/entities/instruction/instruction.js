import React, { PureComponent } from "react";
import '../../../assets/css/game.css';
import {Const, CurrentState, STATE_MACHINE} from "../../index";
import axios from 'axios'
import GameConfig from "../../gameconfig";

class Instruction extends PureComponent {

    goToCountDown = () =>
    {
        var h;
        let u = GameConfig.puri + "api/getkey";
        // const qs = require('querystring');
        axios
            .post(u)
            .then(resp => 
            {
                h = resp.data.data;
                CurrentState.gamekey = h;
                // console.log(resp);
                console.log("after get key: " + CurrentState.gamekey);
            });
        // console.log("key: " + CurrentState.gamekey);

        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.COUNTDOWN});
    }

    render() {

        return (
            <div className="row">
                <div className="game-container">
                    <div className="instruction-container">
                        <img className="imgbottle" src={require('../../../assets/game/bottle2.png')} alt="" />
                        <img className="imgpoint" src={require('../../../assets/game/points.png')} alt="" />
                        
                        {/* <img className="imginstruction" src={require("../../../assets/game/instruction2.png")} alt="" /> */}
                        <div  className="imginstruction"></div>
                        <div className="vseparator"></div>
                        <div className="txtinstruction">
                            Fill The Bottle With and collect as many <span className="myellow">jasmine flowers</span> and <span className="mgreen">tea leaves</span> as possible in 45 seconds.
                        </div>
                    </div>
                </div>
                <div className="btnstartcontainer" id="btnPlay">
                    <img src={require('../../../assets/game/Asset13.png')}  alt="" className="game_btn mx-auto mt-5" id="play_btn" onClick={this.goToCountDown} />
                </div>
            </div>
        );
    }
}

export default Instruction;