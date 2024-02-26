import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    contenedorPrincipal:{
        // textAlign: 'center',
        margin: '48px 0px 15px 0px',
        position: "relative",
        width: "100%",
        height: '100%',
        overflow: "auto",
        paddingLeft:0,
        paddingRight:0,
        backgroundColor: '#EDEDED',
    },
    titlePrincipal:{
        textAlign: 'center',
        color: '#034DA1',
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
    iconButton: {
        marginRight: theme.spacing(2),
    },
    titleSecondary:{
        flexGrow: 1,
        // textAlign: 'center',
        color: 'white',
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
    containerButtons: {
        // width: '100%',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-evenly',
        '& > *': {
            margin: theme.spacing(1),
        },        
    } ,
    buttonSuccess: {
        color: 'white',
        border: '1px solid white'
    },    
    listaDeTiposDeUsuarios: {
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // padding: '30px 0px',
        textAlign: 'center',
        backgroundColor: 'white',
        margin: '10px 10px',
        borderRadius: '20px',
    },
    titleUserType: {
        textAlign: 'center',
        color: 'black',
        margin: 0,
        padding: '15px 0px',
        fontWeight: 'bold',
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
    containerCards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // justifyContent: 'center',
        // padding: '30px 0px',
        textAlign: 'center',
    },
    listaDeDocumentosPrincipal: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        // flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        // justifyContent: 'center',
        // textAlign: 'center',
        backgroundColor: 'white',
        margin: '10px 10px',
        borderRadius: '20px',
    },
    appBar:{
        borderRadius: '20px 20px 0px 0px',
    },
    toolbar: {
        padding: '0px',
    }
}));