/**
 *  Keeps the initial game state
 *  and a copy of currently running state in CurrentState
 */
export const STATE_MACHINE = {
    NONE: 0,
    INSTRUCTION: 1,
    INITIALIZE_COUNTDOWN: 2,
    COUNTDOWN: 3,
    INITIALIZE_PLAYING: 4,
    PLAYING: 5,
    LEADERBOARD: 6,
    SUBMITDETAILS: 7,
    FINISHED: 8,
}

const GameState = {
    currentLeave: 0,
    currentFlower: 0,
    currentScore: 0,
    currentTime: 0.0,
    initialized: false,
    stateMachine: STATE_MACHINE.NONE,
    pause: false,
    gamekey: 0, 
    tampan: 0,
    gameentities: {}
};

export const CurrentState = Object.assign({}, GameState);

// CurrentState.currentLeave = 1;

export default {
    GameState
};
