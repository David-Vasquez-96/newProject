import React from 'react';
import {useStyles} from './style';
import {Icon, Button, Slide } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import PrismaZoom from 'react-prismazoom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = ((props) => {
    const { children, onClose, ...other } = props;
    const classes = useStyles();
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography className={classes.title}variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

export default function ImagePrev(props) {
    const   classes = useStyles(),
            [scroll,] = React.useState('body'),
            [rotation, setRotation] = React.useState(0),
            [zoom, setZoom] = React.useState(1),
            prismaZoom = React.createRef();

    const closeModal = () => {
        setRotation(0);
        prismaZoom.current.zoomOut(2);
        props.handleClose();
    }

    const base64 = () => {
        let base64Data = ""
        if (props.base64 === undefined) { return base64Data            
        }else{ 
            base64Data = `data:image/jpeg;base64,${props.base64}`; 
            return base64Data
        }    
    }

    const rotate =() => {
        let newRotation = rotation + 90;
        if (newRotation >= 360) {
          newRotation = -360;

        }
        setRotation(newRotation)
    }

    const rotateleft =()=> {
        let newRotation = rotation - 90;
        if (newRotation >= 360) {
          newRotation = -360;
        }

        setRotation(newRotation)
      }

    const onClickOnZoomOut = () => {
		prismaZoom.current.zoomOut(1)
	}

	const onClickOnZoomIn = () => {
        prismaZoom.current.zoomIn(1)
	}

    const onZoomChange = zoom => {
        setZoom(zoom)
    }
    
    return (
        <div>
            <Dialog     maxWidth={"xl"}
                        className={classes.rootSize} 
                        open={props.open}
                        fullWidth={true}
                        scroll={scroll}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={closeModal}
                        aria-labelledby="scroll-dialog-description"
            >

                <DialogTitle id="customized-dialog-title" onClose={closeModal}>{props.titulo}</DialogTitle> 

                <DialogContent className={classes.dialogContent} >
                    <PrismaZoom maxZoom={5} ref={prismaZoom} onZoomChange={onZoomChange}>
                      <img  style={{ transform: `rotate(${rotation}deg)`, margin: `calc((250px - 111px)/2) calc((111px - 250px)/2)` }} className={classes.img} src={base64()} alt="imagen DPI"/>
                    </PrismaZoom>
                </DialogContent>

                <DialogActions className={classes.dialogActions}>
                    <Button onClick={rotateleft} color="primary" variant="outlined"><Icon className={classes.icon}>rotate_left</Icon>Rotar a la izquierda </Button>
                    <div className={classes.appIndicator}>
                        <Button color="primary" variant="outlined" onClick={onClickOnZoomOut}>
                            <Icon className={classes.icon}>zoom_out</Icon>
                        </Button>
                            <span className={classes.spamText}>{parseInt(zoom * 100)}%</span>  
                        <Button color="primary" variant="outlined" onClick={onClickOnZoomIn}>
                            <Icon className={classes.icon}>zoom_in</Icon>
                        </Button>
                    </div>
                    <Button onClick={rotate} color="primary" variant="outlined"><Icon className={classes.icon}>rotate_right</Icon>Rotar a la derecha</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}