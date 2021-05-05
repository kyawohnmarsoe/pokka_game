import React, { PureComponent } from "react";
import ReactTouchPosition from 'react-touch-position';
// import * as Const from '../const';
import {Const} from '../index'
import {Player} from './index';

class PlayerWrapper extends PureComponent {
    render() {
        return null;
    }
    renderTouchDebug() {
        return (
            <ReactTouchPosition>
                <Player/>
            </ReactTouchPosition>
        );
    }
}

export default PlayerWrapper;
