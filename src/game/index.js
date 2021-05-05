import * as Const from './const';
// import TeaGame from './teagame';
// import GameConfig from "./gameconfig";
// import GameState, {CurrentState} from "./gamestate";
import {CurrentState, STATE_MACHINE, default as GameState} from "./gamestate";

export {default as TeaGame} from './teagame';
export {default as GameConfig} from './gameconfig';
// export {default as GameState} from './gamestate';
export {Const as Const};
export {CurrentState, STATE_MACHINE};
