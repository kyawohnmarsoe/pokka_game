import React, { PureComponent } from "react";
// import Amplify from 'aws-amplify';
// import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
// import awsconfig from '../../../aws-exports';
// import { Authenticator, withAuthenticator } from 'aws-amplify-react';
// import styled, {keyframes} from "styled-components";
import {Const, CurrentState, STATE_MACHINE} from "../../index";
import '../../../assets/css/counter.css';
import axios from 'axios'
import GameConfig from "../../gameconfig";


// const imgMyimageexample = require('../../../assets/end.jpeg');
// const divStyle = {
//     width: '88%',
//     height: '800px',
//     backgroundImage: `url(${imgMyimageexample})`,
//     backgroundSize: 'cover'
// };

// const EndBannerLogoAbs = styled.img`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 50%;
//     height: 50%;
// `;

// const EndBannerLogo = styled.img`
//     width: 50%;
//     height: 50%;
// `;

// Amplify.configure(awsconfig);

class EndBanner extends PureComponent {

    constructor(props){
        super(props);

        this.state = {
           display: false,
           showbutton: false,
           nama: '',
           email: '',
           telf: '',
           agree: false,
           score: 0,
           id: 0
        }
    }

    myChangeName = (event) => {
        this.setState({nama: event.target.value});
    }

    myChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    myChangeTelf = (event) => {
        if (isNaN(event.target.value))
        {
            console.debug("phone " + event.target.value);
            document.getElementById("phone").value = this.state.telf;
        }
        else{
            this.setState({telf: event.target.value});
        }
        
    }

    myChangeAgree = (event) => {
        this.setState({agree: !this.state.agree});
    }

    goToInstruction = () =>
    {
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
    }

    goToLeaderboard = () =>
    {
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.LEADERBOARD});
    }

    gohome = () =>
    {
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
    }

    senddata = (e) =>
    {
        e.preventDefault();

        if (this.state.agree && this.state.telf.length === 8 && !isNaN(this.state.telf))
        {

            // if (this.state.nama !== '' 
            //     && this.state.email !== ''
            //     && this.state.tel !== ''
            //     && CurrentState.gamekey !== '0')
            // {
                this.setState({display: true});
                this.setState({showbutton: true});

                // submit data
                const data = {
                    nama: this.state.nama,
                    email: this.state.email,
                    telf: this.state.telf,
                    score: CurrentState.currentScore,
                    id: CurrentState.gamekey,
                    tampan: CurrentState.tampan,
                }
                let u = GameConfig.puri + "api/recordscore";
                const qs = require('querystring');
                axios({
                        method: 'post',
                        url: u,
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        },
                        data: qs.stringify(data),
                    })
                    // .post(u, {qs. data})
                    .then(res => {
                        this.setState({showbutton: true})
                        // console.log(res);
                        // console.log(res.data);
                        // console.log(res.data.data);
                    })
            // }
            
        }
        
        
        // Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
    }

    render() {
        let d = this.state.display ? "inline-block" : "none";
        let e = this.state.showbutton ? "inline-block" : "none";
        const score = CurrentState.currentScore;
        this.setState({score: score});
        // const x = Const.getSceneWidth() / 2;
        // const y = 100;
        // console.log('end currentScore: ' + CurrentState.currentScore);
        return (
            // <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            //     <EndBannerLogo draggable={false} src={require('../../../assets/endtag.jpeg')} alt='alt text'/>
            //     <h1 style={{color: 'white'}} styleOld={{position: 'absolute', color: 'white', left: x, top: y}}>You have collected {score} points</h1>
                
            // </div>
            <div className="row">
                <div className="submitform-container">
                    <div className="btnclose" onClick={this.goToInstruction}>
                        <img src={require('../../../assets/btnclose.png')} alt="" />
                    </div>
                    <div className ="submitformitem-container">
                        <form onSubmit={this.senddata} action="">
                            <div className="row formitem">
                                <div className="formtitle">SUBMIT YOUR DETAILS</div>
                                <div className="formsubtitle">to win POKKA Limited Editon Prizes!</div>
                            </div>
                            <div className="row formitem">
                                <input name="name" type="text" className="forminput" placeholder="NAME" onChange={this.myChangeName}/>
                            </div>
                            <div className="row formitem">
                                <input name="email" type="email" className="forminput" placeholder="EMAIL ADDRESS" onChange={this.myChangeEmail} />
                            </div>
                            <div className="row formitem">
                                <input name="phone" id="phone" type="number" className="forminput" placeholder="CONTACT NUMBER"  pattern="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}" onChange={this.myChangeTelf} onKeyPress={this.myChangeTelf}/>
                            </div>
                            {/* <div className="row formitem">
                                <input name="agreement" type="checkbox" className="forminput">I've read the <a href="http://www.google.com" target="blank" alt="">T&amp;C</a></input>
                            </div> */}
                            {/* <div className="row formitem">
                                <input name="submit" type="button" className="forminput" placeholder="SUBMIT">SUBMIT</input>
                            </div> */}
                            <div className="row formitem">
                                <div className="cb-wrapper">
                                    <input name="agreement" type="checkbox" className="forminput cb" checked={this.state.agree} onChange={this.myChangeAgree}/>
                                    <div className="tc">I agree to the <a href="http://www.google.com" target="blank" alt="">Terms &amp; Conditions</a>.</div>
                                </div>
                                
                            </div>
                            <div className="row formitem">
                                <button name="submit" type="text" className="btnsumbit" placeholder="submit" onClick={this.senddata} >SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="thankyou-container" style={{display: d}}>
                    <div className="text-container">
                        <div className="text">THANK YOU FOR YOUR SUBMISSION</div>
                        <div className="text2">We will announce the winner on POKKA Facebook Page at the end of the contest.</div>
                        <div className="button" style={{display: e}} onClick={this.gohome}>Go to Home Page</div>
                    </div>
                </div>
            </div>
        );
    }
    // render() {
    //     return (
    //         <div className="cComponent" style={divStyle}/>
    //     );
    // }
}

export default EndBanner;
// export default withAuthenticator(EndBanner, true);
