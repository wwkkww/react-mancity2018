import React, { Component } from 'react';
import { matchesDB } from '../../../firebase';
import { FirebaseLooper, reverseArray } from '../../ui/FirebaseLooper';
import MatchBlock from '../../ui/MatchBlock';
import Slide from 'react-reveal/Slide';


class Blocks extends Component {

    state = {
        matches: []
    };

    componentDidMount() {
        matchesDB.limitToLast(6).once('value').then((snapshot)=> {
            const matches = FirebaseLooper(snapshot);
            this.setState({
                matches: reverseArray(matches)
            })
        });
    };

    showMatches = (matches) => (
        matches ? matches.map((match) =>(
            <Slide bottom key={match.id}>
                <div className="item">
                    <div className="wrapper">
                        <MatchBlock match={match} />
                    </div>
                </div>
            </Slide>
        )) : null
    );

    render() {
        // console.log(this.state);
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default Blocks;