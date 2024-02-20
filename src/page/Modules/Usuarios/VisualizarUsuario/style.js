import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        background: 'white',
        padding: '20px',
    },
    formControlInput: {
        width: '45%',
        margin: '1%',
        ['@media (max-width: 768px)']:{ //mobile Iphone 14 normal
            width: '-webkit-fill-available',
            margin: '5px 0px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: 'max-content',
            margin: '5px 0px',
        },
    }
}));