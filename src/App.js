import React, {
  useRef,
  useEffect
} from 'react';
// import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Page from './pages/Page';

import firebase from 'firebase/app';

// import './App.css';
import theme from './theme';
import axios from 'axios';

const ErrorPage = (props) => {
  return(
    <h1>404: Page not found</h1>
  )
};

// axios.defaults.baseURL = 'https://us-central1-team1604-e68a9.cloudfunctions.net/api';

function App() {

  const authObserver = useRef();

  useEffect(() => {
    authObserver.current = firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('Logged in');
      }
      else {
        console.log('Logged out');
      }
    })
  }, []);

  return (
    <>
      <CssBaseline/>
      <MuiThemeProvider
        theme={theme}
      >
        <Router>
          <Nav/>
          <Page>
            <Switch>

                <Route exact path="/">
                  <Landing/>
                </Route>

                <Route exact path="/signup">
                  <Signup/>
                </Route>

                <Route exact path="/chat">
                  <Chat/>
                </Route>            

                <Route exact path="/match">
                  <Match/>
                </Route>

                <Route exact path="/profile">
                  <Profile/>
                </Route>            

                <Route>
                  <ErrorPage/>
                </Route>

            </Switch>
          </Page>
        </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
