// import React from "react";

// import * as Const from '../const'
import {Const, STATE_MACHINE} from '../index'
import * as Utils from '../utils/utils'

// import Box from '../entities/box'
// import Square from '../entities/square'
// import Leave from '../entities/leave'
// import Player from '../entities/player'
import {Splash, Player, EndBanner} from '../entities';

const mouse = (entities, {input, dispatch}) => {
    const { player, debug } = entities;
    const onMouseDown = input.find(x => x.name === 'onMouseDown') || {};
    const onMouseMove = input.find(x => x.name === 'onMouseMove') || {};
    const onTouchStart = input.find(x => x.name === 'onTouchStart') || {};
    const onTouchMove = input.find(x => x.name === 'onTouchMove') || {};
    const mouseMoveReturn = Utils.getParamSafely(onMouseMove, 'payload._targetInst.return');
    const touchMoveReturn = Utils.getParamSafely(onTouchMove, 'payload._targetInst.return');
    if ( onMouseDown 
        && onMouseDown.payload 
        && onMouseDown.payload._targetInst 
        && onMouseDown.payload._targetInst.return ) 
    {
        if ( onMouseDown.payload._targetInst.return.elementType === Player ) {
            // console.log('Player clicked');
            // console.log(onMouseDown.payload);
            // console.log(onMouseDown.payload._targetInst.return);
            // onMouseDown.payload._targetInst.return.stateNode.x = onMouseDown.payload.pageX;
            // onMouseDown.payload._targetInst.return.stateNode.y = onMouseDown.payload.pageY;
            if ( player ) {
                player.control = !player.control;
            }
            // if ( player.control ) {
            //     console.log('change state');
            //     // dispatch({type: 'end-game'});
            //     dispatch({type: 'pause-game', hello: 'world'});
            //     dispatch({type: 'change-state', nextState: STATE_MACHINE.FINISHED});
            // }
        } else if ( onMouseDown.payload._targetInst.return.elementType === Splash ) {
            // console.log('clicked on splash');
            // dispatch({type: 'change-state', nextState: STATE_MACHINE.PLAYING});
            dispatch({type: 'change-state', nextState: STATE_MACHINE.COUNTDOWN});
            // dispatch({type: 'play-sound-leave'});
        } else if ( onMouseDown.payload._targetInst.return.elementType === EndBanner ) {
            // console.log('clicked on endbanner');
            dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
        }
    }
    if ( mouseMoveReturn /* && mouseMoveReturn.elementType === Player */ ) {
        // console.log("mouseMoveReturn: " + JSON.stringify(Object.keys(onMouseMove.payload)));
        if ( player /* && player.control */ ) {
            player.x = onMouseMove.payload.pageX;
            player.y = Const.getSceneHeight() - (player.height / 2);
            // player.y = onMouseMove.payload.pageY;
        }
    }
    if ( touchMoveReturn ) {
        // console.log("touchMoveReturn: " + JSON.stringify(Object.keys(onTouchMove.payload)));

        if ( player ) {
            player.x = onTouchMove.payload.pageX;
            player.y = Const.getSceneHeight() - (player.height / 2);
        }
    }
    if (onTouchMove && onTouchMove.payload)
    {
        // console.log("OnTouchMove: " + JSON.stringify(Object.keys(onTouchMove)));
        if ( player ) {
            player.x = onTouchMove.payload.pageX;
            player.y = Const.getSceneHeight() - (player.height / 2);
        }
    }
    // if ( onTouchMove && onTouchMove.payload && debug ) {
    //     // var cache = [];
    //     // debug.debugText = JSON.stringify(onTouchMove.payload, (key, value) => {
    //     //     if ( typeof value === 'object' && value !== null ) {
    //     //         if (cache.indexOf(value) !== -1) {
    //     //             // duplicated, discard key
    //     //             return;
    //     //         }
    //     //         cache.push(value);
    //     //     }
    //     //     return value;
    //     // });
    //     debug.debugText = JSON.stringify(onTouchMove.payload.dispatchConfig);
    //     // debug.debugText = onTouchMove.payload.screenX + ', ' + onTouchMove.payload.screenY;
    //     // console.log(onTouchMove);
    // }
    if ( onTouchStart && onTouchStart.payload && debug ) {
        // debug.debugText = JSON.stringify(onTouchStart.payload.dispatchConfig);
        // var cache = [];
        // debug.debugText = JSON.stringify(onTouchStart, (key, value) => {
        //     if ( cache.indexOf(key) !== -1 ) {
        //         return;
        //     }
        //     cache.push(key);
        //     return key;
        // });
        // debug.debugText = JSON.stringify(Object.keys(onTouchStart.payload.touches[0]));
        // debug.debugText = JSON.stringify(onTouchStart.payload.touches);
        // debug.debugText = JSON.stringify(onTouchStart.payload.nativeEvent);
        // debug.debugText = JSON.stringify(onTouchStart.payload.touches);
    }
    if ( onMouseMove && onMouseMove.payload ) {
        // console.log("onMouseMove: " + JSON.stringify(Object.keys(onMouseMove.payload)));
        // debug.debugText = JSON.stringify(Object.keys(onMouseMove.payload));
    }
    return entities;
}

// const mouseForTest = (entities, {input}) => {
//     // console.log('mouse func');
//     // // console.log(entities);
//     // if ( input.length > 0 ) {
//     //     console.log('input:' + JSON.stringify(input));
//     // }
//     const onMouseDown = input.find(x => x.name === 'onMouseDown') || {};
//     const onMouseMove = input.find(x => x.name === 'onMouseMove') || {};
//     const onDrag = input.find(x => x.name === 'onDrag') || {};
//     if ( onMouseDown && onMouseDown.payload ) {
//         // onMouseDown.payload.defaultPrevented = true;
//         onMouseDown.payload.nativeEvent.preventDefault();
//         console.log('onMouseDown: ');
//         console.log(entities)
//         // console.log(onMouseDown);
//         const myleave = new Leave({x: 20, y: 10, width: 30, height: 30, speedX: 1, speedY: 1, renderer: <Leave/>});
//         entities[Math.random() + ''] = myleave.props;
//         console.log(onMouseDown.payload._targetInst.return.key); // box1
//         if ( onMouseDown.payload._targetInst.return.elementType === Box ) {
//             console.log('equals Box');
//         }
//         if ( onMouseDown.payload._targetInst.return.elementType === Square ) {
//             console.log('equals Square');
//         }
//         console.log(onMouseDown.payload._targetInst.return.elementType);
//     }
//     if ( onMouseMove && onMouseMove.payload ) {
//         // console.log('onMouseMove: ');
//         // console.log(onMouseMove.payload);
//         if ( onMouseMove.payload._targetInst.return.elementType === Box ) {
//             console.log('moving box');
//             // console.log(onMouseMove.payload);
//             // onMouseMove.payload._targetInst.return.stateNode.x = onMouseMove.payload.pageX; // cannot move
//             // onMouseMove.payload._targetInst.return.stateNode.y = onMouseMove.payload.pageY; // cannot move
//             const {box1} = entities;
//             if ( box1 ) {
//                 box1.x = onMouseMove.payload.pageX;
//                 box1.y = onMouseMove.payload.pageY;
//             }
//         }
//     }
//     if ( onDrag && onDrag.payload) {
//         console.log('onDrag: ');
//         // onDrag.payload.defaultPrevented = true;
//         // onDrag.payload.nativeEvent.preventDefault(); // useless
//         // onDrag.payload.nativeEvent.stopPropagation(); // useless
//         // console.log(entities);
//         const {box1} = entities;
//         if ( box1 ) {
//             box1.x = onDrag.payload.pageX;
//             box1.y = onDrag.payload.pageY;
//         }
//         console.log(onDrag.payload);
//     }
//     return entities;
// }

export default mouse;
