import React from 'react';
import logo from './logo.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Nav from './components/Nav';

// import './App.css';
import theme from './theme';

const ErrorPage = (props) => {
  return(
    <h1>404: Page not found</h1>
  )
};

function App() {
  return (
    <>
      <CssBaseline/>
      <MuiThemeProvider
        theme={theme}
      >
        <Router>
          <Nav/>
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
        </Router>
      </MuiThemeProvider>
    </>
  );
}

export default App;
