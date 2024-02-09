import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    background: "linear-gradient(45deg, #066bbd 30%, #63aaea 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  rootdiv: {
    display: "flex",
    // marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  SpaceButton: {
    //marginRight: 10,
    background:
      "linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",
    color: "#fff",
  },
  icon: {
      marginRight: 7,
  }
}));
