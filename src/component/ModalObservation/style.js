import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  rootSize: {
    "&>.MuiDialog-paperWidthXl": {
      width: 640,
    },
  },

  title: {
    textAlign: "center",
  },

  message: {
    marginLeft: "5%",
    marginRight: "5%",
  },

  circularProgress: {
    "&>div": {
      color: "#fff",
      width: "25px !important",
      height: "25px !important",
      marginRight: 7,
    },
  },

  description: {
    textAlign: "center",
  },

  buttonContainer: {
    justifyContent: "center",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    margin: "1em 0 0 0",
  },

  iconModalSuccess: {
    fontSize: 90,
    color: "red",
  },

  icon: {
    marginRight: 6,
    marginLeft: -6,
  },
}));
