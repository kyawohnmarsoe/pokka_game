// import React from "react";
// import { GameEngine } from "react-game-engine";
import * as Utils from '../utils/utils'
// import Box from '../entities/box'
// import Square from '../entities/square'
// import Leave from '../entities/leave'
// import Flower from "../entities/flower";
import {Leave, Flower} from '../entities';

const gravity = (entities, {input}) => {
    // console.log('start gravity');
    // const xable = Utils.all(entities, e => e.physics !== undefined );
    // xable.forEach(x => console.log(x.x));
    // console.log('end gravity');
    const yable = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && (e.renderer.type === Leave || e.renderer.type === Flower) ) {
            return true;
        }
        return false;
    });
    // yable.forEach(y => console.log(y));
    yable.forEach(y => {
        y.x += y.speedX;
        y.y += y.speedY;
    });
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

export default gravity;
