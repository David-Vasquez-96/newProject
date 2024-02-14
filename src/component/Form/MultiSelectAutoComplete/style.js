import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    textField:{
        marginRight: theme.spacing(2),
        paddingRight:15,
        minWidth: 300,
        width: '100%',
    },
    grid:{
        marginTop:'1%',
        minWidth: 300,
        display: 'inline-block',
        width: '25%',
        '@media (max-width:992px)':{ //ipad
            width: '50%'
        },
        '@media (max-width:768px)':{ //ipad
            width: '100%'
        },
    },
}));
