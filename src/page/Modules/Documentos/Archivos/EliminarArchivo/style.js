import { makeStyles } from '@material-ui/core/styles';

export const useStyles =  makeStyles(theme=>({
    containerPrincipalCategoria:{
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
        padding: '0px 0px 10px 0px ',
        marginBottom: '20px'
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
        marginBottom: '20px'
    },
    errorMessageContainerSecondary: {
        backgroundColor: '#FDECEA',
        textAlign: 'center',
        borderBottom: '1px solid #F00000',
        borderTop: '1px solid #F00000',
        padding: '10px 0px',
        marginTop: '20px',

    },    
    errorMessageText: {
        fontWeight: 'bold',
    },
    errorMessageButtons:{
        '& > *': {
            margin: theme.spacing(2),
        },

    },
    mobileIcon:{
        ['@media (max-width: 1920px)']:{ //desktop
            width: '50px',
            height: '50px',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '50px',
            height: '50px',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '50px',
            height: '50px',
        },
       '@media (max-width:768px)':{ //ipad
            width: '50px',
            height: '50px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '50px',
            height: '50px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '50px',
            height: '50px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '40px',
            height: '40px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '40px',
            height: '40px',
        }, 
    },       
}));