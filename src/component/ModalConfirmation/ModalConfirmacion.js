import React, { useEffect } from 'react';
import {Button, Card, CardContent, Dialog, Grid, makeStyles, Slide, Typography} from '@material-ui/core/';
import Icon from '@material-ui/core/Icon';
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Modal({iconType, open, closeModal, titleButton, titleButtonClose, disableBackdropClick, disableEscapeKeyDown, actionAdd, children}) {
    let buttonYes = React.createRef();
    const classes = useStyles();

    useEffect(() => {
        if (buttonYes.current!==null)
            buttonYes.current.focus();
    });

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>closeModal(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                disableBackdropClick={disableBackdropClick}
                disableEscapeKeyDown={disableEscapeKeyDown}
            >
                <Card >
                    <CardContent >
                        <Grid  container justify="center" alignItems="center" spacing={1} >
                        <Icon color={"primary"} className={classes.icon}>
                            {iconType}
                        </Icon>
                        {children}
                        </Grid>
                        <Grid container justify="center" alignItems="center" spacing={1}>
                            <Button variant="contained" onClick={()=>actionAdd(true)} className={classes.button} ref={buttonYes}>{titleButton}</Button>
                            <Button variant="contained" onClick={()=>closeModal(false)} className={classes.buttonCancel} >{titleButtonClose}</Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    );
}

Modal.defaultProps = {
    titleButton: "Sí, Agregar",
    titleButtonClose: "No, Cancelar",
    iconType: "errorOutline",
    disableBackdropClick: true,
    disableEscapeKeyDown: true
};

export default Modal;