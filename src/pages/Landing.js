import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
import Theatres from "@material-ui/icons/Theaters";
// core components
import Grid  from "@material-ui/core/Grid";
import Typography  from "@material-ui/core/Typography";
import InfoArea from "../components/InfoArea/InfoArea.js";

import {RowCreator, BlockCreator, ColumnCreator} from '../inc/PageCreator';

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
  },
  grid: {
    // backgroundColor: palette.secondary.main
  }

}));

// Basic fucntions for loadiong the page as it handles action

export default (props) => {
    const classes = useStyles();
    return (
    <div className={classes.section}>
      <Grid // Column next to login prompt
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={6} sm={6} md={4}  
        >
        <InfoArea
            title="Match with other people who share the same interests as you!"
            description=""
            icon={Favorite}
            iconColor="info"
            vertical
            
        />
        </Grid>
        <Grid
          item
          xs={6} sm={6} md={4}  
        >
        <InfoArea
            title="Connect with people through direct messaging."
            description=""
            icon={EmojiPeople}
            iconColor="success"
            vertical
        />
        </Grid>
        <Grid
          item
          xs={6} sm={6} md={4}  
        >
        <InfoArea
            title="Select from a database of movies and music!"
            description=""
            icon={Theatres}
            iconColor="danger"
            vertical
        />
        </Grid>
      </Grid>
    </div>
    )
}