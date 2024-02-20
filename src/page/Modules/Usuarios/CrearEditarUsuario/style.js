import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        margin: '25px 200px',
        borderTop: '15px solid #80c3ff',
        borderRadius: '10px',
        background: 'white',
        padding: '10px 0px',
        '@media (max-width:768px)':{ //ipad
            margin: '25px'
        },
        ['@media (max-width: 600px)']:{ //mobile 
            margin: '0px 10px',
            padding: '0px'
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            borderTop: '0px',
            borderRadius: '0px',
            margin: '0px'
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            borderTop: '0px',
            borderRadius: '0px',
            margin: '0px'
        },
    },
    titleProceso: {
        color: 'black',
        margin: '10px 0px',
        fontWeight: 'bold',
    },
    formControlInput: {
        width: '45%',
        margin: '1%',
        ['@media (max-width: 768px)']:{ //mobile Iphone 14 normal
            width: '-webkit-fill-available',
            margin: '5px 0px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '300px',
            margin: '5px 0px',
        },
    }    
}));