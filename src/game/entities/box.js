import React, { PureComponent } from "react";

class Box extends PureComponent {
    render() {
        const size = 100;
        const x = this.props.x - size / 2;
        const y = this.props.y - size / 2;
        return (
            <img draggable={false} src={require('../../assets/logo192.png')} alt='alt text' style={{position: 'absolute', width: size, height: size, left: x, top: y}}/>
        );
        // return (
        //     <div style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }} />
        // );
    }
}

export default Box;