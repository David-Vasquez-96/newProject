import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    icon:{
     '@media (max-width:460px)':{ //mobile
        color:'#205690',
        marginRight: 12,
        width: 30
    },                    
    }
  }));

