/**
 *  Keeps all the GameDesigner's modifyable values
 *
 */
const GameConfig = {
    initialLeave: 20,
    scorePerLeave: 50,
    leaveSpeedX: {min: -2, max: 2},
    leaveSpeedY: {min: 1, max: 3},
    initialFlower: 4,
    scorePerFlower: 100,
    flowerSpeedX: {min: -2, max: 2},
    flowerSpeedY: {min: 1, max: 3},
    gameDuration: 45,
    startCountdown: 3,
    puri : "https://pokkajasminegreentea.sg/api/pokkaapiserver/",
};

export default GameConfig;
