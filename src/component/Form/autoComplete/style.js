import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({    
    formControl:{
        display: 'flex',
        paddingRight: theme.spacing(2),
        minWidth: 300,
        marginTop:'1%',
    },
    textField:{
        marginRight: theme.spacing(2),
        paddingRight:15,
        marginTop: 0,
        minWidth: 275,
    },   
    grid:{
        width: 300,
        display: 'inline-block'
    },
    icon: {
        paddingBottom: '10px',
    } 
}));
