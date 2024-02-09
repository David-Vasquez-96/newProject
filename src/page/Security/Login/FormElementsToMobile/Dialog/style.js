import { makeStyles } from "@material-ui/core/styles";
import color from "@material-ui/core/colors/amber";

export const useStyles = makeStyles((theme) => ({
  cardSideMessageLogin: {
    top: -160,
    minWidth: 275,
    width: "100%",
    position: "relative",

    transition: "0.4s ease-out",
    textAlign: "justify",
    boxShadow: "0px 0px 0px 0px",
    borderRadius: 20,
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  title: {
    fontSize: 14,
  },

  pos: {
    transition: "0.4s ease-out",
    marginBottom: 12,
  },

  note: {
    fontWeight: 800,
  },
}));
