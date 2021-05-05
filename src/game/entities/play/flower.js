import React, { PureComponent } from "react";
// import Sound from 'react-sound';

class Flower extends PureComponent {
    render() {
        const width = this.props.width || 20;
        const height = this.props.height || 20;
        const x = this.props.x - width / 2;
        const y = this.props.y - height / 2;
        // const sound = this.props.sound ? Sound.status.PLAYING : Sound.status.STOPPED;
        return (
            <div>
                {/* <img draggable={false} src={require('../../../assets/flower.png')} alt='alt text' style={{position: 'absolute', color: 'white', width: width, height: height, left: x, top: y}}/> */}
                <img draggable={false} src={require('../../../assets/flower_kecil.png')} className="flower" alt='alt text' style={{position: 'absolute', color: 'white', left: x, top: y}}/>
                {/* <Sound
                    url="myflower.mp3"
                    playStatus={sound}
                /> */}
            </div>
        );
    }
}

export default Flower;