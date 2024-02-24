import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    contenedorPrincipalLogin:{
        height: "100%",
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        flexDirection: 'column',
        backgroundImage: `url(/assets/waveLogin.svg)`,
        backgroundRepeat: "no-repeat",
        ['@media (max-width: 1920px)']:{ //desktop
            // padding: '0px 700px'
        },
        ['@media (max-width:1366px)']:{ //ipad
            // padding: '0px 350px'
        },
        ['@media (max-width:1024px)']:{ //ipad
            // padding: '0px 50px'
        },
        ['@media (max-width:768px)']:{ //ipad
            padding: '0px 50px'
        },
        ['@media (max-width: 460px)']:{ //mobile 
            padding: '0px 50px'
        },
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            padding: '0px 30px'
        },
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            padding: '0px 10px'
        },
    },
    waveImage: {
        width: '100%',
    },
    contenedorSecundarioLogin: {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '20px',
        // backgroundImage: `url(/assets/waveLogin.svg)`,
        backgroundImage: `url(/assets/waveContainerLogin.svg)`,
        backgroundRepeat: "no-repeat",
        padding: '15px 0px',
        boxShadow: '2px 2px 25px #1d5079',
        border: '1px solid #1d5079',
        ['@media (max-width: 1920px)']:{ //desktop
            padding: '15px 0px',
            width: '460px',
        },
        ['@media (max-width: 768px)']:{ //mobile 
            padding: '15px 0px',
        },        
        ['@media (max-width: 500px)']:{ //mobile 
            padding: '15px 0px',
            width: '100%',
        },        
        ['@media (max-width: 430px)']:{ //mobile Iphone 14 pro max
            padding: '15px 0px'
        },        
        ['@media (max-width: 390px)']:{ //mobile Iphone 14 normal
            padding: '15px 0px'
        },
        ['@media (max-width: 320px)']:{ //desktop
            padding: '10px 0px'
        },
    },
    formControlLogin: {
        width: '-webkit-fill-available',
        ['@media (max-width: 1920px)']:{ //desktop
            margin: '10px',
        },
        // ['@media (max-width: 460px)']:{ //mobile
        //     margin: '5px 10px',
        // },
    },    
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#20568E',
        margin: '0px 0px 15px 0px',
        padding: '0px 15px',
        ['@media (max-width:2560px)']:{ //ipad
            fontSize: '1.2rem'
        },
        ['@media (max-width: 768px)']:{ //mobile   
            fontSize: '1.1rem'
        },
        ['@media (max-width: 320px)']:{ //mobile   
            fontSize: '1.1rem'
        },
    },   

    loginButton: {
        backgroundColor: '#20568E',
        color: 'white',
        padding: '5px 30px',
    },
    loginIcon: {
        color: '#20568E',
    },
    passwordButton: {
        color: '#20568E',
    }
}));
