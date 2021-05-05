import React, { PureComponent } from "react";
import '../../../assets/css/game.css';
// import {STATE_MACHINE} from '../../index'
import {Const, CurrentState, STATE_MACHINE} from "../../index";
// import axios from 'axios'

class Splash extends PureComponent {

    goToInstruction = () =>
    {
        // var h;
        // axios.get('http://localhost:88/pokkajasminetea/pokka/api/getscore')
        //     .then(resp => 
        //     {
        //         h = resp.data.data;

        //         h.forEach(element => {
        //             console.log("nama: " + element.nama);
        //         });
                
        //         console.log("data: " + h);
        //     });
            
        CurrentState.gamekey = "0";
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.INSTRUCTION});
        // Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.LEADERBOARD});
    }

    render() {
        
        return (
            
            <div className="row eka">
                <div className="welcome-container">
                    <div className="title"><span className="myellow">PLAY</span> AND <span className="mgreen">WIN</span></div> 
                    <div className="title sub">Exclusive Pokka Prizes</div> 
                    <div className="desc-container">
                        <div className="row">
                            <div className="desc-title">
                                <div className="prizelogo">
                                    <img src={require('../../../assets/game/cup.png')} alt=""/>
                                </div>
                                <div className="prizedesc">1 Winner with the highest score within 45secs will walk away with <span class="boldyellow"><strong>2 cartons of POKKA Jasmine Green Tea 500 ml (48 bottles)</strong></span> and <span class="boldyellow"><strong>an Exclusive Tea Set</strong></span>!</div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="prizeitems">
                                <div className="item item1">
                                    <div className="prizeimage">
                                        <img src={require('../../../assets/game/bottle.png')} alt=""/>
                                    </div>
                                    <div className="prizetext"><span className="prizetextbold"><strong>x2 cartons</strong></span><br/><span className="prizetextnormal">of POKKA Jasmine Green Tea 500ml (48 bottles)</span></div>
                                </div>
                                <div className="item item2">
                                    <div className="prizeimage">
                                        <img src={require('../../../assets/game/teapot.png')} alt=""/>
                                    </div>
                                    <div className="prizetext"><span className="prizetextbold"><strong>x1</strong></span><br/> Exclusive Tea Set</div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="periodtext">*Contest Period: 8<sup>th</sup> June 2020 - 7<sup>th</sup> July 2020.</div>
                        </div>
                    </div>
                    <div className="btnstartcontainer" id="btnNext">
                        <img src={require('../../../assets/game/Asset7.png')}  alt="" className="game_btn mx-auto mt-5" id="next_btn" onClick={this.goToInstruction} />
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Splash;