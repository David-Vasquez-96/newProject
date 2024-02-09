import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        background: "linear-gradient(0deg, #1d5079 20%, #205690 62%)",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    }, 
    content:{
        backgroundColor: 'white',
    },
    dialogContext:{
        color: 'black',
    },
    dialogTitle: {
        textAlign: 'center',
    }
}));
