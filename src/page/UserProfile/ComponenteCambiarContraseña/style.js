import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerProfile: {
        backgroundColor: 'white',
        width: '100%', 
        borderTop: '10px solid #1E5280;', 
        borderRadius: '20px', 
        margin:'20px 0px',
        textAlign: 'center'
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
}))