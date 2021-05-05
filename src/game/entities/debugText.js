import React, { PureComponent } from "react";
import {Const, CurrentState} from '../index'

class DebugText extends PureComponent {
    render() {
        return null;
    }
    renderTouchDebug() {
        let search = window.location.search;
        // console.log("search: " + JSON.stringify(search)); // ?p=1
        let params = new URLSearchParams(search);
        // console.log(params.toString()); // p=1
        const text = this.props.debugText;
        // const x = 100;
        // const y = Const.getSceneHeight() - 100;
        const x = 0;
        const y = 0;
        return (
            <h2 style={{position: 'absolute', color: 'blue', left: x, top: y}}>{text}</h2>
        )
    }
}

export default DebugText;
