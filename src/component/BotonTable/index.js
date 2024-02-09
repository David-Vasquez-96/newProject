import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {IconButton, Tooltip} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
    },  
}));

const ColorButton = withStyles((theme) => ({
  root: {
    size:"medium",
    color:"#066bbd", 
    // background:"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% "            
  },
}))(IconButton);


export default function CustomizedButtons(props) {
  const classes = useStyles();

  return (
    <div>
	<Tooltip title={props.title}>
		<ColorButton onClick={props.function}> {props.icon}
		</ColorButton>
	</Tooltip>      
    </div>
  );
}
