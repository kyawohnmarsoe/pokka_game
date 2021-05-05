// import React from "react";
// import { GameEngine } from "react-game-engine";
import * as Utils from '../utils/utils'
import GameUtil from "../utils/gameutil";
// import * as Const from '../const';
import {Const} from '../index'
// import Box from '../entities/box'
// import Square from '../entities/square'
// import Leave from '../entities/leave'
// import Flower from "../entities/flower";
import {Leave, Flower} from '../entities';
import {CurrentState} from "../index";

const grounded = (leave) => {
    const sceneHeight = Const.getSceneHeight();
    return leave.y >= sceneHeight;
}

const horizontallyOutOfBound = (leave) => {
    const sceneWidth = Const.getSceneWidth();
    return (leave.x <= (leave.width / 2) || leave.x >= (sceneWidth - leave.width / 2));
    // return (leave.x <= (leave.width / 2) || leave.x >= (sceneWidth - leave.width));
}

const resetPosAndSpeed = (leave) => {
    const {x, y, speedX, speedY} = GameUtil.randomLeaveSpawnPoint();
    leave.x = x;
    leave.y = y;
    leave.speedX = speedX;
    leave.speedY = speedY;
    // leave.x = Utils.randomInt(leave.width, Const.sceneWidth - leave.width);
    // leave.y = -10;
    // leave.speedX = Utils.randomInt(1, 5);
    // leave.speedY = Utils.randomInt(1, 5);
    return leave;
}

const respawn = (entities, {input}) => {
    const groundedLeaves = Utils.all(entities, e => {
        if ( e.renderer && e.renderer.type && (e.renderer.type === Leave || e.renderer.type === Flower) ) {
            if ( e.respawn || grounded(e) || horizontallyOutOfBound(e)) {
                return true;
            }
        }
        return false;
    });
    groundedLeaves.forEach(l => resetPosAndSpeed(l));
    CurrentState.gameentities = entities;
    return entities;
}

export default respawn;
