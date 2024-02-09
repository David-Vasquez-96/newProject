import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    message: {
        marginLeft: '5%',
        marginRight: '5%',
    },
    circularProgress: {
        "&>div": {
            color: "#fff",
            width: "25px !important",
            height: "25px !important",
            marginRight: 7,
        }
    },
    button: {
        margin: 'auto',
        marginLeft: '45%',
        fontSize: '2em'
    },


    //New Styles
    signupContainer: {
        width: '100%',
        height: '100%',
        maxWidth: '2000px',
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(/img/loginBack.svg)`,
        '@media (max-width:768px)': { // ipad
            backgroundImage: `url(/img/ipadBack.svg)`,
        },
        '@media (max-width:460px)': { // mobil
            marginTop: '-1%',
            backgroundImage: `url(/img/movil.svg)`,
        }
    },
    signupBox: {
        height: 'auto',
        margin: 'auto',
        padding: '1% 1% 1% 1%',
        position: 'relative',
        textAlign: 'center',
        background: '#ffffff',
        width: "100%",
        '@media (max-width:768px)': { // ipad
            width: '47%',
            marginTop: '14%',

        },
        '@media (max-width:460px)': { // mobil
            marginTop: '0%',
            background: 'transparent',
            borderRadius: 'none',
            boxShadow: 'none',
            padding: '3% 9% 1% 9%',
            width: 'auto',
        },
    },

    colorComponente: {
        backgroundColor: "white",
        alignItems: "center",
        flexFlow: "row-wrap",
        border: "1px solid  #cccccc ",
        borderRadius: "20px",
        position: "relative",
        width: "100%",
        overflow: "auto",
        paddingLeft: "0px",
        paddingRight: "0px",
    },

    root: {
        paddingLeft: "100px",
        paddingRight: "100px",
        // paddingLeft: '30px',
        // paddingRight: '30px',
    },
    formTitle: {
        marginTop: 20,
    },

    //Buttons grid

    buttonsGrid: {
        marginTop: "15px",
    },

    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    icon: {
        marginRight: 7,
    },

    lineaDegradadaBottom: {
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 4,
        background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
    },



    //Finish news styles


    title: {
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    },
    content: {
        marginLeft: '2em'
    },

    checkText: {
        fontSize: '14px',
        textAlign: 'justify'
    },
    inputContainer: {
        marginTop: '40px',
        marginBottom: '40px'
    },

    gridContainer: {
        display: 'flex',
        justifyContent: 'center',

    },

    checkBoxContainer: {
        display: 'flex',
        justifyContent: 'center'

    },

    textInfoClass: {
        fontWeight: 'bold'
    }
}));
