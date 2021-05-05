import React, { PureComponent } from "react";
// import * as Const from '../const'
// import {Const} from '../../index'

class Score extends PureComponent {
    render() {
        const score = this.props.score;
        const currentTick = this.props.currentTick;
        const time = (currentTick / 1000);
        const iTime = parseInt('' + time);
        const szTime = "" + iTime;
        // const x = Const.getSceneWidth() / 2;
        // const y = 10;
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
                                {szTime} s
                            </div>
                        </div>
                        <div className="scoreban-item">
                            <div className="timer point">
                                {score} PTS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <h1 style={{position: 'absolute', color: 'white', left: x, top: y}}>{score}</h1>
        )
    }
    // renderPlayer() {
    //     const width = this.props.width || 500;
    //     const height = this.props.height || 500;
    //     const x = this.props.x - width / 2;
    //     const y = this.props.y - height / 2;
    //     return (
    //         <img draggable={false} src={require('../../assets/logo192.png')} alt='alt text' style={{position: 'absolute', width: width, height: height, left: x, top: y}}/>
    //     );
    // }
}

export default Score;