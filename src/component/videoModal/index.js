import React from 'react';
import {useStyles} from './style';
import {Slide } from '@material-ui/core';
import {Dialog, DialogContent} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { functions } from "constant/index";
import { useEffect } from 'react';

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



export default function VideoPrev(props) {
    const base64 = "data:video/mp4;base64," + props.base64
    const   classes = useStyles(),
            [scroll,] = React.useState('body'),
            [source, setSource] = React.useState();

    const closeModal = () => {
        props.handleClose();
    }

    const handleFileChange = () => {
        functions.base64ToFile(base64, 'xxxx','video/mp4')    // convertimos base64 a file 
            .then(function(file){
                const url = URL.createObjectURL(file);
                setSource(url);
            }
        );
    };

    useEffect(() => {
        handleFileChange()
    }, [])

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
                    <video
                        style={{height: "80vh"}}
                        className="VideoInput_video"
                        width="100%"
                        controls
                        src={source}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}