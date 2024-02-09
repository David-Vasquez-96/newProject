import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme=>({
    root:{
        marginTop: 25,
        background: 'linear-gradient(45deg, #066bbd 30%, #63aaea 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
   },
    rootdiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'center',
        justifyContent: 'center',      
    },   
    wrapper: {
        backgroundColor: 'white',   
        margin: theme.spacing(1),
        position: 'relative',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '10px',
        marginBottom: '5px',
		['@media (max-width:2560px)']:{ //web
			width: 1000,
		},		
		['@media (max-width:1440px)']:{ //web
			width: 855,   
		},
		['@media (max-width:1025px)']:{ //web
			width: 855,
		},
		['@media (max-width:768px)']:{ //ipad
			width: '100%',  
		},        
        
    },   
    buttonProgress: {
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    circularProgress: {
        color: blue[500],
    },
    buttonCircularProgress: {
        color: blue[500],
    },
    SpaceButton: {
        marginRight: 10,
    },
}))