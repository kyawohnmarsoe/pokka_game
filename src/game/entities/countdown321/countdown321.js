import React, { PureComponent } from "react";
import '../../../assets/css/counter.css';
import '../../../assets/css/game.css';
import styled, {keyframes} from "styled-components";

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
    animation: ${rotate} 3s linear infinite;
`;

class Countdown321 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        };
    }
    componentDidMount() {
        const width = this.divElement.clientWidth;
        const height = this.divElement.clientHeight;
        // console.log('componentDidMount height: ' + height);
        this.setState({width, height});
    }

    render() {
        const time = (this.props.currentTick / 1000);
        const iTime = parseInt('' + time);
        const szTime = iTime === 0 ? "GO!" : "" + iTime;

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
                <div className="countdown-container">
                     <Rotate className="imgrotate" >
                         <img draggable={false} src={require('../../../assets/321-counting-down.png')} alt='alt text'/>
                     </Rotate>
                     <div ref={(divElement) => { this.divElement = divElement; }} className="countdowntimercontainer counter321" >
                         <h2 className="countdowntimertext" >{szTime}</h2>
                     </div>
                 </div>
                
            </div>
            // <div>
            //     <div className="countdown-container">
            //         <Rotate className="imgrotate" >
            //             <img draggable={false} onTouchMove="" src={require('../../../assets/321-counting-down.png')} alt='alt text'/>
            //         </Rotate>
            //         <div ref={(divElement) => { this.divElement = divElement; }} className="countdowntimercontainer counter321" >
            //             <h2 className="countdowntimertext" >{szTime}</h2>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default Countdown321;
