import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        background: 'white',
        padding: '20px 0px',
    },
    title: {
        color: 'black',
        margin: '10px 0px',
        fontWeight: 'bold',
    },
    formControlInput: {
        width: '-webkit-fill-available',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '10px',
        },
    }    
}));