import React from "react";
import * as Utils from '../utils/utils'
import GameUtil from "../utils/gameutil";
import {GameConfig, CurrentState, Const, STATE_MACHINE} from '../index';
// import Leave from '../entities/leave'
// import Flower from '../entities/flower'

const initCountdown = () => {
    // console.log('changeState.initCountdown');
}

const initPlaying = () => {
    // console.log('changeState.initPlaying');
}

const initFinished = () => {
    // console.log('changeState.initFinished');
}

const changeState = (entities, {input, events, time}) => {

    events.forEach( ev => {
        if ( ev.type === 'change-state' ) {
            const nextState = Utils.getParamSafely(ev, 'nextState');
            if ( nextState === STATE_MACHINE.COUNTDOWN ) {
                initCountdown();
            } else if ( nextState === STATE_MACHINE.PLAYING ) {
                initPlaying();
            } else if ( nextState === STATE_MACHINE.FINISHED ) {
                initFinished();
            }
        }
    });
    return entities;
}

export default changeState;
