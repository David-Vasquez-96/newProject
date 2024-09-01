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
    containerGeneral: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
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
    containerText:{
        background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
        borderRadius: "20px",
        textAlign: 'center',
        padding: '10px 0px',
        margin: '10px 0'
    },
    verticalText:{
        // writingMode: "vertical-lr",
        // textOrientation: "upright",    
        color: "white",
        margin: 0,
        padding: '0px 15px',
        ['@media (max-width: 1920px)']:{ //desktop
            fontSize: '1rem',
        },
        ['@media (max-width:1366px)']:{ //ipad
            fontSize: '1rem',
        },
        ['@media (max-width:1024px)']:{ //ipad
            fontSize: '1rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1rem',
        },
        ['@media (max-width: 460px)']:{ //mobile 
            fontSize: '1rem',
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            fontSize: '1rem',
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },
        ['@media (max-width: 320px)']:{ //mobile Iphone 14 normal
            fontSize: '1rem',
        },         
    },
    containerSecond:{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: '20px 0',
        border: '5px solid #d6eaf8',
        borderRadius: '20px',
        backgroundColor: '#d6eaf8'
    },
    firstContainer:{
        background: "#1b4f72",
        color: "white",
        borderRadius: "20px",
        marginTop: "0px",
        marginBottom: "30px",       
    },
    firstContainerButtons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    firstButtons:{
        border: '1px solid white',
        color: 'white',
        position: 'relative', zIndex: 1,
    },
    secondContainer:{
        background: "#2874a6",
        color: "white",
        borderRadius: "20px",
        marginTop: "0px",
        marginBottom: "20px",
    },
    secondButtons:{
        border: '1px solid white', 
        backgroundColor: '#5DADE2',
        color: 'white',
        position: 'relative', zIndex: 1,
    },
    thirdContainer:{
        background: "#5dade2",
        color: "white",
        borderRadius: "20px",
        marginTop: "20px",
    },
    thirdButtons:{
        border: '1px solid white', 
        backgroundColor: '#1B4F72',
        color: 'white',
        position: 'relative', zIndex: 1,
    },    
}));