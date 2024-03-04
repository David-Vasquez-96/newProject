import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: '#1c4e78',
    '&:hover': {
      backgroundColor: '#1c4e78',
    },
  },
}))(Button);


export default function CustomizedButtons(props) {
  const classes = useStyles();

  return (
    <div>
        <ColorButton variant="contained" color="primary" startIcon={props.icon} onClick={props.function}> {props.title}
        </ColorButton>
    </div>
  );
}
