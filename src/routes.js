import React from 'react';
import Layout from './hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Matches from './components/dashboard/matches/Matches';
import AddEditMatch from './components/dashboard/matches/AddEditMatch';
import Players from './components/dashboard/players/Players';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/matches" exact component={Matches}/>
        <PrivateRoute {...props} path="/matches/editmatch" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/matches/editmatch/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/players" exact component={Players}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoute {...props} restricted={true}path="/login" exact component={Login} />
        <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;