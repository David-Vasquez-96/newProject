import {  makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    avatar:{
        backgroundColor:"#E0991F"
    },
    totalToPay:{
      textAlign:'center'
    }
  }));
  
 
