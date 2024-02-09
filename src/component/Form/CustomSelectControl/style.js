import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  /* formControl:{
        display: 'flex',
        paddingRight: theme.spacing(2),
        minWidth: 200,
    },
    textField:{
        marginRight: theme.spacing(2),
        paddingRight:15,
        marginTop: 0,
        minWidth: 200,
    },    */

  formControl: {
    // display: 'flex',
    paddingRight: theme.spacing(2),
    minWidth: 200,
    marginTop: "1%",
  },
  textField: {
    marginTop: 0,
    minWidth: 200,
    marginBottom: "0.1%",
  },
}));
