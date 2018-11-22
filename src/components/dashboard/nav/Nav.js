import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase';

const Nav = () => {

    const links = [
        {
            title: 'Match Result',
            linkTo: '/matches'
        }, {
            title: 'Fixture',
            linkTo: '/thematches'
        }, {
            title: 'Add Match',
            linkTo: '/matches/editmatch'
        }, {
            title: 'Players',
            linkTo: '/players'
        }, {
            title: 'Add Player',
            linkTo: '/players/addplayer'
        }
    ];

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    };

    const renderItems = () => (
        links.map((link)=>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    );

    const logoutHandler = () => {
        firebase.auth().signOut().then(()=> {
            console.log('Logout successful');
        }, (error) => {
            console.log('Error logging out');
        })
    };

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=> logoutHandler()}>
                Log out
            </ListItem>
        </div>
    );
};

export default Nav;