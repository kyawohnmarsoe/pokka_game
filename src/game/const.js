/**
 *  Keeps all the runtime values related to the running environments
 *  You don't need to change this unless the hardcoded assets changed
 */

import React from "react";

export const sceneWidth = window.innerWidth;
export const sceneHeight = window.innerHeight;

export const leaveWidth = 40;
export const leaveHeight = 80;
export const flowerWidth = 80;
export const flowerHeight = 80;
export const playerWidth = sceneWidth <= 768 ? 45 : 60;
export const playerHeight = sceneWidth <= 768 ? 130 : 190;

// Countdown
export const countdownBorderWidth = 200;
export const countdownBorderHeight = countdownBorderWidth;

export let gameEngineRef = React.createRef();
export let teaGameRef = React.createRef();

export const getSceneWidth = () => {
    return window.innerWidth;
}

export const getSceneHeight = () => {
    return window.innerHeight;
}
