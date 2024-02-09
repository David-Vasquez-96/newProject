import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  rootLista: {
    width: "100%",
    maxWidth: "100%",
  },

  rootListItem: {
    justifyContent: "flex-end",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  rootListItemText: {
    width: "220px",
    color: "black",
    flex: "0 auto",
    textAlign: "end",
    "&>.MuiTypography-root": {
      fontWeight: "bold",
    },
  },
  rootListItemText2: {
    // width: '220px',
    color: "black",
    flex: "0 auto",
    paddingRight: "10px",
    textAlign: "initial",
    "&>.MuiTypography-root": {
      fontWeight: "normal ",
    },
  },
  colorIcon: {
    textAlign: "center",
    display: "initial",
  },

  colorChip: {
    backgroundColor: "#1C4E78",
    color: "white",
    marginTop: "5px",
  },
  centerTitle: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "gainsboro",
  },
  datosContainer: {
    justifyContent: "center",
  },
  dividerTitle: {
    paddingLeft: "1px",
    paddingRight: "1px",
  },
}));
