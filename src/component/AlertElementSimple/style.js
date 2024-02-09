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
    title: {
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    },

    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        margin: '2em 0 0 0'
    },
    iconModalSuccess: {
        fontSize: 90,
        color: 'green'
    },

    iconModalError: {
        fontSize: 90,
        color: 'red'
    },

    messageModal: {
        marginBottom: '2em'
    },

    closeIcon: {
        position: 'absolute',
        top: 3,
        right: 3
    }

}));
