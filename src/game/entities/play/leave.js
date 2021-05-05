import React, { PureComponent } from "react";
// import Sound from 'react-sound';

class Leave extends PureComponent {
    render() {
        const width = this.props.width || 20;
        const height = this.props.height || 20;
        const x = this.props.x - width / 2;
        const y = this.props.y - height / 2;
        // const sound = this.props.sound ? Sound.status.PLAYING : Sound.status.STOPPED;
        return (
            <div>
            <img draggable={false} src={require('../../../assets/leaf_kecil.png')} className="leaf" alt='alt text' style={{position: 'absolute', left: x, top: y, zIndex: 1}}/>
                {/* <Sound
                    url={require('../../../assets/leaf.wav')}
                    playStatus={sound}
                /> */}
            </div>
        );
    }
}

export default Leave;