import React, { PureComponent } from "react";
// import * as Const from '../const';
import {Const} from '../../index'
import styled, {keyframes} from "styled-components";
import '../../../assets/css/counter.css';
import '../../../assets/css/game.css';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
`;

class LeaveBorder extends PureComponent {
    render() {
        const width = this.props.width;
        // const height = this.props.height;
        const maxWidth = Const.getSceneWidth() - this.props.width;

        // const time = (this.props.currentTick / 1000);
        // const iTime = parseInt('' + time);
        // const szTime = iTime === 0 ? "GO" : "" + iTime;
        
        // const maxHeight = Const.getSceneHeight();
        let x = this.props.x - width / 2;
        // let y = this.props.y - height / 4;
        // let y = maxHeight - height;
        if ( x < 0 ) x = 0;
        else if ( x > maxWidth ) x = maxWidth;
        // if ( y < 0 ) y = 0;
        // else if ( y > maxHeight ) x = maxHeight;
        return (
            <div className="row">
                <div className="scoreban">
                    <div className="scoreban-container">
                        <div className="scoreban-item">
                            <div className="points">
                                <div className="item">
                                    <img src={require('../../../assets/flower_kecil.png')} alt="" />
                                    <div className="text">100 PTS</div>
                                </div>
                                <div className="item">
                                    <img src={require('../../../assets/leaf_kecil.png')} alt="" />
                                    <div className="text">50 PTS</div>
                                </div>
                            </div>
                        </div>
                        <div className="scoreban-item">
                            <div className="timer">
                                0s
                            </div>
                        </div>
                        <div className="scoreban-item">
                            <div className="timer countdowntimertext">
                                0 PTS
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainimagecount">
                    <img src={require('../../../assets/bottle.png')} alt="" />
                </div>
                {/* <Rotate className="imgrotate" style={{position: 'absolute', left: x, top: 30}}>
                    <img draggable={false} onTouchMove="" src={require('../../../assets/321-counting-down.png')} alt='alt text'/>
                </Rotate> */}
                <Rotate className="imgrotate" >
                    <img draggable={false} onTouchMove="" src={require('../../../assets/321-counting-down.png')} alt='alt text'/>
                </Rotate>
            </div>
        );
    }
}

export default LeaveBorder;
