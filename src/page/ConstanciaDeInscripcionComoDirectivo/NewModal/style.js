import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
    }
  }));
