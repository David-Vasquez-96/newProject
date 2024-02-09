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
	ContainerImageLogo: {
		textAlign: "center",
	},
	ImageLogo: {
		textAlign: "center",
        "@media (max-width:2560px)": {
			width: '160px',
			height: '150px',
		},
	},
	grid: {
		textAlign: 'left'
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',     
    },
    paperContent: {
        display: 'flex',
        flexDirection: 'row',
        padding: '5px',
        '@media (max-width:599px)':{ //mobile
            justifyContent: 'center'
        }         
    },
    contentTitle: {
        margin: '0px 10px',
        fontWeight: 'bold',
    },
    content: {
        margin: '0px 10px',
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