import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import Grid  from "@material-ui/core/Grid";
//import InfoArea from "../components/InfoArea/InfoArea.js";


const useStyles = makeStyles(({styles, palette}) => ({
  ...styles,
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999"
  }

}));

// Basic fucntions for loadiong the page as it handles action

export default (props) => {
    const classes = useStyles();
    return (
    <div className={classes.section}>
      <Grid // Intro to layout
        container justify="center"
      >
        <Grid
          item
          xs={12} sm={12} md={8}  
        >
          <h2 className={classes.title}>Let{"'"}s talk about dating</h2>
          <h5 className={classes.description}>
            This is where the women and men can come together to get started with dating.
          </h5>
        </Grid>
      </Grid>
      <Grid // 1 of 3
        container
      >
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
        <h1>Hello</h1>
        </Grid>
      </Grid>
      <Grid // 2 of 3
        container 
      >
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
        <h1>Hello</h1>
        </Grid>
      </Grid>
      <Grid // 3 of 3
        container
      >
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
         <h1>Hello</h1>
        </Grid>
      </Grid>

    </div>
    )
}