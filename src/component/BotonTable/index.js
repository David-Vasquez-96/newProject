import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core/';
import { useStyles } from "./style";

export default function CustomizedButtons(props) {
	const classes = useStyles(props)();

	return (
		<Tooltip title={props.title}>
			<IconButton className={classes.root} onClick={props.function}> {props.icon} </IconButton>
		</Tooltip>      
	);
}