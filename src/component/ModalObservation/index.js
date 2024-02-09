import React from "react";
import Slide from "@material-ui/core/Slide";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
//Styles
import { useStyles } from "./style";
import Title from "component/TitleWithIcon";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalConfimation(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        maxWidth={"sm"}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Title title={props.title} icon={"/assets/comments.svg"} />
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            {props.textoObservacion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={props.handleClose}
            color="secondary"
            variant="outlined"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
