import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    contendorCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 15px black',
        borderRadius: '15px',
        margin: '10px',
        // padding: '10px 5px',
        backgroundColor: 'white',
        '&:hover': {
            background: 'darkblue',
            // background: 'linear-gradient(0deg, #1d5079 20%, #205690 62%)',
            color: 'white',
        },
    },
    iconos: {
        width: '100%',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: '1rem',
        // color: '#034DA1',
        fontWeight: 'bold',
    },
    cardSubTitle: {
        fontSize: '1rem',
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