import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    top: "auto",
    bottom: 0,
    background: `linear-gradient(356deg, rgba(2,0,36,1) 3%, rgb(31 85 138) 96%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "@media (max-width:640px)": {
      fontSize: "0.7rem",
    },
    "@media (max-width:540px)": {
      fontSize: "0.6rem",
    },
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imgTwo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  title: {
    marginTop: "10px",
    marginRight: 10,
    "@media (max-width:1440px)": {
      //web
      fontSize: "0.8rem",
      marginRight: 10,
    },
    "@media (max-width:449px)": {
      //mobile
      fontSize: "0.6rem",
    },
  },
  button: {
    color: "white",
    marginLeft: 10,
    "@media (max-width:1440px)": {
      //web
      fontSize: "0.8rem",
      marginRight: 10,
    },
    "@media (max-width:439px)": {
      //mobile
      fontSize: "0.6rem",
    },
  },
  contenedorTSETitle: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorSoporte: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contenedor: {
    display: "flex",
    marginRight: "10px",
    width: "280px",
    "@media (max-width:640px)": {
      //web
      width: "auto",
    },
  },
  contenedorTelefono: {
    display: "flex",
    marginRight: "10px",
    width: "295px",
    "@media (max-width:640px)": {
      //web
      width: "190px",
    },
    "@media (max-width:375px)": {
      //web
      width: "165px",
    },
  },
  icon: {
    marginTop: "10px",
  },
  footerText: {
    marginLeft: "1%",
  },
}));
