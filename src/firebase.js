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

  const database = firebase.database();

  const matchesData = database.ref('matches');

  export { firebase, matchesData, database as default };