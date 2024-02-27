import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipalProcess:{
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
}));