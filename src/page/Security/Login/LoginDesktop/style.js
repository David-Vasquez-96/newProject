import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        margin:'20px 50px',
        backgroundColor: "#FFFFFF",
        height: '85%',
        // "@media (max-height:930px)": {
        //     height: '100%',
        // },        
        // "@media (max-height:768px)": {
        //     height: '88%',
        // },        
    },
    gridItemForm:{
        backgroundColor: '#FFFFFF',
    },
    gridItemFormContainer:{
        padding: '30px 30px'
    },
    gridItemDescripcion:{
        backgroundColor: '#F5F9FF',
    },
    gridItemDescripcionContainer:{
        padding: '30px 30px'
    },
    paper: {
        padding: theme.spacing(4),
        margin: 'auto',
    },    
    mobileSpan:{
        fontSize: "1rem",
        fontWeight: 600,
        fontFamily: 'Roboto',
        margin: "3px auto",
    },

    mobileSpanLink:{
        fontSize: "1rem",
        fontWeight: 600,
        fontFamily: 'Roboto',
        margin: "3px auto",
    },
	image: {
        textAlign: 'center',
        paddingBottom: '20px',
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},   
    containerDivider:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexwrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider:{
        width: '100%',
    },
    


    loginContainer: {
        alignContent: "center",
        backgroundColor: "#EFF3F8",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        height: "inherit",
        justifyContent: "center",
        position: "relative!important",
        // height: "90%",
        height: "100%",
        "@media (min-width:1476px)": {
        // web
        backgroundImage: `url(/background/loginV2.png)`,
        backgroundRepeat: "no-repeat",
        },
        "@media (max-width:1475px)": {
        // web
        backgroundImage: `url(/background/Portada.png)`,
        backgroundRepeat: "no-repeat",
        },
        "@media (max-width:1050px)": {
        // ipad
        backgroundImage: `url(/img/ipadBack.svg)`,
        display: "inline-block",
        top: "2%",
        left: "3%",
        width: "95%",
        },
        "@media (max-width:768px)": {
        // ipad
        backgroundImage: `url(/img/ipadBack.svg)`,
        display: "inline-block",
        top: "2%",
        left: "3%",
        width: "95%",
        },
        "@media (max-width:460px)": {
        backgroundImage: `url(/img/movil.svg)`,
        },

        "@media (max-width:1050px)": {
        backgroundImage: `url(/img/ipadBack.svg)`,
        display: "inline-block",
        top: "2%",
        left: "3%",
        width: "95%",
        height: "90%",
        "@media (max-height:780px)": {
            height: "120%",
        },
        "@media (max-height:652px)": {
            height: "150%",
        },
        "@media (max-height:533px)": {
            height: "180%",
        },
        "@media (max-height:455px)": {
            height: "210%",
        },
        "@media (max-height:400px)": {
            height: "260%",
        },
        "@media (max-height:335px)": {
            height: "300%",
        },
        },

        "@media (max-width:1000px)": {
        "@media (max-height:800px)": {
            height: "120%",
        },
        "@media (max-height:680px)": {
            height: "150%",
        },
        "@media (max-height:550px)": {
            height: "180%",
        },
        "@media (max-height:470px)": {
            height: "200%",
        },
        "@media (max-height:420px)": {
            height: "250%",
        },
        "@media (max-height:355px)": {
            height: "280%",
        },
        },

        "@media (max-width:800px)": {
        height: "90%",
        // "@media (max-height:840px)": {
        //   height: "95%",
        // },
        "@media (max-height:800px)": {
            height: "110%",
        },
        "@media (max-height:735px)": {
            height: "125%",
        },
        "@media (max-height:650px)": {
            height: "145%",
        },
        "@media (max-height:570px)": {
            height: "165%",
        },
        "@media (max-height:505px)": {
            height: "195%",
        },
        "@media (max-height:400px)": {
            height: "255%",
        },
        "@media (max-height:350px)": {
            height: "295%",
        },
        },

        "@media (max-width:700px)": {
        "@media (max-height:360px)": {
            height: "275%",
        },
        },

        "@media (max-width:600px)": {
        height: "90%",
        "@media (max-height:840px)": {
            height: "120%",
        },
        "@media (max-height:695px)": {
            height: "140%",
        },
        "@media (max-height:600px)": {
            height: "160%",
        },
        "@media (max-height:600px)": {
            height: "160%",
        },
        "@media (max-height:530px)": {
            height: "190%",
        },
        "@media (max-height:455px)": {
            height: "230%",
        },
        "@media (max-height:390px)": {
            height: "260%",
        },
        "@media (max-height:360px)": {
            height: "290%",
        },
        },
        //Ancho de Chrome en lo más delgado posible.
        "@media (max-width:500px)": {
        //Todos los de acá funcionan cuando el width es 500px.
        "@media (min-height:800px)": {
            height: "90%",
        },
        "@media (max-height:799px)": {
            height: "100%",
        },
        "@media (max-height:780px)": {
            height: "110%",
        },
        "@media (max-height:720px)": {
            height: "120%",
        },
        "@media (max-height:655px)": {
            height: "130%",
        },
        "@media (max-height:610px)": {
            height: "140%",
        },
        "@media (max-height:570px)": {
            height: "150%",
        },
        "@media (max-height:535px)": {
            height: "160%",
        },
        "@media (max-height:510px)": {
            height: "170%",
        },
        "@media (max-height:480px)": {
            height: "185%",
        },
        "@media (max-height:450px)": {
            height: "200%",
        },
        "@media (max-height:415px)": {
            height: "220%",
        },
        "@media (max-height:385px)": {
            height: "260%",
        },
        "@media (max-height:340px)": {
            height: "300%",
        },
        },

        //Ancho de iPhone 6/7/8 Plus
        "@media (max-width:414px)": {
        height: "110%",
        //iPhone 6/7/8 Plus Altura
        "@media (max-height:736px)": {
            height: "120%",
        },
        "@media (max-height:675px)": {
            height: "150%",
        },
        "@media (max-height:555px)": {
            height: "190%",
        },
        },

        //Ancho de iPhone X
        "@media (max-width:375px)": {
        height: "110%",
        "@media (max-height:812px)": {
            height: "110%",
        },
        "@media (max-height:775px)": {
            height: "125%",
        },
        //iPhone 6/7/8 Altura
        "@media (max-height:670px)": {
            height: "135%",
        },
        "@media (max-height:600px)": {
            height: "175%",
        },
        "@media (max-height:520px)": {
            height: "210%",
        },
        "@media (max-height:400px)": {
            height: "240%",
        },
        },

        //Ancho de Galaxy S
        "@media (max-width:360px)": {
        height: "120%",
        //Galaxy S9 Plus Altura
        "@media (max-height:740px)": {
            height: "125%",
        },
        "@media (max-height:720px)": {
            height: "135%",
        },
        "@media (max-height:665px)": {
            height: "145%",
        },
        //Galaxy S5 Altura
        "@media (max-height:640px)": {
            height: "150%",
        },
        "@media (max-height:600px)": {
            height: "175%",
        },
        "@media (max-height:520px)": {
            height: "210%",
        },
        "@media (max-height:400px)": {
            height: "240%",
        },
        "@media (max-height:370px)": {
            height: "280%",
        },
        },

        //Ancho de iPhone 5
        "@media (max-width:320px)": {
        height: "120%",
        "@media (max-height:795px)": {
            height: "125%",
        },
        "@media (max-height:735px)": {
            height: "145%",
        },
        "@media (max-height:620px)": {
            height: "175%",
        },
        //iPhone 5 Altura
        "@media (max-height:568px)": {
            height: "175%",
        },
        "@media (max-height:520px)": {
            height: "210%",
        },
        "@media (max-height:400px)": {
            height: "240%",
        },
        },
    },

    loginBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },

    title: {
        textAlign: 'center',
        color: '#1F558B',
        fontSize: 25,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        margin: 'auto',
        padding: '5% 0%',
        ['@media (max-width:1024px)']:{ // web
            // fontSize: '2rem',
        },
        ['@media (max-width:768px)']:{ // ipad
            // fontSize: '3rem',
            // padding: '3% 2%',
        },
        ['@media (max-width:460px)']:{ // ipad
            // fontSize: '1.7rem',
            // padding: '0% 7%',            
            // marginTop: '0%',
        },
    },
    subTitleForm : {        
        color: 'black',
        fontSize: 20,        
        fontFamily: 'roboto',
        fontWeight: '500',
        margin: '0 auto',
        textAlign: 'center',
    },    
    titleLeft: {
        color: `rgb(118, 123, 121)`,
        fontWeight: "500",
        marginTop: "0%",
        marginBottom: "3%",
        textAlign: "center",
    },

    //
    // **************************************************************
    //

    footer:{
        background: "red",
                    "&>header":{
                        position: "inherit !important"
                    }
    },

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
    }

}));
