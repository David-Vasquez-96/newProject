import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "250px",
    marginTop: "0.8%",
    paddingRight: theme.spacing(2),
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
}));
