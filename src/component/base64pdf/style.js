import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        textAlign: "center",
    },
    dialogContent:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}))

