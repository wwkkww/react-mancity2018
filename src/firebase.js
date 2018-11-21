import * as firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCiQUWNJN4yxQajDm9rQhtt8nXLOCffvIU",
  authDomain: "mancity-21790.firebaseapp.com",
  databaseURL: "https://mancity-21790.firebaseio.com",
  projectId: "mancity-21790",
  storageBucket: "mancity-21790.appspot.com",
  messagingSenderId: "529285832774"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const matchesDB = firebaseDB.ref('matches');
const playersDB = firebaseDB.ref('players');
const promotionsDB = firebaseDB.ref('promotions');
const teamsDB = firebaseDB.ref('teams');


export { firebase, matchesDB, teamsDB, playersDB, promotionsDB, firebaseDB as default };