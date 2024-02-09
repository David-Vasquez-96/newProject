import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    rootSize: {
        "&>.MuiDialog-paperWidthXl":{
            width: 640,
        },
        "&>..MuiDialog-scrollPaper":{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
        }
    },

    root: {
        margin: 0,
        padding: theme.spacing(2),
    },

    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "red",
    },
    
    dialogContent:{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignContent: "space-around",

        "&>.MuiDialogContent-root":{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignContent: "space-around",
        }
    },

    dialogActions:{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignContent: "space-around",

        "&>.MuiDialogContent-root":{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignContent: "space-around",
        }
    },
    img:{
        // width: "35%",
        // width: 500
        height: 375,
    },
    title: {
        textAlign: "center",
    },
    message:{
        marginLeft: '5%',
        marginRight: '5%',
    },
    circularProgress:{
        "&>div":{
            color:"#fff",
            width:"25px !important",
            height:"25px !important",
            marginRight: 7,
        }
    },
    button:{
        margin: 'auto',
        marginLeft: '45%',
        fontSize: '2em'
    },
    icon:{
        marginRight: 6,
        marginLeft: -6,
    },

    gridList: {
        width: '100%',
        position: 'relative',
        maxHeight: 570,
    },     

    rootLista: {
        alignContent: "center",
        display: "flex",
        justifyContent: "center",
        maxWidth: '100%',
        width: '100%',
    }, 

    colorIcon:{
        color: '#5d6dc7',
    },

    colorChip:{
        border: "1px #040404 solid",
        backgroundColor: 'white',
        color: "#060606",
        fontWeight: "bold",
        fontSize: '1rem',
        margin: "0px 20px 0px 20px"
    },

    appButtonIcon: {
        display: "block",
        fill: "currentColor",
        height: "100%",
    },

    appIndicator: {
        alignItems: "center",
        color: "#3f51b5",
    },

    appButton: {
        width: 24,
        height: 24,
        padding: 0,
        textAlign: "center",
        border: "2px solid #fff",
        borderRadius: "50%",
        outline: "none",
        background: "none",
        color: "#fff",
        fontSize: "0.75rem",
        cursor: "zoom-in"
    },

    spamText: {
        margin: "0px 8px 0px 8px" 
    }

}))

