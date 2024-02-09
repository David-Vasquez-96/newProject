import React, { useEffect } from 'react';
import {Button, Toolbar, AppBar, Typography, Dialog, DialogContent, Slide, DialogTitle, DialogContentText} from '@material-ui/core/';
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Modal({iconType, open, closeModal, titleButton, titleButtonClose, disableBackdropClick, disableEscapeKeyDown, buttonProcess, buttonCancel, 
    children, maxWidth, fullScreen,title, titleToolbar, iconToolbar, showToolbar, fullWidth
}) {
    let buttonYes = React.createRef();
    const classes = useStyles();

    useEffect(() => {
        if (buttonYes.current!==null)
            buttonYes.current.focus();
    });
    const [scroll] = React.useState('paper');
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);    
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
            // aria-labelledby="alert-dialog-slide-title"
            // aria-describedby="alert-dialog-slide-description"
            disableBackdropClick={disableBackdropClick}
            disableEscapeKeyDown={disableEscapeKeyDown}
            // aria-labelledby="max-width-dialog-title"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            style={{padding: 0}}
        >
            {
                showToolbar ? (                    
                    <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
                        <AppBar className={classes.appBar} elevation={0}>
                            <Toolbar >
                                {iconToolbar}
                                <Typography variant="h6" className={classes.title}> {titleToolbar}</Typography>
                                <Button autoFocus color="inherit" onClick={closeModal}> Cerrar</Button>
                            </Toolbar>                
                        </AppBar>
                    </DialogTitle>
                ):(
                    <DialogTitle id="scroll-dialog-title" className={classes.dialogTitle}>
                        <AppBar  className={classes.appBar} elevation={0}>
                            <Toolbar variant="dense">
                            </Toolbar>                
                        </AppBar>
                    </DialogTitle>
                )
            }
            <DialogContent dividers={scroll === 'paper'} style={{backgroundColor: '#D4D8E1', padding:0}}>
                <DialogContentText
                    className={classes.dialogContentText}
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >                    
                </DialogContentText>
                    {children}
                    {/* <Grid container justify="center" alignItems="center" spacing={1}>
                        <Button variant="contained" onClick={()=>buttonProcess()} className={classes.button} ref={buttonYes}>{titleButton}</Button>
                        <Button variant="contained" onClick={()=>buttonCancel()} className={classes.buttonCancel} >{titleButtonClose}</Button>
                    </Grid> */}
                </DialogContent>                
        </Dialog>
    );
}

Modal.defaultProps = {
    titleButton: "Sí, Agregar",
    titleButtonClose: "No, Cancelar",
    iconType: "errorOutline",
    disableBackdropClick: true,
    disableEscapeKeyDown: true, 
    maxWidth: 'xs',
    fullScreen: false,
    showToolbar: true,
};

export default Modal;