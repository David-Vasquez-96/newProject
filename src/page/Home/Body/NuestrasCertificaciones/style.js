import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    ContainerPrincipal:{
        backgroundColor: 'white',
        padding: '15px 10px',
    },
    titlePrincipal:{
        textAlign: 'center',
        color: '#034DA1',
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
    listaDeCertificacionesPrincipal: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '30px 0px',
    },    
    containerImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px 15px',
    },
    mobileIcon:{
        paddingTop: '10px',
        ['@media (max-width: 1920px)']:{ //desktop
            width: '130px',
            height: '130px',
        },
        ['@media (max-width:1366px)']:{ //ipad
            width: '120px',
            height: '120px',
        },
        ['@media (max-width:1024px)']:{ //ipad
            width: '110px',
            height: '110px',
        },
       '@media (max-width:768px)':{ //ipad
            width: '100px',
            height: '100px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '90px',
            height: '90px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '90px',
            height: '90px',
        }, 
    },    
}));