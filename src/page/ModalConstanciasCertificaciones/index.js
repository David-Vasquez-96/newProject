import React from 'react';
import { useStyles } from "./style";
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Toolbar, Typography } from '@material-ui/core';
import { HighlightOff, NoteAdd } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} open={props.open} onClose={props.handleClose} maxWidth={'md'} fullWidth={true}>
            <AppBar className={classes.appBar} elevation={0}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="close"><NoteAdd /></IconButton>
                    <Typography variant="h6" className={classes.title}>{props.title}</Typography>
                    {/* <Button variant="outlined" color="inherit" onClick={props.handleClose}>Cancelar</Button> */}
                </Toolbar>
            </AppBar>
            <DialogTitle className={classes.dialogTitle} id="max-width-dialog-title">{props.subTitleModal}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.dialogContext}>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={props.generarSolicitud} color="primary">Enviar solicitud</Button>
                <Button variant="outlined" onClick={props.handleClose} color="secondary">Cerrar</Button>
            </DialogActions>            
        </Dialog>
    );
}