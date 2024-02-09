import React, { useEffect, useState } from 'react';
import {AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Button, Slide } from '@material-ui/core/';
import {Close, GetApp,  } from '@material-ui/icons';

//Styles
import {useStyles} from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Base64Pdf(props) {
    const classes = useStyles(),
        [scroll, setScroll] = useState('paper');

    const usarScroll = (scrollType) => () => {
        setScroll(scrollType)
    }
    useEffect(() => {
        if(props.open) {
            usarScroll()
        }
    },[props.open])
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition} scroll={scroll} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>{props.title}</Typography>
                        {props.showDownloadButton && (
                            <Button startIcon={<GetApp />} edge="end" color="inherit" onClick={props.showDownloadButton}>Descargar</Button>
                        )}
                        <Button startIcon={<Close />}  edge="end" color="inherit" onClick={props.handleClose}>Cerrar</Button>
                    </Toolbar>
                </AppBar>
                <DialogContent dividers={scroll === 'paper'} className={classes.dialogContent}>
                    <iframe
                        src={props.pdf.includes('base64,') ? props.pdf : `data:application/pdf;base64,${props.pdf}`}
                        width="100%" height="100%" frameBorder="0" allowFullScreen
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

Base64Pdf.defaultProps = {
    open: false,
    pdf: "",
    showDownloadButton : true,
    src: "/assets/simboloPdf.svg"
}
