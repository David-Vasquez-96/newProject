import React from 'react';
import Alert from 'react-s-alert';
import { Icon, Button, CircularProgress, Slide } from '@material-ui/core/';
import { Check } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
//Api services
import ApiServices from 'service/ApiServices';
//Styles
import { useStyles } from './Style';
import AlertDialogSlide from 'component/AlertElementSimple';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationElement(props) {
    const classes = useStyles(props);



    return (
        <div>
            <Dialog maxWidth={"sm"} fullWidth={false} className={classes.rootSize} open={props.open} TransitionComponent={Transition} keepMounted
                onClose={props.handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <div className={classes.iconContainer}><AlertDialogSlide warning openModal={props.open} /></div>
                <DialogTitle className={classes.title} id="alert-dialog-slide-title">{props.titleModal}</DialogTitle>
                <DialogContent className={classes.description}>
                    <DialogContentText id="alert-dialog-slide-description">
                        {props.subtitleModal}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.buttonContainer}>
                    <Button onClick={props.handleConfirm} color="primary" variant="contained">
                        <Check />
                        Confirmar
                    </Button>
                    <Button onClick={props.handleClose} color="secondary" variant="outlined" className={classes.button}>
                        <Icon className={classes.icon}> cancel </Icon>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}