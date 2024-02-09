import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({
	root: {
		// width: '80%',
		flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
		flexFlow: "row-wrap",		
		marginRight:'5%',
		marginLeft:'5%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,		
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},	
	margin:{
		margin:'0px'
	},
	accordionSummary: {
		background:'linear-gradient(0deg, #1d5079 20%, #205690 62%)',
		color: 'white',
		fontWeight: 'bold',
		"&>.MuiAccordionSummary-content":{
			display: "flex",
			flexDirection: "column",
		} 
	}
}))