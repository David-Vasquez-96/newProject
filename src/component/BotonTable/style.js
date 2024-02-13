import { makeStyles } from '@material-ui/core/styles';

export const useStyles = props => makeStyles({
    root:{
        size:"medium",
        color: (props.color) ? props.color : "#066bbd",         
        backgroundColor: (props.color) ? props.color : "#066bbd",         
    },
});