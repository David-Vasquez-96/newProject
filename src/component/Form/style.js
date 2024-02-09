import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  hideInPrintView: {
    "@media print": {
      display: "none",
    },
  },
  root: {
    // marginTop:'5px',
    //marginLeft:'3%',
    // marginRight: '3%',
    // ["@media (max-width: 460px)"]: {
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    // },
  },
  espacioBotones: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  grid: {
    width: 300,
    display: "inline-block",
  },
  customGrid: {
    width: 200,
    display: "inline-block",
  },
  button: {
    // width: 180,
    margin: theme.spacing(1),
    textAlign: "center",
  },

  iconSmall: {
    fontSize: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  checkbox: {
    marginTop: 5,
    width: 300,
  },
  circularProgress: {
    "&>div": {
      color: "#fff",
      width: "25px !important",
      height: "25px !important",
      marginRight: 7,
    },
  },
  bottonNormal: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(119, 241, 255)",
    color: "white",
    height: 37,
    padding: "0 30px",
    margin: theme.spacing(1),
    textAlign: "center",
  },
  bottonEnviarCodigo: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  title: {
    marginTop:'2rem',
    marginBottom: '10px',
    backgroundColor:'gainsboro',
    width: '100%',
    fontSize: '1rem'
},
  titleBySignup: {
    fontSize: '1rem',
    marginTop:'2rem !important',
    marginBottom: '1rem !important',
    width: '100%',
    "&>strong":{
      marginLeft: 16,
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#6a6a6a",
    },
    "&>hr": {
      marginLeft: 16,
      marginRight: 16,
    }
},
  customTitleBar : {
    width: '100%',
    padding: '5px 20px',
    background:'linear-gradient(0deg, #1d5079 20%, #205690 62%)',
    color: 'white',
    borderRadius: '10px 10px 0px 0px',
    fontSize: '20px',
    marginBottom: '1%',
    ["@media (max-width: 748px)"]: {
        marginBottom: '3%'
    },
    ["@media (max-width: 460px)"]: {
        marginBottom: '3%'
    },
  },
  listItemText:{
    "&>.MuiListItemText-primary":{
        color: 'black',
        fontSize: '15px',
    ["@media (max-width: 748px)"]: {
        fontSize: '15px',
    },
    ["@media (max-width: 460px)"]: {
        fontSize: '15px',
    },      
    }    
  },
  section : {
    padding: '12px',
    backgroundColor:'#EDEDED',
    borderRadius: '0px',
  },
  bottonPrincipal: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(119, 241, 255)",
    color: "white",
    height: 37,
    padding: "0 30px",
    margin: theme.spacing(1),
    // marginTop: '20px',
    textAlign: "center",
  },
  bottonNormalCancelar: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  buttonProgress: {
    color: "black",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  pos: {
    transition: "0.4s ease-out",
    marginBottom: 12,
    "@media (max-width: 2000px)": {
      //web
      fontSize: "1.1rem",
    },
    "@media (max-width: 1500px)": {
      //web
      fontSize: "0.9rem",
    },
    "@media (max-width:1366px)": {
      // web
      fontSize: "0.8rem",
    },
  },
  

  note: {
    fontWeight: 800,
  },
}));
