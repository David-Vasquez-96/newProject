import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
	appBar: {
		position: 'relative',
		backgroundColor: '#1E5282',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},	
}));