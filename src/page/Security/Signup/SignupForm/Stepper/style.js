import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
        background:"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% "
    },
    stepperCard:{
        backgroundColor: 'white',
    },
    completed: {
        display: "inline-block",
    },
    stepLabel: {
        fontSize: "11px",
    }
}));
