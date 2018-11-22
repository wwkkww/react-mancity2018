import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LeagueTable from './Table';
import MatchesList from './MatchesList';
import { matchesDB } from '../../firebase';
import { FirebaseLooper, reverseArray } from '../ui/FirebaseLooper';

class TheMatches extends Component {
    state = {
        isLoading: true,
        matches: [],
        filterMatches: [],
        playedFilter: 'All',
        resultFilter: 'All'
    };

    componentDidMount() {
        matchesDB.once('value').then(snapshot => {
            const matches = FirebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                matches: reverseArray(matches),
                filterMatches: reverseArray(matches)
            })
        })
    };

    showPlayed = (played) => {
        const list = this.state.matches.filter((match) => {
            return match.final === played
        });
        this.setState({
            filterMatches: played === 'All' ? this.state.matches : list,
            playedFilter: played,
            resultFilter: 'All'
        });
    };

    showResult = (result) => {
        const list = this.state.matches.filter((match) => {
            return match.result === result
        });
        this.setState({
            filterMatches: result === 'All' ? this.state.matches : list,
            playedFilter: 'All',
            resultFilter: result
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">Show Match</div>
                                <div className="cont">
                                    <div className={`option ${this.state.playedFilter === 'All' ? 'active' : ''}`} onClick={() => this.showPlayed('All')}>
                                        ALL
                                    </div>
                                    <div className={`option ${this.state.playedFilter === 'Yes' ? 'active' : ''}`} onClick={() => this.showPlayed('Yes')}>
                                        Played
                                    </div>
                                    <div className={`option ${this.state.playedFilter === 'No' ? 'active' : ''}`} onClick={() => this.showPlayed('No')}>
                                        Not Played
                                    </div>
                                </div>
                            </div>


                            <div className="match_filters_box">
                                <div className="tag">Result</div>
                                <div className="cont">

                                    <div className={`option ${this.state.resultFilter === 'All' ? 'active' : ''}`} onClick={() => this.showResult('All')}>
                                        ALL
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'W' ? 'active' : ''}`} onClick={() => this.showResult('W')}>
                                        W
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'D' ? 'active' : ''}`} onClick={() => this.showResult('D')}>
                                        D
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'L' ? 'active' : ''}`} onClick={() => this.showResult('L')}>
                                        L
                                    </div>
                                </div>
                            </div>

                        </div>

                        <MatchesList matches={this.state.filterMatches} />
                        <div className="admin_progress">
                            {
                                this.state.isLoading ? <CircularProgress thickness={8} style={{ color: '#98c5e9', marginTop: '100px', marginLeft: '200px', marginBottom: '100px' }} /> : ''
                            }
                        </div>
                    </div>

                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMatches;