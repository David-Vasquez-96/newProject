import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    colorComponente:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTop: '10px solid #1E5280;', 
        borderRadius: '20px',                
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft:0,
        paddingRight:0,
    },
    title:{
        textAlign: 'justify',
        fontSize:'1.1rem',
    }, 
    typography:{
        textAlign: 'justify',
        margin: '10px 0px',
        padding: '10px',
        '@media (max-width:2560px)':{ //web
            fontSize:'1.1rem',
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'1rem',
        }    
    }, 
    button: {
        margin: '20px 0px'
    }    
}))