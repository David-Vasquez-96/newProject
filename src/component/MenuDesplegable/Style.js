import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    containerbutton: {
        margin: '0px 10px',
    },
	bottonNormal: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(119, 241, 255)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
	},
	bottonNormalCancelar: {
		background: 'linear-gradient(to right, #D31027 0%, #EA384D  51%, #D31027  100%)',
		border: 0,
		borderRadius: 3,
		boxShadow:'0 3px 5px 2px rgba(255, 122, 122)',
		color: 'white',
		height: 37,
		padding: '0 30px',	
	},
	iconColor: {
		color: '#1E5280',
	},
	textColor: {
		color: 'black'
	}
}));
