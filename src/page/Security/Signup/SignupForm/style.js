import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},

	formTwoColumns:{
		"&>div":{
			// background:"blue",
			display: "inline-block",
			width: "90%",
			"&>div":{
				margin: "15px 0",
			}
		}
	},
	container:{
		margin: "10px 0px 20px 0px",
		backgroundColor: "white",
		borderRadius: '10px',
	}
}));