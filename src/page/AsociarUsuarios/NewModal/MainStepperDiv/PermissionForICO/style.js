import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({

   root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      // margin: 'auto',
      paddingBottom: "0px",

      maxWidth: 900,
      minWidth: 900,
      "&:nth-child(2)": {
        marginTop: 5,
        marginBottom: 0,
      },      
      "&:nth-child(3)": {
        marginTop: 0,
        marginBottom: 5,        
      },      
    },
    image: {
      width: 70,
      height: 70,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    
   sendButton:{
      marginTop: 25,
      background: 'linear-gradient(45deg, #066bbd 30%, #63aaea 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
   },
   uploadButton:{
    background: 'linear-gradient(45deg, #066bbd 30%, #63aaea 90%)',
    color: 'white',
   },
   comboBox: {
     //width: '200px'
     textAlign: 'left',
     marginLeft: '20px'
   }

}))