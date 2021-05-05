import React, { PureComponent } from "react";
// import * as Const from '../const';
import {Const} from '../../index'
import {Leave, Flower, Score} from '../../entities';
import * as Utils from '../../utils/utils'
import GameUtil from "../../utils/gameutil";
import {Collision} from '../../systems'
import {CurrentState, GameConfig} from "../../index";

// import styled, {keyframes} from "styled-components";

// const rotate = keyframes`
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(360deg);
//     }
// `;

// const Rotate = styled.div`
//     display: inline-block;
//     animation: ${rotate} 2s linear infinite;
// `;

const isColliding = (p1, p2) => {
    return ((Math.abs(p1.x - p2.x) * 2) < (p1.width + p2.width))
        // && ((Math.abs(p1.y - p2.y) * 2) < (p1.height + p2.height))
        && (p1.y - p2.y) > 0
        ;
}


class Player extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            posX: -900,
            posY: -900,
            mPosX: 0,
            mPosY: 0,
            tP: 10
        }
    }

    touchEndPlayer = (event) =>
    {
        Const.gameEngineRef.current.dispatch("onMouseDown");
    }

    touchMoveplayer = (event) =>
    {
        // console.log("Player touch move position: " + event.touches[0].clientX);

        let entities = CurrentState.gameentities;
        // console.log("entities: " + JSON.stringify(entities));
        
        let mpx = event.touches[0].clientX;
        mpx = mpx > Const.getSceneWidth() - 60 ? Const.getSceneWidth() - 60 : mpx;
        mpx = mpx < 0 ? 0 : mpx;

        this.setState({posX: mpx}); 
        this.setState({posY: event.touches[0].clientY}); 
        
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

        let leaves = Utils.all(entities, e => {
            if (e.renderer && e.renderer.type && e.renderer.type === Leave)
            {
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

        player[0].x = event.touches[0].clientX;
        player[0].y = Const.getSceneHeight() - this.state.tP;
        player[0].height = this.state.tP;
        this.setState({mPosX: player[0].x});
        this.setState({mPosY: player[0].y});
        let mplayer = {
            x: mpx,
            y: this.state.posY,
            width: 66,
            height: 150, 
        }

        let playSoundLeaf = false;
        let playSoundFlower = false;
        
        // let b = isColliding(leaves[0], mplayer);
        // if (b)
        // {
        //     console.log("Collide: !!!!!!!!!!!!!!");
        // }


        leaves.forEach(leaf =>
        {
            leaf.respawn = isColliding(leaf, player[0]);
            if (leaf.respawn)
            {
                // console.log("Collide: !!!!!!!!!!!!!!");
                playSoundLeaf = true;
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

        if ( playSoundLeaf ) {
            Const.gameEngineRef.current.dispatch({type: 'play-sound-flower'});
        }
        if ( playSoundFlower ) {
            Const.gameEngineRef.current.dispatch({type: 'play-sound-flower'});
        }
        
    }

    render() {
        const width = this.props.width;
        const height = this.props.height;
        const maxWidth = Const.getSceneWidth() - this.props.width;
        // const maxHeight = Const.getSceneHeight();

        let x = this.props.x - width / 2;
        let y = this.props.y - height / 2;
        this.setState({posX: x}); 
        this.setState({posY: y}); 
        this.setState({tP: height}); 
        // if (this.state.posX < 0)
        // {
        //     this.setState({posX: x}); 
        //     this.setState({posY: y}); 
        // }
        // else
        // {
        //     x = this.state.posX;
        //     y = this.state.posY;
        // }
        
        // let y = maxHeight - height;
        if ( x < 0 ) x = 0;
        else if ( x > maxWidth ) x = maxWidth;
        // if ( y < 0 ) y = 0;
        // else if ( y > maxHeight ) x = maxHeight;

        // function touchMoveHandler(e)
        // {
        //     console.log("Player touch move position: " + e.touches[0].clientX);
        //     let ev = new MouseEvent("mouseMoveReturn", {
        //         view: window,
        //         bubbles: true,
        //         cancelable: true,
        //         clientX: e.touches[0].clientX,
        //         clientY: e.touches[0].clientY
        //     });
            
        //     dispatchEvent(ev);

        //     this.setState({posX: e.touches[0].clientX}); 
            

        //     document.getElementById("bottleplayer").style.left = e.touches[0].clientX + "px";
        // }

        return (
            <div>
                {/* <div style={{position: 'absolute', width:width,height:height, left: this.state.posX, bottom: 10, border: '1px solid #ffffff'}} ></div> */}
                {/* <div style={{position: 'absolute', width:width,height:height, left: this.state.mPosX, top: this.state.mPosY, border: '1px solid #ff0000'}} ></div> */}
                <img draggable={false} onTouchMove={this.touchMoveplayer} onTouchEnd={this.touchEndPlayer} id="bottleplayer" className="bottleplayer" src={require('../../../assets/bottle2.png')} alt='alt text'
                 style={{position: 'absolute', width: width, height: height, left: this.state.posX, bottom: 10}}/>
                
            {/* <h3 style={{color: 'white', position: 'absolute', top: "200px", left: "0px"}}>{JSON.stringify(this.props.posX)}</h3> */}
            </div>
        );
        // return (
        //     <div>
        //     <img draggable={false} ontouchmove="" src={require('../../assets/logo192.png')} alt='alt text' style={{position: 'absolute', width: width, height: height, left: x, top: y}}/>
        //     <h3 style={{color: 'white'}}>{JSON.stringify(this.props.touchPosition)}</h3>
        //     </div>
        // );
    }
}

export default Player;
