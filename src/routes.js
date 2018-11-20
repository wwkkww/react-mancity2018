import React from 'react';
import Layout from './hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoute {...props} restricted={true}path="/login" exact component={Login} />
        <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;