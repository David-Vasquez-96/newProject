import React, { useState } from 'react';
import {useStyles} from './styles';
import {Button, Dialog, AppBar, Toolbar, IconButton, Typography, Close, DialogContent} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({iconType, open, closeModal, titleButton, titleButtonClose, disableBackdropClick, disableEscapeKeyDown, buttonProcess, buttonCancel, 
    children, maxWidth, fullScreen,title, titleToolbar, iconToolbar, showToolbar, fullWidth
}) {
	const classes = useStyles();
    const [scroll] = useState('paper');

	return (
	<Dialog 
		open={open}
		maxWidth={maxWidth}
		fullScreen={fullScreen}
		fullWidth={fullWidth}
		scroll={scroll}
		TransitionComponent={Transition}
		keepMounted
		onClose={()=>closeModal(false)}
		disableBackdropClick={disableBackdropClick}
		disableEscapeKeyDown={disableEscapeKeyDown}
	>
		{
			showToolbar ? (
				<AppBar className={classes.appBar}>
					<Toolbar variant='dense'>
						{iconToolbar}
						<div className={classes.title}>{titleToolbar}</div>
						<Button autoFocus color="inherit" onClick={closeModal}> Cerrar </Button>
					</Toolbar>
				</AppBar>
			):''
		}
		<DialogContent dividers={scroll === 'paper'} className={classes.dialogContent} style={{padding:0}}>
			{children}
		</DialogContent>
	</Dialog>
	);
}
FullScreenDialog.defaultProps = {
    disableBackdropClick: true,
    disableEscapeKeyDown: true, 
    maxWidth: 'xs',
    fullScreen: false,
    showToolbar: true,
};
export default FullScreenDialog;