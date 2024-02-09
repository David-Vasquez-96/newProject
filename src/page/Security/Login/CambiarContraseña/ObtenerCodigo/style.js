import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },    
    colorComponente:{
        backgroundColor: 'white',
        borderRadius: '20px',
        paddingTop: '20px',
        borderTop: '10px solid #1E5280;',
    },
    colorBoton:{
        margin: theme.spacing(1),
        backgroundColor: "#1C4E78",
        color: "#fff",
        with: "auto",
    },
    marginBoton:{
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    marginText:{
        paddingLeft: '10px',
    }, 
}))