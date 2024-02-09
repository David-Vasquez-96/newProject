import { makeStyles } from "@material-ui/core";

export default makeStyles( (theme) => ({
	dialogTitle: {
		padding: 0,    
	},
	dialogContentText: {
		margin: 0, 
		'&>.MuiDialogContentText-root':{			
			margin: 0, 
		}
	},
    appBar: {
        backgroundColor: '#1E5282',
        color: '#FFFFFF',
        position: 'relative',
		padding: 0,
    },  
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
	icon : {
		fontSize: 80, display: 'block',
		"background":"linear-gradient(45deg, #205690 30%, #3890EE 90%)",
		"border":"0px", "borderRadius":"100%",
		"boxShadow":"0 3px 5px 2px rgba(33, 203, 243, .3)", "color":"white",
	},
	button:{
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(119, 241, 255)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
			margin: theme.spacing(1),
			textAlign: 'center'
	},
	buttonCancel: {
		background: 'linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(255, 122, 122)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
		margin: theme.spacing(1),
	},
}));