import React,{useState} from 'react';
import {Button, Menu, MenuItem, ListItemIcon, Typography, makeStyles} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from "./Style";

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null),
	classes = useStyles(),
	handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	},
	handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className={classes.containerbutton}>
			<Button 
				aria-controls="simple-menu" 
				aria-haspopup="true" 
				onClick={handleClick} 
				variant="outlined" 
				startIcon={<MenuIcon />}
			>
				Menú
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{
					props.arrayMenuDesplegable.map((button, index) => {
						return(
							// <MenuItem onClick={button.customFunctionTable}>{button.customTitleButtonTable}</MenuItem>
							<MenuItem onClick={button.customFunctionTable} key={index}>
							    <ListItemIcon className={classes.iconColor}>
            						{button.customIconButtonTable}
								</ListItemIcon>
								<Typography className={classes.textColor} variant="inherit">{button.customTitleButtonTable}</Typography>
							</MenuItem>
						)
					})
				}
			</Menu>
		</div>
	);
}