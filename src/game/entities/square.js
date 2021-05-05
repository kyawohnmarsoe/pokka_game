import React, { PureComponent } from "react";

class Square extends PureComponent {
    render() {
        const size = 200;
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

export default Square;