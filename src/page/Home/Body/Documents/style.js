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
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        padding: '30px 0px',
    },
    listDocumentsSecondary: {
        // backgroundColor: 'white',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150px',
        height: '150px',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '50px 100px',
        },
        ['@media (max-width:1366px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
       '@media (max-width:768px)':{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile 
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            flexDirection: 'row',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            flexDirection: 'column',
            margin: '5px',
        },        
    },
    cardPrincipal: {
        borderRadius: '50%', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
        ['@media (max-width: 1920px)']:{ //desktop
            width: '150px',
            height: '150px',
        },
        ['@media (max-width:1366px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
       '@media (max-width:768px)':{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile 
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
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
    mobileIcon:{
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '50px 100px',
        },
        ['@media (max-width:1366px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
       '@media (max-width:768px)':{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile 
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            width: '60px',
            height: '60px',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            width: '60px',
            height: '60px',
        }, 
    },     
    cardTitle: {
        fontWeight: 'bold',
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '1.5rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
        },
        ['@media (max-width:1024px)']:{ //ipad
        },
       '@media (max-width:768px)':{ //ipad
        },
        ['@media (max-width: 460px)']:{ //mobile 
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },        
    }, 
}));