import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  colorComponente: {
    backgroundColor: "white",
    alignItems: "center",
    flexFlow: "row-wrap",
    border: "1px solid  #cccccc ",
    borderRadius: "20px",
    position: "relative",
    width: "100%",
    overflow: "auto",
    paddingLeft: "0px",
    paddingRight: "0px",
  },

  root: {
    paddingLeft: "100px",
    paddingRight: "100px",
    "@media (max-width:1100px)": {
      // ipad
      width: "100%",
      paddingLeft: "1%",
      paddingRight: "1%",
    },
  },
  formTitle: {
    marginTop: 10,
  },

  marginBoton: {
    paddingBottom: "10px",
  },

  marginText: {
    paddingLeft: "10px",
    display: "contents",
  },

  rootLista: {
    width: "100%",
    maxWidth: "100%",
  },

  rootListItem: {
    paddingBottom: "4px",
    paddingTop: "0px",
  },
  colorIcon: {
    color: "black",
  },

  colorChip: {
    backgroundColor: "#1C4E78",
    color: "white",
  },
  comboboxGrid: {
    textAlign: "center",
    paddingTop: "10px",
  },
  AlignTable: {
    textAlign: "center",
  },
  formSecondRow: {
    textAlign: "center",
    marginBottom: "1%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  lineaDegradadaBottom: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 4,
    background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: "0px",
    minWidth: 250,
  },
  formControlAutocomplete: {
    minWidth: "250px",
    position: "relative",
    display: "inline-flex",
    margin: theme.spacing(1),
    marginTop: "0px",
  },
  autoCompleteTextField: {
    marginTop: 0,
    marginBottom: 0,
    width: "100%",
  },

  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  icon: {
    marginRight: 7,
  },
}));
