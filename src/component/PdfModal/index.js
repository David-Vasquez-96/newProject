import React, { useEffect, useState } from 'react';
import {AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Button, Slide } from '@material-ui/core/';
import {Close, GetApp,  } from '@material-ui/icons';

//Styles
import {useStyles} from './style';
import Title from 'component/TitleWithIcon';
// import "./styles.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Pdf(props) {
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
                        { props.DescargarPDF ?
                            <Button startIcon={<GetApp />} edge="end" color="inherit" onClick={props.DescargarPDF}>Descargar</Button>:''
                        }
                        <Button startIcon={<Close />}  edge="end" color="inherit" onClick={props.handleClose}>Cerrar</Button>
                    </Toolbar>
                </AppBar>                
                <DialogContent dividers={scroll === 'paper'} className={classes.dialogContent}>
                    {/* <SinglePagePDFViewer pdf={`data:application/pdf;base64,${props.base64}`} /> */}
                    {
                        (props.base64 && props.type==='pdf') ? (
                            <iframe title=" " src={`data:application/pdf;base64,${props.base64}`} width="100%" height="100%" frameborder="0" allowfullscreen />
                        ): (props.base64 && props.type==='image') ? (
                            <img className={classes.imagen} alt="complex" src={`data:application/jpg;base64,${props.base64}`}/>
                        ):(
                            <div>
                                <Title title={props.message} icon={""}/>
                                <img className={classes.img} alt="complex" src="/assets/pdf.png" />
                            </div>                            
                        )
                    }
                </DialogContent>                
            </Dialog>
        </div>
    );
}