// import React from "react";
// import * as Utils from '../utils/utils'
// import GameUtil from "../utils/gameutil";
// import {GameConfig, CurrentState, Const, STATE_MACHINE} from '../index';
import * as Utils from "../utils/utils";
import {Const, STATE_MACHINE} from "../../game/index";
import { CountdownTimer, Countdown321, Score} from "../entities";

const CountdownSystem = (entities, {input, events, dispatch, time}) => {
    const timers = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && (e.renderer.type === CountdownTimer 
                                            || e.renderer.type === Countdown321
                                            || e.renderer.type === Score) ) 
        
        {
            return true;
        }
        return false;
    });
    timers.forEach( t => {
        // console.log('countdownSystem timer.currentTick: ' + t.currentTick + ' delta: ' + time.delta);
        window.resizeTo(window.screen.availHeight, window.screen.availHeight);
        if (window.outerWidth < 360 || window.outerHeight < 480 || window.innerWidth < 360 || window.innerHeight < 460)
        {
            Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
        }
        if ( t.currentTick >= 0 ) {
            t.currentTick -= time.delta;
            if ( t.currentTick <= 0 ) {
                t.currentTick = 0;
                if ( t.onFinished ) {
                    t.onFinished();
                }
            }
        }
    });
    // console.log(time);
    // const {timer} = entities;
    // if ( timer ) {
    //     // console.log("currentTime: " + CurrentState.currentTime);
    //     CurrentState.currentTime += time.delta;
    //     timer.currentTime = CurrentState.currentTime;
    //     if ( CurrentState.currentTime >= (GameConfig.gameDuration*1000) ) {
    //         dispatch({type: 'change-state', nextState: STATE_MACHINE.FINISHED});
    //     }
    // }
    return entities;
}

export default CountdownSystem;
