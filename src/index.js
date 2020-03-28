import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';

import {
  FirebaseAppProvider
} from 'reactfire';

// import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
  apiKey: "AIzaSyCO_OqdtITLxtHFA_A-uUsNOv5dwVWRkFQ",
  authDomain: "team1604-e68a9.firebaseapp.com",
  databaseURL: "https://team1604-e68a9.firebaseio.com",
  projectId: "team1604-e68a9",
  storageBucket: "team1604-e68a9.appspot.com",
  messagingSenderId: "912282882726",
  appId: "1:912282882726:web:529000285142d4547b9a67",
  measurementId: "G-FTCNPRZ3VV"
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseAppProvider>
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
