import React, { Component } from 'react';
import PlayerCard from '../ui/PlayerCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from 'react-reveal/Fade';
import Stripes from '../../resources/images/stripes.png';
import {playersDB , firebase } from '../../firebase';
import {FirebaseLooper} from '../ui/FirebaseLooper';
import {Promise} from 'core-js';

class Team extends Component {
    state= {
        isLoading: true,
        players: []
    };

    componentDidMount(){
        playersDB.once('value').then((snapshot) => {
            const players = FirebaseLooper(snapshot);
            console.log(players)

            let promises = [];
            for(let key in players) {
                promises.push(new Promise((resolve, reject) => {
                    firebase.storage().ref('players').child(players[key].image).getDownloadURL()
                        .then((url) => {
                            players[key].url = url;
                            resolve();
                        })
                }));
            };

            Promise.all(promises).then(()=>{
                this.setState({
                    isLoading: false,
                    players
                })
            });

        })
    };

    showPlayersByPosition = (pos) => (
        this.state.players ? 
            this.state.players.map((player, i) => {
                return player.position === pos ?
                    <Fade left delay={i*30} key={i}>
                        <div className="item">
                            <PlayerCard 
                                number={player.number}
                                name={player.name}
                                lastname={player.lastname}
                                bck={player.url}                            
                            />
                        </div>
                    </Fade>
                    : null
            }) : null
    );

    render() {
        // console.log(this.state.players);
        return (
            <div className="the_team_container"
                style={{
                    background: `url(${Stripes}) repeat`
                }}
            >
                { !this.state.isLoading ? 
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {this.showPlayersByPosition('Keeper')}
                            </div>                            
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Defenders</div>
                            <div className="team_cards">
                                {this.showPlayersByPosition('Defender')}
                            </div>                            
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Midfielders</div>
                            <div className="team_cards">
                                {this.showPlayersByPosition('Midfielder')}
                            </div>                            
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Forwards</div>
                            <div className="team_cards">
                                {this.showPlayersByPosition('Forward')}
                            </div>                            
                        </div>

                    </div>
                    : <CircularProgress thickness={8} style={{ color: '#98c5e9', marginTop: '100px', marginLeft: '600px', marginBottom: '100px' }} />
                }
            </div>
        );
    }
}

export default Team;