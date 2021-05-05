import React, { PureComponent } from "react";
// import {Const, CurrentState} from '../../index'
import '../../../assets/css/counter.css';

class CountdownTimer extends PureComponent {
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
        const szTime = "" + iTime;
        
        // console.log('but I got: ' + CurrentState.currentTime); // because render isn't called again
        // const x = Const.getSceneWidth() / 2;
        // const y = Const.getSceneHeight() / 2;
        // const x = this.props.x;
        // const y = this.props.y;
        // const xAdjusted = x - (this.state.width / 2);
        // const yAdjusted = y - (this.state.height / 2);
        // const y = Const.getSceneHeight() - this.state.height - 5;
        // const color = this.props.color;
        // const style = this.props.style || {};
        return (
            <div ref={(divElement) => { this.divElement = divElement; }} className="countdowntimercontainer" >
                <h2 className="countdowntimertext ingametimer" >{szTime}s</h2>
            </div>
        )
    }
}

export default CountdownTimer;
