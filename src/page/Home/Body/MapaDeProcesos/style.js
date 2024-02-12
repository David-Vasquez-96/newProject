import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    ContainerPrincipal:{
        backgroundColor: '#F2F6FA',
        padding: '15px 10px',
    },
    titlePrincipal:{
        textAlign: 'center',
        color: 'black',
        margin: 0,
        padding: '0px 15px',
        wordWrap: 'break-word',
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
    containerImage: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mobileIcon:{
        paddingTop: '10px',
        ['@media (max-width: 1920px)']:{ //desktop
            width: '60%',
            height: '100%',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '60%',
            height: '100%',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '60%',
            height: '100%',
        },
       '@media (max-width:768px)':{ //ipad
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '100%',
            height: '100%',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '100%',
            height: '100%',
        }, 
    },      
}));