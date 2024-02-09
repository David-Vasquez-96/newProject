import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '150px',
    },
    titleTag: {
        marginBottom: '0px',
        marginTop: '0px'
    },
    itemsContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    itemDescription: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '25px'
    }

}));