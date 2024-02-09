import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '20px',
        marginLeft: '2%',
        marginRight: '2%'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },


    formTextTitle: {
        fontSize: '1rem'
    },

    formControl: {
        minWidth: 200,
        width: '20%',
        marginRight: theme.spacing(1),
        '@media (max-width:1060px)': { //ipad
            width: '32%'
        },
        '@media (max-width:768px)': { //ipad
            width: '100%',
            marginRight: 0,
        },
    },
    button: {
        width: '200px',
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor: '#008AFA',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1E88E5',
        },
        '@media (max-width:1060px)': { //ipad
            width: '32%'
        },
        '@media (max-width:768px)': { //ipad
            width: '100%',
            marginRight: 0,
        },
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    }
}));