// import React from "react";
// import { GameEngine } from "react-game-engine";
// import Box from '../entities/box'
// import Square from '../entities/square'

import * as Utils from '../utils/utils'
import {Player, Leave, Flower, Score} from '../entities';
// import Leave from '../entities/leave'
// import Player from '../entities/player'
// import PlayerWrapper from '../entities/playerwrapper'
// import Score from '../entities/score'
// import Flower from "../entities/flower";
import {CurrentState, GameConfig} from "../index";

const isColliding = (p1, p2) => {
    return ((Math.abs(p1.x - p2.x) * 2) < (p1.width + p2.width)) &&
        ((Math.abs(p1.y - p2.y) * 2) < (p1.height + p2.height));
}

const collision = (entities, {input, dispatch}) => {
    const score = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && e.renderer.type === Score ) {
            return true;
        }
        return false;
    })
    const player = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && e.renderer.type === Player ) {
            return true;
        }
        return false;
    })
    // const playerwrapper = Utils.all(entities, e => {
    //     if ( e.renderer && e.renderer.type && e.renderer.type === PlayerWrapper ) {
    //         return true;
    //     }
    //     return false;
    // })
    const leaves = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && e.renderer.type === Leave ) {
            return true;
        }
        return false;
    })
    const flowers = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && e.renderer.type === Flower ) {
            return true;
        }
        return false;
    })
    let playSoundLeave = false;
    let playSoundFlower = false;
    leaves.forEach(leave => {
        leave.respawn = isColliding(leave, player[0]);
        if ( leave.respawn ) {
            playSoundLeave = true;
            // console.log('colliding with leave!');
            score.forEach( s => {
                s.score += GameConfig.scorePerLeave;
            });
            CurrentState.currentScore += GameConfig.scorePerLeave;
        }
    })
    flowers.forEach(flower => {
        flower.respawn = isColliding(flower, player[0]);
        if ( flower.respawn ) {
            // console.log('colliding with flower');
            playSoundFlower = true;
            score.forEach( s => {
                s.score += GameConfig.scorePerFlower;
            });
            CurrentState.currentScore += GameConfig.scorePerFlower;
        }
    })
    // console.log('collision currentScore: ' + CurrentState.currentScore);
    if ( playSoundLeave ) {
        dispatch({type: 'play-sound-flower'});
    }
    if ( playSoundFlower ) {
        dispatch({type: 'play-sound-flower'});
    }

    // // console.log('mouse func');
    // // // console.log(entities);
    // // if ( input.length > 0 ) {
    // //     console.log('input:' + JSON.stringify(input));
    // // }
    // const onMouseDown = input.find(x => x.name === 'onMouseDown') || {};
    // const onMouseMove = input.find(x => x.name === 'onMouseMove') || {};
    // const onDrag = input.find(x => x.name === 'onDrag') || {};
    // if ( onMouseDown && onMouseDown.payload ) {
    //     // onMouseDown.payload.defaultPrevented = true;
    //     onMouseDown.payload.nativeEvent.preventDefault();
    //     console.log('onMouseDown: ');
    //     // console.log(onMouseDown);
    //     console.log(onMouseDown.payload._targetInst.return.key); // box1
    //     if ( onMouseDown.payload._targetInst.return.elementType === Box ) {
    //         console.log('equals Box');
    //     }
    //     if ( onMouseDown.payload._targetInst.return.elementType === Square ) {
    //         console.log('equals Square');
    //     }
    //     console.log(onMouseDown.payload._targetInst.return.elementType);
    // }
    // if ( onMouseMove && onMouseMove.payload ) {
    //     // console.log('onMouseMove: ');
    //     // console.log(onMouseMove.payload);
    //     if ( onMouseMove.payload._targetInst.return.elementType === Box ) {
    //         console.log('moving box');
    //         // console.log(onMouseMove.payload);
    //         const {box1} = entities;
    //         if ( box1 ) {
    //             box1.x = onMouseMove.payload.pageX;
    //             box1.y = onMouseMove.payload.pageY;
    //         }
    //     }
    // }
    // if ( onDrag && onDrag.payload) {
    //     console.log('onDrag: ');
    //     // onDrag.payload.defaultPrevented = true;
    //     // onDrag.payload.nativeEvent.preventDefault(); // useless
    //     // onDrag.payload.nativeEvent.stopPropagation(); // useless
    //     // console.log(entities);
    //     const {box1} = entities;
    //     if ( box1 ) {
    //         box1.x = onDrag.payload.pageX;
    //         box1.y = onDrag.payload.pageY;
    //     }
    //     console.log(onDrag.payload);
    // }
    return entities;
}

export default collision;
