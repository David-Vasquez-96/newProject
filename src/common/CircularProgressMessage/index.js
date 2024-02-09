import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#3b5998',
  },
})(CircularProgress);
  
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function LoadingIndicator(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h4><strong>{props.mensaje}</strong></h4>
      <ColorCircularProgress size={30} thickness={5} />
    </div>
  );
}