import React, { PureComponent } from 'react';
import '../../../assets/css/game.css';
import axios from 'axios'
// import { TeaGame } from '.';
import {Const, CurrentState, STATE_MACHINE} from "../../index";
import GameConfig from "../../gameconfig";


class Leaderboard extends PureComponent{

    constructor(props) {
        super(props)
    
        this.state = {
             leaders : [],
             
            name: '',
            email : '',
            phone : '',
            points : this.props.score,
            leaderboard : true,
            playagain : false,
            thankyou : false,
        }

        this.getLeaderboardData();
    }

    getLeaderboardData = () =>
    {
        let h;
        let ihtml = ''; 
        let u = GameConfig.puri + "api/getscore";
        axios.get(u)
            .then(resp => 
            {
                h = resp.data.data;

                let i = 0;
                h.forEach(element => {
                    i++;
                    ihtml = ihtml + "<tr><td>"+i+"</td><td>"+element.nama + "</td><td>" + element.score + "</td></tr>";
                });

                document.getElementById("lc").innerHTML = ihtml;
                
                // console.log(resp);
            });
    }

    playAgain = () => {
        alert('ok')
        this.setState({
            leaderboard : false,
            playagain : true,
        })
    }

    // componentDidMount(){
       

    //     axios.get('http://api.mostdigital.net/public/api/getapi')
    //     .then(response => {
    //         console.log(response)
    //         this.setState({
    //             leaders: response.data
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    changeHandler = (e) => {
        this.setState({
           
                [e.target.name] : e.target.value
           
        })
    }

    // submitHandler = (e) => {
    //     console.log(this.state)
       

    //     axios.post('http://api.mostdigital.net/public/api/postapi', this.state)
    //     .then(response => {
    //         console.log(response)
           

    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    //     e.preventDefault()

    //     this.setState({
    //         thankyou : true,
    //     })
        
    // }

    goToHome = () =>
    {
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.NONE});
    }

    showSubmitDetail = () =>
    {
        Const.gameEngineRef.current.dispatch({type: 'change-state', nextState: STATE_MACHINE.SUBMITDETAILS});
    }
    

    render(){
        // const{leaders,name,email,phone} = this.state
        const score = CurrentState.currentScore === 0 ? 0 : CurrentState.currentScore;
        return (
           <div className="row">
               <div className="leaderboard-container" id="leaderboard">
                   <div className="row">
                       <div className="title">Leaderboard</div>
                    </div>
                    <div className="row">
                        <div className="myresult-container">
                            <div className="row text1">TIME'S UP!</div>
                            <div className="row text2">YOU'VE COLLECTED</div>
                            <div className="row text-score">{score}</div>
                            <div className="row text4">points!</div>
                            <div className="row buttons">
                                <div className="button btnsubmit" onClick={this.showSubmitDetail}>SUBMIT DETAILS</div>
                                <div className="button btnagain" onClick={this.goToHome}>PLAY AGAIN</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="leaderboard-result-container">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>No</td>
                                            <td>Name</td>
                                            <td>Score</td>
                                        </tr>
                                    </thead>
                                    <tbody id="lc">
                                        <tr><td>1.</td><td>Hassan</td><td>50000</td></tr>
                                        <tr><td>2.</td><td>Hannah</td><td>40000</td></tr>
                                        <tr><td>3.</td><td>George</td><td>30000</td></tr>
                                        <tr><td>4.</td><td>Margareth</td><td>20000</td></tr>
                                        <tr><td>5.</td><td>Maria</td><td>25000</td></tr>
                                        <tr><td>6.</td><td>Alexandre</td><td>20000</td></tr>
                                        <tr><td>7.</td><td>Johnson</td><td>10000</td></tr>
                                        <tr><td>8.</td><td>William</td><td>7500</td></tr>
                                        <tr><td>9.</td><td>Bosch</td><td>5000</td></tr>
                                        <tr><td>10.</td><td>Anita</td><td>1000</td></tr>
                                    {
                                        // leaders.length ?
                                        // leaders.map ( (leader,i) =>

                                        //     <tr key = {leader.id}>
                                        //         <td>{i+1}</td>
                                        //         <td>{leader.name}</td>
                                        //         <td className="text-right"> <span className="green-text">{leader.points}</span> pts</td>
                                        //     </tr>
                                            
                                        // ):
                                        // null
                                    }
                                        
                                    
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    
                    {/* <div className="row mt-5">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="leaderboard-wapper">
                                <h1 className="text-uppercase text-center"><span className="green-text">Leaderboard </span> </h1>

                                <div className="table-responsive">
                                    <table className="table">
                                    <tbody>
                                    
                                    {
                                        leaders.length ?
                                        leaders.map ( (leader,i) =>

                                            <tr key = {leader.id}>
                                                <td>{i+1}</td>
                                                <td>{leader.name}</td>
                                        <td className="text-right"> <span className="green-text">{leader.points}</span> pts</td>
                                            </tr>
                                            
                                        ):
                                        null
                                    }
                                        
                                    
                                    </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div> */}

                    {/* <div className="row mt-5">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="time-wapper text-center ">
                                <h1 className="green-text text-uppercase">time's up!</h1>
                                <h3 className="text-uppercase">you've collected</h3>
                                <div className="green-text font-weight-bold">
                                    <span className="points-collected"> {this.props.score} points!</span>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <a href="#" data-toggle="modal" data-target="#exampleModal"> 
                                            <img src={require('../../../assets/game/Asset18.png')}  alt="" className="game_btn px-2" /> 
                                        </a> 
                                    </div>

                                    <div onClick={this.playAgain}>
                                        <a href="#">  
                                            <img src={require('../../../assets/game/Asset20.png')}  alt="" className="game_btn px-2" /> 
                                        </a> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

               </div>
               {/* <div className="container" id="submit-detail"> 

                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                    
                                <div className="modal-body">

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>

                                    <h2 className="text-uppercase green-text">Submit your details</h2>
                                    <div>to win POKKA Limited Edition Prizes!</div>
                                    {    
                                        this.state.thankyou ? 
                                        <h1>Thank You For Submiting Data</h1> :
        

                                        <form method="POST" action="#" className="mt-5" 
                                        onSubmit={this.submitHandler} >
                                        
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="name" name="name" placeholder="Name" required 
                                                value={name}
                                                onChange={this.changeHandler}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="email" name="email"  placeholder="Email Address" required 
                                                value={email}
                                                onChange={this.changeHandler}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" id="phone" placeholder="contact number" name="phone" required 
                                                value={phone}
                                                onChange={this.changeHandler}
                                                />
                                            </div>
                                            
                                            <div className="form-check text-left">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">I've read the TC</label>
                                            </div>
                                            <div className="game_btn mt-5 img_btn_outer" >
                                                <img src={require('../../../assets/game/Asset18.png')}  alt="" className="img-fluid img_btn_inner1"  /> 
                                                <input type="submit" className="img_btn_inner2" 
                                                value="" 
                                                />
                                            </div>

                                        </form>
                                    }    

                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>  */}
                

                {/* {    
                    this.state.leaderboard &&
                    <div id="game" >
                

                    <div className="container" id="leaderboard">
                        
                        <div className="row mt-5">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="leaderboard-wapper">
                                    <h1 className="text-uppercase text-center"><span className="green-text">Leaderboard </span> </h1>

                                    <div className="table-responsive">
                                        <table className="table">
                                        <tbody>
                                        
                                        {
                                            leaders.length ?
                                            leaders.map ( (leader,i) =>

                                                <tr key = {leader.id}>
                                                    <td>{i+1}</td>
                                                    <td>{leader.name}</td>
                                            <td className="text-right"> <span className="green-text">{leader.points}</span> pts</td>
                                                </tr>
                                                
                                            ):
                                            null
                                        }
                                            
                                       
                                        </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="time-wapper text-center ">
                                    <h1 className="green-text text-uppercase">time's up!</h1>
                                    <h3 className="text-uppercase">you've collected</h3>
                                    <div className="green-text font-weight-bold">
                                        <span className="points-collected"> {this.props.score} points!</span>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <a href="#" data-toggle="modal" data-target="#exampleModal"> 
                                                <img src={require('../../../assets/game/Asset18.png')}  alt="" className="game_btn px-2" /> 
                                            </a> 
                                        </div>

                                        <div onClick={this.playAgain}>
                                            <a href="#">  
                                                <img src={require('../../../assets/game/Asset20.png')}  alt="" className="game_btn px-2" /> 
                                            </a> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="container" id="submit-detail"> 

                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                            
                                            <div className="modal-body">

                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>

                                                <h2 className="text-uppercase green-text">Submit your details</h2>
                                                <div>to win POKKA Limited Edition Prizes!</div>
                                                {    
                                                    this.state.thankyou ? 
                                                    <h1>Thank You For Submiting Data</h1> :
                

                                                <form method="POST" action="#" className="mt-5" 
                                                onSubmit={this.submitHandler} >
                                               
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" id="name" name="name" placeholder="Name" required 
                                                        value={name}
                                                        onChange={this.changeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" id="email" name="email"  placeholder="Email Address" required 
                                                        value={email}
                                                        onChange={this.changeHandler}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="number" className="form-control" id="phone" placeholder="contact number" name="phone" required 
                                                        value={phone}
                                                        onChange={this.changeHandler}
                                                        />
                                                    </div>
                                                    // <div className="form-group"> 
                                                    //    <input type="text" className="form-control" id="points" placeholder="Points" name="points" required 
                                                    //    value={this.props.score}
                                                    //    onChange={this.changeHandler}
                                                    //    />
                                                    //</div>
                                                    <div className="form-check text-left">
                                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                        <label className="form-check-label" for="exampleCheck1">I've read the TC</label>
                                                    </div>
                                                    <div className="game_btn mt-5 img_btn_outer" >
                                                        <img src={require('../../../assets/game/Asset18.png')}  alt="" className="img-fluid img_btn_inner1"  /> 
                                                        <input type="submit" className="img_btn_inner2" 
                                                        value="" 
                                                        />
                                                    </div>

                                                </form>
                                            }    

                                            </div>

                                    </div>
                                </div>
                            </div>
                            
                    </div> 
                



                    </div>


                } */}

                {/* {
                   
                   this.state.playagain &&
                  
                   <TeaGame ref={Const.teaGameRef}/> 
               } */}

               

           </div>
        )
    }
}

export default Leaderboard