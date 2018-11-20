import React from 'react';
import ReactDOM from 'react-dom';
import './resources/css/app.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { firebase } from './firebase';

//reveive user props from ReactDOM.render(<App user={user}/>
const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>

  )
}

firebase.auth().onAuthStateChanged((user) => {
  // console.log(user);
  ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})



