import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    containerPrincipal:{
        textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',

        margin: '48px 0px 15px 0px',
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft:0,
        paddingRight:0,
        backgroundColor: '#EDEDED',
    },
    containerTable: {
        margin: '20px 0px',
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