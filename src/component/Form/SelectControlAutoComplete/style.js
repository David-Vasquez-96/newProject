import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // formControl:{
  //     display: 'flex',
  //     paddingRight: theme.spacing(2),
  //     minWidth: 300,
  // },
  formControl: {
    minWidth: "250px",
    marginTop: "0.8%",
    paddingRight: theme.spacing(2),
  },
  textField: {
    // marginRight: theme.spacing(2),
    // paddingRight: 15,
    marginTop: 0,
    minWidth: 300,
  },
}));
