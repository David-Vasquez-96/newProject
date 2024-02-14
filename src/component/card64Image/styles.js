import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    rootGrid: {
        flexGrow: 1,
    },
	itemGrid: {
        flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
    },
	rootCard: {
		position: 'relative',
		margin: 0,
		maxWidth: 200,
		height:200,
		border: "2px outset grey",
		'@media (max-width:1200px)':{ //ipad
			maxWidth: 130,
		},
		'@media (max-width:998px)':{ //ipad
			maxWidth: 110,
			height:120,
		},
		'@media (max-width:876px)':{ //ipad
			maxWidth: 110,
			height:110,
		},
		'@media (max-width:768px)':{ //ipad
			display: 'none',
            marginRight: '0px'
		},
		'&:hover' : {
			opacity: .9,
		},
		'&:hover button' : {
			display: 'block',
		},
	},
	contentMedia:{
		width: 200,
		height:200,
		'@media (max-width:1200px)':{ //ipad
			width: 130,
			height:130,
		},
		'@media (max-width:998px)':{ //ipad
			maxWidth: 110,
			height:120,
		},
		'@media (max-width:876px)':{ //ipad
			maxWidth: 110,
			height:110,
		},
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	media: {
		width: 170,
		height:200,
		'@media (max-width:1200px)':{ //ipad
			width: 130,
			height:130,
		},
		'@media (max-width:998px)':{ //ipad
			maxWidth: 110,
			height:120,
		},
		'@media (max-width:876px)':{ //ipad
			maxWidth: 110,
			height:110,
		},
	},
	marginBottom: {
		marginBottom: '20px',
	},
	cardContent: {
		padding: '5px',
	},
	cardButtons: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerTitle: {
        textAlign: 'center',
        // marginTop: '10px',
		fontSize: '18px',
		textTransform: 'uppercase',
        backgroundColor:'gainsboro',
		color: 'black',
    },
	centerTitleVer: {
        textAlign: 'center',
		fontSize: '14px',
		textTransform: 'uppercase',
        backgroundColor:'gainsboro',
		color: 'black',
		margin: 0,
		border: "2px outset grey",
		borderRadius: 5,
		'@media (max-width:768px)':{ //ipad
			display: 'none',
		},
		"&:hover": {
			cursor: 'pointer'
		}
    },
	centerText: {
        textAlign: 'center',
		fontSize: '18px',
		textTransform: 'uppercase',
		margin: '20px 0px',
    },
	centerTitle2: {
        textAlign: 'center',
        // marginTop: '10px',
		fontSize: '16px',
		textTransform: 'uppercase',
        backgroundColor:'gainsboro',
		color: 'black',
    },
	iconVisibility: {
		// border: '2px solid #205690',
		display: 'none',
		background: '#205690',
		color: '#fff',
		position:"absolute",
		top:'35%',
		left:'35%',
		opacity: 1,
		'@media (max-width:998px)':{ //ipad
			top:'25%',
			left:'25%',
		},
		'&:hover' : {
			background: '#205690',
			color: '#fff',
		},
	},
}));
