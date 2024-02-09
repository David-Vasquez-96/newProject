import {  makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
      fontWeight: 'bold'
    },
    margen: {
      marginTop: 5
    },

    avatar:{
        backgroundColor:"#1d5079",
        fontSize:"0.8rem",
    },
    lineaDegradadaBottom:{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: 3,
      background: `rgb(2,0,36)`,
      background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
  },
  centrarChip:{
    textAlign:'center',
    paddingTop:5,
},  
  centrarMensaje:{
    textAlign:'center',
},  
  }));
  
 
