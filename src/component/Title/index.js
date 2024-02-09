import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  h1: {
    textAlign: "center",
    color: "#000",
    fontFamily: "sans-serif",
    paddingLeft: 5,
    paddingRight: 5,
    "@media (max-width:2000px)": {
      // web
      fontSize: "1.6rem",
    },
    "@media (max-width:1000px)": {
      // web
      fontSize: "1.5rem",
    },
    "@media (max-width:768px)": {
      //ipad
      fontSize: "1.2rem",
    },
    "@media (max-width:415px)": {
      //mobile
      fontSize: "1rem",
      marginRight: "10%",
    },
  },
  description: {
    textAlign: "center",
    color: "#000",
    fontFamily: "sans-serif",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: "1rem",
  },
  icon: {
    "padding-top": 5,
  },
}));

export default function Title(props) {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.h1}>
        <Icon className={classes.icon} fontSize="large">
          {props.icon ? props.icon : "check"}
        </Icon>{" "}
        {props.title}
      </h1>
      {props.description ? (
        <p className={classes.description}> {props.description} </p>
      ) : (
        <React.Fragment />
      )}
      <Divider />
    </div>
  );
}
