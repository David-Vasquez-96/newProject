import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
        textAlign: 'center',
        color: 'black',
        fontFamily: 'roboto',
        margin: 0,
       '@media (max-width:2000px)':{ // web
            fontSize: '1rem',
        },
       '@media (max-width:1000px)':{ // web
            fontSize: '1rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '1rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize: '1rem',
            marginRight: '10%',
        },

        padding: 0,
        marginBottom: -2,
        // fontWeight: 600,
    //     fontSize: '1.1rem',
    //     textAlign: "center",
    //    '@media (max-width : 1024px)':{
    //         fontSize: 15   
    //     },
    //    '@media (max-width : 768px)':{
    //         height: '23%'        
    //     },
    //    '@media (max-width : 460px)':{
    //         height: '19%',
    //         top: '-1%',        
    //     },
    },
    registerImage: {
        width: 70,
        height: 70,
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
        borderRadius: '0px 0px 20px 20px',
        "&:hover":{
            textDecoration: "none",
            backgroundColor: "#9D9D9D",
            borderRadius: '0px 0px 20px 20px',
        }
    },
    listItemIcon:{
        minWidth: 40,
    },
    listButton:{
        // textAlign: 'center',
        color: 'black',
        fontFamily: 'roboto',
       '@media (max-width:2000px)':{ // web
            fontSize: '0.845rem',
        },
       '@media (max-width:1000px)':{ // web
            fontSize: '0.845rem',
        },
       '@media (max-width:768px)':{ //ipad
            fontSize: '0.845rem',
        },
       '@media (max-width:415px)':{ //mobile
            fontSize: '0.845rem',
            marginRight: '10%',
        },

        margin: "3% 0% 3% 0%",
    },
    cardContent: {
        display: "contents",
    },
    icon:{
        color: '#066BBD',
        marginRight: 20,
        width: 33
    },
    lineaDegradada:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 3,
        background: `rgb(2,0,36)`,
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
    cardContainerMenu: {
        backgroundColor: '#EDEDED',
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
        alignItems: "stretch",
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "20px 0",
        marginTop: 0,
        paddingTop: "20px",
        "@media (max-width:768px)": {
            //mobile
            paddingTop: "0px",
          },
      },
      cardContainerMenuLarge: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-around",
        alignItems: "stretch",
        maxWidth: "1500px",
        margin: "0 auto",
        padding: "40px 0",
        marginTop: 0,
        paddingTop: "20px",
        "@media (max-width:768px)": {
            //mobile
            // paddingTop: "0px",
          },
      },
      card: {
            borderTop: '10px solid #1E5280',
            display: "initial",
            width: "355px",
            background: "#fff",
            borderRadius: "20px",
            boxShadow: "0px 5px 6px 1px rgb(72 72 72 / 29%)",
            padding: "10px",
            textAlign: "center",
            marginBottom: "2%",
            margin: "20px",
            "&:hover":{
            transform: 'scale(0.7)'
            }
      },

     /*  .card {
        background: #fff;
        border-radius: 10px;  
        box-shadow: 0px 5px 6px 1px rgb(72 72 72 / 29%);
        padding: 10px;
        text-align: center;
        margin-bottom: 2%;
        margin: 20px
      } */
      lineaDegradadaBottom:{
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 2,
        // background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
        background: 'rgb(0,0,0)',
        background: 'linear-gradient(90deg, rgba(0,0,0,1) 11%, rgba(139,138,138,1) 72%)',
    },
}));