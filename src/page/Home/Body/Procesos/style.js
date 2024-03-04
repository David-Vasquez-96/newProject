import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    ProcesosPrincipal:{
        backgroundColor: 'white',
        padding: '15px 0px',
    },
    titlePrincipal:{
        textAlign: 'center',
        color: '#034DA1',
        margin: 0,
        padding: '0px 15px',
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '3.5rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '3.5rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '3.3rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '3rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            fontSize: '3rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            fontSize: '2.7rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '2.5rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '2.5rem',
        },
    },
    titleSecondary:{
        textAlign: 'center',
        color: 'black',
        margin: 0,
        padding: '0px 15px',
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '1.3rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '1.3rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '1.3rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1.3rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            fontSize: '1.3rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            fontSize: '1.2rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '1.1rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },
    },
    listaDeProcesosPrincipal: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // justifyContent: 'space-evenly',
        // justifyContent: 'center',
        padding: '30px 0px',
        textAlign: 'center',
    },
    cardProcess: {
        '&:hover': {
            transform: 'scale(1.20)',
            display: 'initial',
            background: '#F2F6FA',
            // border: '5px solid #1E5280',
            borderRadius: '20px',
            textAlign: 'center',
        }        
    }    
}));