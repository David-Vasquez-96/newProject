import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const BorderLinearProgress = withStyles({
    root:props => ({
        transition: 'all 1s ease',
        height: 25,
        borderRadius: 20,
        backgroundColor: props.value===0 ? lighten("#8e8d8b",0.5) :  props.value <50 ?  lighten('#AB003C', 0.7) : props.value < 80 ? lighten('#F2D10C', 0.7):  lighten('#58a700',0.7) ,
    }),
    bar: props => ({
        transition: 'all 1s ease',
        borderRadius: 20,
        backgroundColor: props.value===0 ? "#8E8D8B" : props.value <50 ?  lighten('#AB003C', 0) : props.value < 80 ? lighten('#F2D10C', 0): lighten('#58a700',0) ,
    }),
})(LinearProgress);
 
export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(1),
    },
}));
 
