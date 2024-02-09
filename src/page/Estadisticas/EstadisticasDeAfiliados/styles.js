import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "10px",
    height: "1750px",
    minWidth: "350px",
    "@media (max-width:1750px)": {
      height: "1600px",
    },
    "@media (max-width:1570px)": {
      height: "1450px",
    },
    "@media (max-width:1450px)": {
      height: "1330px",
    },
    "@media (max-width:1280px)": {
      height: "1180px",
    },
    "@media (max-width:1130px)": {
      height: "1070px",
    },
    "@media (max-width:1023px)": {
      height: "1030px",
    },
    "@media (max-width:925px)": {
      height: "1000px",
    },
    //Aquí se dejan de ver los cambios.
    "@media (max-width:875px)": {
      height: "1020px",
    },
    "@media (max-width:768px)": {
      //ipad
      height: "900px",
    },
    "@media (max-width: 670px)": {
      height: "800px",
    },
    "@media (max-width: 600px)": {
      height: "710px",
    },
    "@media (max-width: 540px)": {
      height: "660px",
    },
    "@media (max-width: 480px)": {
      height: "600px",
    },
    "@media (max-width: 430px)": {
      //mobile
      height: "530px",
    },
    "@media (max-width: 380px)": {
      //mobile
      height: "500px",
    },
    "@media (max-width: 350px)": {
      //mobile
      height: "400px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  childDiv: {
    height: "1680px",
    "@media (max-width:1750px)": {
      height: "1520px",
    },
    "@media (max-width:1570px)": {
      height: "1370px",
    },
    "@media (max-width:1450px)": {
      height: "1250px",
    },
    "@media (max-width:1280px)": {
      height: "1110px",
    },
    "@media (max-width:1130px)": {
      height: "1000px",
    },
    "@media (max-width:1023px)": {
      height: "1180px",
    },
    "@media (max-width:925px)": {
      height: "1100px",
    },
    "@media (max-width:875px)": {
      height: "1020px",
    },
    "@media (max-width:768px)": {
      //ipad
      height: "900px",
    },
    "@media (max-width:700px)": {
      height: "830px",
    },
    "@media (max-width: 670px)": {
      height: "800px",
    },
    "@media (max-width: 600px)": {
      height: "710px",
    },
    "@media (max-width: 540px)": {
      height: "660px",
    },
    "@media (max-width: 480px)": {
      height: "600px",
    },
    "@media (max-width: 430px)": {
      //mobile
      height: "530px",
    },
    "@media (max-width: 380px)": {
      height: "500px",
    },
    "@media (max-width: 350px)": {
      height: "460px",
    },
  },
  paperChildDiv: {
    height: "inherit",
  },
  root2: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
