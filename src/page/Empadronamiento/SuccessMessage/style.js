import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    rootSize: {
        "&>.MuiDialog-paperWidthXl":{
            width: 640,
        }
    },

    title: {
        textAlign: "center",
        padding: '0px',
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

    description:{
        textAlign: 'center',
    },
    descriptionText: {
        marginBottom: "0px",
        color: "rgba(0, 0, 0, 0.99)",
    },
    buttonContainer:{
        justifyContent: 'center',
        marginBottom: "0.6rem"
    },

    button:{
        "&>.MuiDialogActions-spacing > :not(:first-child)":{
            marginLeft: 45,
        },
        marginLeft: 45,
    },

    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        margin: '1.6em 0 0 0'
    },
    iconModalSuccess: {
        fontSize: 90,
        color: 'green'
    },

    icon:{
        marginRight: 6,
        marginLeft: -6,
    },
}))

