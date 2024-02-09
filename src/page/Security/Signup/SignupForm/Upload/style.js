import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme=>({

	root: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flexFlow: "row-wrap",		
	},

	paper: {
		borderTop:'5px solid #20568E',
		borderRadius: '10px',
		padding: 8,
		marginBottom: 5,
		marginTop: 5,
		['@media (max-width:2560px)']:{ //web
			width: 1000,
				// "&:nth-child(2)": {
				// 	marginTop: 5,
				// 	marginBottom: -1,
				// },      
				// "&:nth-child(3)": {
				// 	marginTop: 0,
				// 	marginBottom: 5,        
				// },      
		},		
		['@media (max-width:1440px)']:{ //web
			width: 855,
			// "&:nth-child(2)": {
			// 	marginTop: 5,
			// 	marginBottom: -1,
			// },      
			// "&:nth-child(3)": {
			// 	marginTop: 0,
			// 	marginBottom: 5,        
			// },      
		},
		['@media (max-width:1025px)']:{ //web
			width: 855,
			// "&:nth-child(2)": {
			// 	marginTop: 5,
			// 	marginBottom: -1,
			// },      
			// "&:nth-child(3)": {
			// 	marginTop: 0,
			// 	marginBottom: 5,        
			// },      
		},
		['@media (max-width:880px)']:{ //ipad
			width: '100%',
			// "&:nth-child(2)": {
			// 	marginTop: 5,
			// 	marginBottom: 0,
			// },      
			// "&:nth-child(3)": {
			// 	marginTop: 0,
			// 	marginBottom: 5,        
			// },      
		},

	},

	image: {
		['@media (max-width:2560px)']:{ //ipad
			width: 75,
			height: 75,
		},		
		['@media (max-width:425px)']:{ //ipad
			width: 60,
			height: 60,
		},		
	},
	containerTitleLogo: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxHeight: '100%',
	},
	containerImage: {
		backgroundColor: '#eaecf1',
		width: '100%',
		height: '150px',
		borderRadius: '10px',
	},
	image2: {
		display: 'flex',     
	},
	img2: {
		margin: 'auto',
		display: 'block',
		width: '100px',
		height: '100px',
	}, 
	showFile:{
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		paddingLeft: '15px',
	},
	dataImage: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		marginLeft: '15px',
	},
	groupButton: {
		display: 'flex',
		flexDirection: 'row',
		'& > *': {
			margin: theme.spacing(1),
		},		
	},
	sendButton:{
		marginTop: 25,
		background: 'linear-gradient(45deg, #066bbd 30%, #63aaea 90%)',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		padding: '0 30px',
	},

	ReCaptcha: {
		display: 'flex',
		marginTop: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},

	uploadButton:{
		background: 'linear-gradient(45deg, #066bbd 30%, #63aaea 90%)',
		color: 'white',
	},

	errorInputs: {
		color: "red",
		margin: 0,
		fontSize: "1rem",
		marginTop: "3px",
		textAlign: "center",
		fontFamily: "Roboto",
		font2eight: 400,
		lineHeight: 1.66,
		letterSpacing: "0.03333em",
	},

	alert: {
		marginTop: "10px"
	}
}))