import {createMuiTheme} from '@material-ui/core/styles';

const styles = {
    
};

const palette = {
    primary: { main: '#263238' },
    secondary: { main: '#F5F5F5' },
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

export default createMuiTheme({
    palette,
    styles,
})