import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    DocumentsPrincipal:{
        // backgroundImage: `url(assets/vectorWave.svg)`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: '100% 100%',
        // display: 'flex',
        // width: '100%',
        // textAlign: 'center',
        // height: '100%',
        // background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // padding: '5px 15px',
        // backgroundColor: 'white'
        backgroundColor: '#F2F6FA',
        padding: '15px 0px',
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
    listDocumentsPrincipal: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        justifyContent: 'center',
        // backgroundColor: 'red',
        padding: '30px 0px',
        textAlign: 'center',
    },
    alert: {
        margin: '0px 0px',
    },    
}));