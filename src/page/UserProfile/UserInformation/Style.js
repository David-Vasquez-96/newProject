import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal:{
        backgroundColor: 'white',
        alignItems: "center",
        borderTop: '10px solid #1E5280;',
        borderRadius: '20px', 
        flexGrow: 1,
    },
    title:{
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '10px 0px 20px 0px',
        '@media (max-width:2560px)':{ //web
            fontSize:'1.3rem',
        },
       '@media (max-width:426px)':{ //mobile
            fontSize:'1.2rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize:'1.1rem',
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'1rem',
        }    
    },
    grid: {
        '@media (max-width:600px)':{ //mobile
            textAlign: 'center'
        } 
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
        '@media (max-width:599px)':{ //mobile
            justifyContent: 'center'
        }         
    },
    contentTitle: {
        margin: '0px 10px',
        fontWeight: 'bold',
    },
    content: {
        margin: '0px 10px',
    },
}))