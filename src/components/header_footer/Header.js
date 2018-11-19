import React, { Component } from 'react';
import { AppBar,Toolbar,Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ManCityLogo } from '../ui/Icons';


class Header extends Component {
  state = {

  }

  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor:"#98c5e9",
          boxShadow:"none",
          padding:"10px 0",
          borderBottom:"2px solid #00285e"
        }}
      >
        <Toolbar style={{display:"flex"}}>
          <div style={{flexGrow:1}}>
            <div className="header_logo">
              <ManCityLogo 
                link={true} 
                linkTo="/"
                width="70px"
                height="70px"
              />
            </div>
          </div>

          <Link to="/team">
            <Button color="inherit">The Team</Button>
          </Link>
          <Link to="/matches">
            <Button color="inherit">Matches</Button>
          </Link>

        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;