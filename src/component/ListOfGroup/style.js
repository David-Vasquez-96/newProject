import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        paddingTop:'0',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    icon:{
        color: 'rgba(234,113,25)',  
       '@media (max-width:460px)':{ //mobile
            display: "none"
        },        
    },
    name:{
        padding: '0% 0% 0% 12%',
        fontSize: '0.9rem', 
        '&>.MuiListItemText-secondary':{
            color: "#000",
            opacity: '0.64',
            fontFamily: 'sans-serif',
            fontWeight: '550',
        }
    },
}));

