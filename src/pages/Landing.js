import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import Grid  from "@material-ui/core/Grid";
import InfoArea from "../components/InfoArea/InfoArea.js";


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
          <h2 className={classes.title}>Let{"'"}s talk about COVID-19</h2>
          <h5 className={classes.description}>
            This is where the women and men can come together to get started with dating.
          </h5>
        </Grid>
      </Grid>
      <div>
      <Grid // 1 of 3
        container
        justify = "center"
        direction = "row"
      >
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
        <InfoArea
            title="Babes"
            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
            icon={Chat}
            iconColor="info"
            vertical
        />
        </Grid>
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
        <InfoArea
            title="Babes"
            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
            icon={VerifiedUser}
            iconColor="success"
            vertical
        />
        </Grid>
        <Grid
          item
          xs={12} sm={12} md={4}  
        >
        <InfoArea
            title="Babes"
            description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
            icon={Fingerprint}
            iconColor="danger"
            vertical
        />
        </Grid>
      </Grid>

      </div>
    </div>
    )
}