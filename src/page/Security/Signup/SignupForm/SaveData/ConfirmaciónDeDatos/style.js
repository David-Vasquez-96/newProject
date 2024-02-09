import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
    root: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flexFlow: "row-wrap",
		backgroundColor: 'white',
		textAlign: "center",
    },
    container:{
		borderTop:'5px solid #20568E',
		borderRadius: '10px',
		padding: 8,
		marginBottom: 5,
		marginTop: 5,        
        backgroundColor: 'white',       
    },
	gridContainer: {
		margin: '0px',
	},
	gridList: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#e6e6e6',
		borderRadius: '15px',
		marginTop: '10px',
		padding: '10px'
	},
	title: {
		width: '100%',
		textAlign: 'center',
		margin: '15px 0px',
		fontSize: '1.3rem',
		fontWeight: 'bold',
		borderBottom: '3px solid #5b5b5b',
	},
	image: {
		width: 50,
		height: 50,
		border: '1px solid black',
        margin: '3px',
       '@media (max-width:1000px)':{ // web
            width: 45,
            height: 45,
        },
       '@media (max-width:768px)':{ //ipad
            width: 40,
            height: 40,
        },        
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	}, 
	wrapper: {
		'& > *': {
			margin: theme.spacing(1),
		  },
	}
}))