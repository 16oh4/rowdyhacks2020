import React, {
  useRef,
  useEffect,
  Suspense,
  useState
} from 'react';
// import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import {MuiThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Footer from './components/Footer/Footer';
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authObserver.current = firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('Logged in');
        setLoggedIn(true);
      }
      else {
        console.log('Logged out');
        setLoggedIn(false);
      }
    })
  }, []);

  const loggedOutRoutes = (
    <Switch>
    <Route exact path="/">
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Landing/>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Signup
            loggedIn={loggedIn}
          />
        </Grid>
      </Grid>
    </Route>
    </Switch>
  )

  const loggedInRoutes = (
    <Switch>
      <Route exact path="/chat/:chatID">
        <Chat/>
      </Route>            

      <Route exact path="/match">
        <Suspense
          fallback={<CircularProgress/>}
        >
          <Match/>
        </Suspense>
      </Route>

      <Route exact path="/profile">
        <Suspense
          fallback={<CircularProgress/>}
        >
          <Profile/>
        </Suspense>
      </Route>  

      <Route>
        <ErrorPage/>
      </Route>
    </Switch>
  )

  return (
    <>
      <CssBaseline/>
      <MuiThemeProvider
        theme={theme}
      >
        <Router>
          <Suspense
            fallback={<CircularProgress/>}
          >
            <Nav
              loggedIn={loggedIn}
            />
          </Suspense>
          <Page>
            

                

                {/* <Route exact path="/signup">
                  <Signup
                    loggedIn={loggedIn}
                  />
                </Route> */}

                {loggedIn ? (
                  loggedInRoutes
                ) : (
                  loggedOutRoutes
                )}

          </Page>
          <Footer/>     
        </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
