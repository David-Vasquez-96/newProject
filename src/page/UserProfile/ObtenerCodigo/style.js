import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100% !important',
        margin: '0px 10px',
        padding: '0px 10px',
        overflow: "auto",
    },
    container:{
        // height: '100% !important',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        paddingTop: '30px',
        backgroundColor: 'white',
        borderTop: '10px solid #1E5280;', 
        borderRadius: '20px',
        width: "100%",
        paddingLeft: '0px',
        paddingRight: '0px',        
    },
    mobileIcon:{
        width: '100%',
        height: '100px',     
    },    
    marginBoton:{
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    typography: {
        margin: '10px 5px'
    },
}))