import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    mobileContainer: {
        alignItems: "center",
        backgroundSize: "contain",
        backgroundImage: `url(/background/EllipseHeader.svg)`,
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative!important",
    },

    mobileHeaderDiv: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },

    mobileIcon:{
        margin: "40px 0px 13px",
        width: 100,

    },

    mobileTitleDivHeader:{
        color: "#ffff",
        fontSize: "1rem",
        fontWeight: "bold",
    },

    appIcon: {
        width: 35,
        height: 25, 
        paddingRight: 10
    },
    
    accordionDetails: {
        flexDirection: "column"
    },
    
    accordionIcon: {
        marginRight: 12,
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#205690",
        boxShadow: "none",
    },
    appTitle: {
        color: '#fff',
        cursor: 'pointer',
        lineHeight: '60px',
        verticalAlign: 'middle',
        fontSize: '1.7em',
        fontWeight: '700',
        fontFamily: 'sans-serif',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        wordWrap: 'break-word',
        '&:hover':{
            textDecoration: 'none',
            color: 'white',
        }
    },

    backGround:{  
        backgroundImage: "url(/background/Header.svg)",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
        backgroundColor: "rgb(250,250,252)",
        height: "100%",
        top: '-1%',
        '@media (max-width : 1080px)':{
            backgroundSize: "inherit",
        }, 
    },

    rootStyle: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    root: {
        boxSizing: "border-box",
        marginTop: 30,
        "&:after": {
            display: "table",
            clear: "both",
        },          
        '@media (max-width : 768px)':{
            display: "flex"
        },    
        '@media (max-width : 460px)':{
            display: "table",
            position: "fixed"
        },
    },
    column: {
        float: "left",
        padding: "10px",
        margin: 25,
        '@media (max-width : 1024px)':{
            width: "32%",     
        },
        '@media (max-width : 768px)':{
            display: "table",
            margin: 6,      
            marginBottom: "20px",
            width: "45%",
        },
    },
    cardContainer: {
        background: 'white',
        boxShadow: '0px 5px 6px 1px rgb(72 72 72 / 29%)',
        display: "flex",
        flexDirection: "column",
        marginRight: 10,
        width: 318,
        height: "auto",
        alignItems: "center",
        borderRadius: 10,
        flexFlow: "row-wrap",
        position: "relative",
        transform: "translate(-50px, -50px)",
        top: "50%",
        left: "50%",
        paddingBottom: 15,
        '@media (max-width : 2000px)':{
            left: "20%",
            transform: "translate(90%, 50%)",
        },
        '@media (max-width : 1440px)':{
            transform: "translate(50%, 30%)",
            left: "50%",
        },
        '@media (max-width : 1280px)':{
            transform: "translate(25%, 30%)",    
        },
        '@media (max-width : 1024px)':{
            transform: "translate(0%, 30%)",    
        },
    },
    cardTitle: {
        padding: 0,
        marginBottom: -2,
        fontFamily: "sans-serif",
        fontWeight: 600,
        fontSize: '1.1rem',
        textAlign: "center",
        '@media (max-width : 1024px)':{
            fontSize: 15   
        },
        '@media (max-width : 768px)':{
            height: '23%'        
        },
        '@media (max-width : 460px)':{
            height: '19%',
            top: '-1%',        
        },
    },
    registerImage: {
        width: 80,
        height: 80,
        marginTop: 10,
        '@media (max-width : 1024px)':{
            width: 50,
            height: 50,
        },
        '@media (max-width : 768px)':{
            height: '23%'        
        },
        '@media (max-width : 460px)':{
            height: '19%',
            top: '-1%',        
        },
    },
    listItem:{
        paddingTop: 3,
        paddingBottom: 3,
        width: "100%",
        "&:hover":{
            textDecoration: "none",
            backgroundColor: "rgba(82, 174, 255, 0.1)",
        }
    },
    listItemIcon:{
        minWidth: 40,
    },
    listButton:{
        margin: "3% 0% 3% 0%",
        '@media (max-width : 1024px)':{
            width: 207,
            //height: 20,
            fontSize: 15
        },
        '@media (max-width : 768px)':{
            height: '23%',  
            width: 200,     
        },
        '@media (max-width : 460px)':{
            height: '19%',
            top: '-1%',   
            width: 227,     
        },
    },
    cardContent: {
        display: "contents",
    },
    icon:{
        backgroundColor: "#205690",
        color: '#ffff',
        fontSize: "1rem",
        height: 33, 
        marginRight: 20,
        width: 33,
    },
    lineaDegradada:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 3,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    },
    lineaDegradadaDivider:{
        background: "black",
        display: "inline-flex",
        height: 2,
        left: 0,
        marginTop: "1%",
        marginBottom: "3%",
        opacity: 0.1,
        width: "80%",
    },

    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif',
        color:"black",
        letterSpacing: '0.1px',
       '@media (max-width:2560px)':{ //web
          fontSize:'0.8rem',
        },
       '@media (max-width:1440px)':{ //web
          fontSize:'0.8rem',
          minWidth: 200,
        },
       '@media (max-width:1025px)':{ //web
          fontSize:'0.8rem',
          minWidth: 200,
        },
       '@media (max-width:768px)':{ //ipad
            fontSize:'0.8rem',
            minWidth: 150,
            maxWidth: "75%",
        },
       '@media (max-width:426px)':{ //mobile
            fontSize:'0.6rem',
            maxWidth: "75%",
            minWidth: 150,
        },
       '@media (max-width:320px)':{ //mobile
            fontSize:'0.5rem',
            maxWidth: "75%",
        }
    },

    toolbar:{
        minHeight: "62px",
    },

}));