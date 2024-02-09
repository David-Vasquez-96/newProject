import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    buttonMargin: {
        margin: theme.spacing(2),
    },
    downloadButton:{
        marginTop: 15,
        background:"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% "
    },
    marginIcon: {
        marginTop: '10px'
    }, 
    AppBar : {
        background: 'white',
        color:'#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',          
    },    
	image: {
		width: 70,
		height: 70,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},    
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2% 5% 2% 5%',
        padding: '15px',
        backgroundColor: 'white',
        borderTop:'10px'
    }
}));
