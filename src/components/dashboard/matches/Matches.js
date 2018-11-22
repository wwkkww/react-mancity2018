import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DashboardLayout from '../../../hoc/DashboardLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import {matchesDB} from '../../../firebase';
import {FirebaseLooper, reverseArray} from '../../ui/FirebaseLooper';


class Matches extends Component {
    state = {
        isLoading: true,
        matches: []
    };

    componentDidMount(){
        matchesDB.once('value').then((snapshot)=>{
            const matchesArray = FirebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                matches: reverseArray(matchesArray)

            })
        })
    };

    render() {
        console.log(this.state);
        return (
            <DashboardLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {   this.state.matches ?
                                        this.state.matches.map((match, i)=>(
                                            <TableRow key={i}>
                                                <TableCell>{match.date}</TableCell>
                                                <TableCell>
                                                    <Link to={`/matches/editmatch/${match.id}`}>
                                                        {match.away} <strong>-</strong> {match.local}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {match.resultAway} <strong>-</strong> {match.resultLocal}
                                                </TableCell>
                                                <TableCell>
                                                    { match.final === "Yes" ?
                                                        <span className="matches_tag_red">Final</span>
                                                        : <span className="matches_tag_green">Not played yet</span>
                                                        
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )) : ''
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        {
                            this.state.isLoading ? <CircularProgress  thickness={8} style={{color:'#98c5e9', marginTop:'100px'}} /> : '' 
                        }
                    </div>
                </div>
            </DashboardLayout>
        );
    }
}

export default Matches;