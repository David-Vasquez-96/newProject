import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    headerPrincipal:{
        width: '100%',
        // height: '100%',
        textAlign: 'center',
        background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px 0px 15px 0px',
        // padding: '50px 15px 15px 15px',
    },
    waveImage: {
        width: '100%',
    },
	img: {
        ['@media (max-width: 1920px)']:{ //desktop
            width: '180px',
            height: '180px',
        },        
        ['@media (max-width:1366px)']:{ //ipad
            width: '180px',
            height: '180px',
        },        
        ['@media (max-width:1024px)']:{ //ipad
            width: '180px',
            height: '180px',
        },
       '@media (max-width:768px)':{ //ipad
            width: '180px',
            height: '180px',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            width: '160px',
            height: '160px',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            width: '150px',
            height: '150px',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '140px',
            height: '140px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '130px',
            height: '130px',
        },        
	},
    h1:{
        textAlign: 'center',
        color: 'white',
        textDecoration: 'overline double',
        margin: 0,
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
}));