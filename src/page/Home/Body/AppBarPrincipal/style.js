import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        justifyContent: 'center',
    },    
    toolbar: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'white',
    },
    appTitle: {
        flexGrow: 1,
        marginRight: theme.spacing(2),
        alignItems: 'center',
        color: '#fff',
        display: 'flex',
        textDecoration: 'none',
        wordWrap: 'break-word',
        '&:hover':{
            textDecoration: 'none',
            color: 'white',
        },
        '@media (max-width:2560px)':{ //ipad
            fontSize: '1rem'
        },
        '@media (max-width:768px)':{ //ipad
            fontSize: '0.9rem'
        },
        '@media (max-width:460px)':{ //ipad
            fontSize: '0.8rem'
        },
        '@media (max-width: 415px)':{ //mobile   
            fontSize: '0.7rem',
        }
    },
    appIcon: {
        width: 30,
        height: 30, 
        ['@media (max-width:2560px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
        ['@media (max-width:768px)']:{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile   
            width: 30,
            height: 30, 
        },
        ['@media (max-width: 320px)']:{ //mobile   
            width: 30,
            height: 30, 
        }        
    },
    rootMenu: {
        display: 'flex',
        ['@media (max-width:2560px)']:{ //mobile
            flexDirection: 'row',
        },
        ['@media (max-width:430px)']:{ //mobile
            flexDirection: 'column',
        }        
    },
    containerInformation:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        textAlign: 'center',
    },
    typographyInformation: {
        marginRight: theme.spacing(1),
    },
    paper: {
        marginRight: theme.spacing(2),
    },            
}));