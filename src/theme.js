import {createMuiTheme} from '@material-ui/core/styles';

const palette = {
    primary: { main: '#263238' },
    secondary: { main: '#F5F5F5' },
    background: '#4169E1', //background color
    type: 'light', //or 'light'
    text: {
      primary: "#aaa",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },
    textColor: '#000000',
    containerColor: '#F2F2F2',
};

const styles = {
  card: {
    backgroundColor: palette.containerColor
  },
  typography: {
    color: palette.primary.main,
    textAlign: 'center'
  },
  typographyButton: {
    color: palette.primary.main,
    textTransform: 'capitalize'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4169E1',
  },
  textField: {

    // Error text
    '& .MuiFormHelperText-root': {
      color: 'black'
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& .MuiTypography-root': {
        color: palette.primary.main
    }
}

};

export default createMuiTheme({
    palette,
    styles,
})