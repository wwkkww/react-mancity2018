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

import { playersDB } from '../../../firebase';
import {FirebaseLooper, reverseArray} from '../../ui/FirebaseLooper';

class Players extends Component {
    state = {
        isLoading: true,
        players: []
    };

    componentDidMount() {
        playersDB.once('value').then((snapshot)=>{
            const playersArray = FirebaseLooper(snapshot);

            this.setState({
                isLoading: false,
                players: reverseArray(playersArray)
            })
        });
    }

    render() {
        return (
            <DashboardLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {   this.state.players ?
                                        this.state.players.map((player, i)=>(
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <Link to={`/players/addplayer/${player.id}`}>
                                                        {player.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/players/addplayer/${player.id}`}>
                                                        {player.lastname}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                   {player.number}
                                                </TableCell>
                                                <TableCell>
                                                    {player.position}
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

export default Players;