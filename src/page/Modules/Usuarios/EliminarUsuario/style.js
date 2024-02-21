import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        background: 'white',
    },
    errorMessageContainer: {
        backgroundColor: '#FDECEA',
        textAlign: 'center',
        borderBottom: '1px solid #F00000',
        padding: '0px 0px 10px 0px '
    },
    errorMessageIcon: {
        color: '#F00000',
        fontSize: 60,
    },
    errorMessageTitle: {
        fontWeight: 'bold',
    },
    componente: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    errorMessageContainerSecondary: {
        backgroundColor: '#FDECEA',
        textAlign: 'center',
        borderBottom: '1px solid #F00000',
        borderTop: '1px solid #F00000',
        padding: '10px 0px'
    },    
    errorMessageText: {
        fontWeight: 'bold',
    },
    errorMessageButtons:{
        '& > *': {
            margin: theme.spacing(2),
        },

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