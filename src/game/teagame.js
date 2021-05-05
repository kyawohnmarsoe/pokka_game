import React from "react";
// import Amplify from 'aws-amplify';
import { GameEngine } from "react-game-engine";
// import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import {RemoveScroll} from 'react-remove-scroll';
import Sound from 'react-sound';
// import awsconfig from '../aws-exports';
// import { Authenticator, withAuthenticator } from 'aws-amplify-react';

import {Mouse, Gravity, Respawn, Collision, ChangeState, CountdownSystem} from './systems'
import {Splash, Instruction, Countdown321, Score, Leaderboard, Player, Leave, Flower, EndBanner, CountdownTimer} from './entities';
// import Box from './entities/box'
// import Square from './entities/square'
// import Score from './entities/score'
// import Leave from './entities/leave'
// import Player from './entities/player'
import PlayerWrapper from "./entities/playerwrapper";
// import Timer from './entities/timer'

// import * as Const from './const'
import {Const, CurrentState, GameConfig, STATE_MACHINE} from "./index";
import DebugText from "./entities/debugText";
import * as Utils from "./utils/utils";
import GameUtil from "./utils/gameutil";
// import Leave from "./entities/leave";
// import Flower from "./entities/flower";

// Amplify.configure(awsconfig);

import axios from 'axios'

const count321 = () => {
    // console.log('count321 finished');
    Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.PLAYING});
}

const endGame = () => {
    // console.log('endGame');
    Const.gameEngineRef.current.dispatch({type: 'play-sound-pokkaend'});
    Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.FINISHED});

    // submit data
    const data = {
        key: CurrentState.gamekey,
        score: CurrentState.currentScore,
        wwi: window.innerWidth,
        whi: window.innerHeight,
        swi: window.screen.availWidth,
        shi: window.screen.availHeight,
        appcodename: navigator.appCodeName,
        appname: navigator.appName,
        appversion: navigator.appVersion,
        platform: navigator.platform,
        useragent: navigator.userAgent,
    }
    let u = GameConfig.puri + "api/gameover";
    const qs = require('querystring');

    axios
        // .post(u, {data})
        ({
            method: 'post',
            url: u,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(data),
        })
        .then(res => {
            CurrentState.tampan = res.data.data;
            // console.log(res);
            // console.log(res.data);
            // console.log(res.data.data);
        })
}

const getEntities = () => {
    
    let entities = {};
    // eslint-disable-next-line default-case
    switch ( CurrentState.stateMachine ) {
        case STATE_MACHINE.NONE:
            entities = {
                splash: {renderer: <Splash/>}
            }
            
            break;
        case STATE_MACHINE.INSTRUCTION:
            entities = {
                instruction: {renderer: <Instruction/>}
            }
            break;
        case STATE_MACHINE.LEADERBOARD:
            entities = {
                instruction: {renderer: <Leaderboard/>}
            }
            break;
        case STATE_MACHINE.SUBMITDETAILS:
            entities = {
                instruction: {renderer: <EndBanner/>}
            }
            break;
        case STATE_MACHINE.COUNTDOWN:
            entities = {
                // countdownborder: { currentTick: (GameConfig.startCountdown+1) * 1000, width: Const.countdownBorderWidth, height: Const.countdownBorderHeight, x: (Const.sceneWidth - Const.countdownBorderWidth)  / 2, y: (Const.sceneHeight - Const.countdownBorderHeight + 50) / 2, renderer: <LeaveBorder/> },
                // countdowntimer: { style: {color: 'red'}, currentTick: (GameConfig.startCountdown+1) * 1000, x: Const.sceneWidth / 2, y: Const.sceneHeight / 5, color: 'green', onFinished: count321, renderer: <CountdownTimer/> }
                countdowntimer: { style: {color: 'red'}, currentTick: (GameConfig.startCountdown+1) * 1000, x: Const.sceneWidth / 2, y: Const.sceneHeight / 5, color: 'green', onFinished: count321, renderer: <Countdown321/> }
            };
            // console.log('teagame reset score');
            CurrentState.currentTime = 0;
            CurrentState.currentScore = 0;
            CurrentState.initialized = true;
            break;
        case STATE_MACHINE.PLAYING:
            entities = {
                score: {score: 0,currentTick: (GameConfig.gameDuration+1) * 1000, renderer: <Score/>},
                player: {x: Const.sceneWidth/2, y: Const.sceneHeight-(Const.playerHeight/2), width: Const.playerWidth, height: Const.playerHeight, control:false, renderer: <Player/>},
                playerwrapper: {x: Const.sceneWidth/2, y: Const.sceneHeight-100, width: 100, height: 140, control:false, renderer: <PlayerWrapper/>},
                countdowntimer: { currentTick: (GameConfig.gameDuration+1) * 1000, x: Const.sceneWidth /2, y: 10, color: 'blue', onFinished: endGame, renderer: <CountdownTimer/> },
                debug: {debugText: 'hello', renderer: <DebugText/>}
            };
            for ( let count = 0; count < GameConfig.initialLeave; count++ ) {
                const rand = GameUtil.randomLeaveSpawnPoint();
                const myleave = new Leave({...rand, width: Const.leaveWidth, height: Const.leaveHeight, renderer: <Leave/>});
                entities['leave' + count] = myleave.props;
                CurrentState.currentLeave = (count+1);
            }
            for ( let count = 0; count < GameConfig.initialFlower; count++ ) {
                const rand = GameUtil.randomLeaveSpawnPoint();
                const myflower = new Flower({...rand, width: Const.flowerWidth, height: Const.flowerHeight, renderer: <Flower/>});
                entities['flower' + count] = myflower.props;
                CurrentState.currentFlower = (count+1);
            }
            // console.log('init count: ' + JSON.stringify(CurrentState));
            // console.log(entities);
            CurrentState.running = true;
            break;
        case STATE_MACHINE.FINISHED:
            entities = {
                endbanner: {renderer: <Leaderboard/>}
            }
            break;
    }
    return entities;
}

class TeaGame extends React.PureComponent
{
    constructor(props) {
        super(props);
        this.state = {
            width: Const.sceneWidth,
            height: Const.sceneHeight,
            // pause: false,
            bgColor: 'black',
            soundBgm: 0,
            soundLeave: 0,
            soundFlower: 0,
            soundPokkaEnd: 0,
            // step1 : true,
            // step2 : false,
            // step3 : false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    // goToStep2 = () => {
    //     this.setState({
    //         step1 :false,
    //         step2 : true,
    //         step3 :false,
    //     })
    // }

    // goToStep3 = () => {
    //     this.setState({
    //         step1 :false,
    //         step2 : false,
    //         step3 : true,
    //     })
        
    //     console.log('start to countdown');
    //     Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.COUNTDOWN});
    // }

    handleEvent(ev) {
        // ev => single event
        // console.log('handleEvent: ' + JSON.stringify(ev));
        if ( ev.type === 'change-state') {
            const nextState = Utils.getParamSafely(ev, 'nextState');
            // eslint-disable-next-line default-case
            switch ( nextState ) {
                case STATE_MACHINE.NONE:
                    this.setState({soundBgm: 0});
                    this.setState({bgColor: 'black'});
                    break;
                case STATE_MACHINE.INSTRUCTION:
                    this.setState({bgColor: 'black'});
                    break;
                case STATE_MACHINE.COUNTDOWN:
                    break;
                case STATE_MACHINE.PLAYING:
                    if (this.state.width > 768)
                        this.setState({soundBgm: 1});
                    break;
                case STATE_MACHINE.LEADERBOARD:
                    this.setState({soundBgm: 0});
                    this.setState({bgColor: 'black'});
                    break;
                case STATE_MACHINE.FINISHED:
                    this.setState({soundBgm: 0});
                    this.setState({bgColor: 'black'});
                    break;
                case null:
                    break;
            }
            CurrentState.stateMachine = nextState;
            Const.gameEngineRef.current.swap(getEntities());
        } else if ( ev.type === 'pause-game' ) {
            // this will be executed first, and thus events in the system isn't called
            // Const.gameEngineRef.current.stop();
            // console.log('event inside teagame: ' + JSON.stringify(ev));
        } else if ( ev.type === 'play-sound-leave' ) {
            
            if ( !this.state.soundLeave ) {
                this.setState({soundLeave: 1});                
            }
        } else if ( ev.type === 'play-sound-flower' ) {
            
            if ( !this.state.soundFlower ) {
                this.setState({soundFlower: 1});                
            }
        } else if ( ev.type === 'play-sound-bgm' ) {
            if (this.state.width > 768)
            this.setState({soundBgm: 1});
        } else if ( ev.type === 'play-sound-pokkaend' ) {
            // this.setState({soundPokkaEnd: 1});
        }

        if(ev.type ==="touchmove")
        {
            // console.log("touchmove debug")
            let e = new MouseEvent("onMouseMove",
            {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: ev.clientX,
                clientY: ev.clientY
            })

            dispatchEvent(e);
        }
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }
    updateWindowDimensions() {
        // console.log('teagame updateWindowDimensions: ' + window.innerWidth + ', ' + window.innerHeight);
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    setPause(paused) {
        // console.log('teagame.setPause: ' + paused);
        this.setState({pause: paused});
    }
    soundLeaveFinished() {
        this.setState({soundLeave: 0});
    }
    render() {
        // console.log('paused: ' + this.state.pause);
        const {soundLeave} = this.state;
        const soundLeaveStatus = soundLeave ? Sound.status.PLAYING : Sound.status.STOPPED;
        // console.log('soundLeaveStatus: ' + soundLeaveStatus);
        // console.log('soundBgm: ' + this.state.soundBgm);
        
        return (
            <div>
                {
                    
                    <div>
                    <GameEngine
                        ref={Const.gameEngineRef}
                        onEvent={this.handleEvent.bind(this)}
                        running={!this.state.paused}
                        style={{width: this.state.width, height: this.state.height, backgroundColor: this.state.bgColor, position:"absolute", top: 0, left: 0, zindex: 10}}
                        entities={getEntities()}
                        systems={[
                            Mouse,
                            Gravity,
                            Respawn,
                            Collision,
                            CountdownSystem,
                            ChangeState
                        ]}
                    />
                    <RemoveScroll allowPinchZoom={false} removeScrollBar={true}/>
                    <Sound
                        url={require('../assets/pokkabgmp3.mp3')}
                        playStatus={this.state.soundBgm ? Sound.status.PLAYING : Sound.status.STOPPED}
                        onLoad={(obj) => {
                            /* *
                                soundmanager2.js:2129 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
                            */
                            // this.setState({soundBgm: 1})
                        }}
                        autoLoad={true}
                        loop={true}
                    />
                    <Sound
                        url={require('../assets/flower.mp3')}
                        playStatus={soundLeaveStatus}
                        onFinishedPlaying={this.soundLeaveFinished.bind(this)}
                    />
                    <Sound
                        url={require('../assets/flower.mp3')}
                        playStatus={this.state.soundFlower ? Sound.status.PLAYING : Sound.status.STOPPED}
                        onFinishedPlaying={() => {this.setState({soundFlower: 0})}}
                    />
                    <Sound
                        url="pokka_end.wav"
                        playStatus={this.state.soundPokkaEnd ? Sound.status.PLAYING : Sound.status.STOPPED}
                        onFinishedPlaying={() => {this.setState({soundPokkaEnd: 0})}}
                    />
                    </div>
                }
            </div>
            
        );
    }
}

export default TeaGame;
// export default withAuthenticator(TeaGame, true);
