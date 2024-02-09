import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	contenedorPrincipal: {
		width: "100%",
		border: "1px solid  #cccccc",
		borderRadius: "20px",
		backgroundColor:'white',
		borderTop: '10px solid #1E5280;',
		marginBottom: '50px',
		padding: '10px 30px'
	},
	grid: {
		textAlign: 'left'
    },
	Image: {
		backgroundSize: "cover",
		position: "relative",
        "@media (max-width:2560px)": {
			width: '100%',
			height: '400px',
		},
        "@media (max-width:768px)": {
			maxWidth: 240,
			maxHeight: 240,
		},
	},
}));