import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root:{
		width: "100%",
		overflow: "auto",
		border: "1px solid  #cccccc",
		borderRadius: "20px",
		marginBottom: 10,
		backgroundColor:'white'		
	},
  rootLista: {
    width: "100%",
    maxWidth: "100%",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  rootList: {
    flexGrow: 1,
  },

  titulo: {
	textAlign: "center",
	margin:'0px',
	padding:'0px',
  },
  gridList: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    // maxHeight: 570,
  },
  LineaDegradada: {
	bottom: 0,
	left: 0,
	width: "100%",
	height: 4,
	background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,	  
  },
  colorChip:{
	backgroundColor: '#1C4E78',
	color:'white'
},  
}));
