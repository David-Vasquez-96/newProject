import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        background: 'white',
        padding: '20px',
    },
    title: {
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