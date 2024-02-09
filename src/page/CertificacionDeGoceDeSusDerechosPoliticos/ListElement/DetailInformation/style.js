import {  makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root:{
        marginLeft:20,
        marginRight:20,
       '@media (max-width: 460px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    hide: {
        display: 'none',
    },
    show: {
        display: 'inline',
    },
  }));
  
 
