import { makeStyles } from '@material-ui/core/styles';

export  const useStyles = makeStyles(theme => ({
    formControl:{
        marginTop:'1%',
        paddingRight: theme.spacing(2),
    },
    area:{
        minHeight: '5em',
        width: '100%', 
        marginTop: '5px', 
        marginBottom: '20px', 
        fontFamily: 'roboto',
        marginBottom: '5px',
    },    
}));
