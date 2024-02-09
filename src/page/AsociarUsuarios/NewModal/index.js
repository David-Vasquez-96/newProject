import React from "react";
import Title from "component/Title";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
//import { useStyles } from "./style";
import MainStepperDiv from "./MainStepperDiv";
import LoadingSpinner from "component/LoadingSpinner";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  //const classes = useStyles();
  const [loadingStepperSpinner, setloadingStepperSpinner] =
  React.useState(false);

  return (
    <div>
      <Dialog
        open={props.open}
        maxWidth={"md"}
        fullWidth={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Title title="Asociar a usuario para servicios de organización política" />

        <MainStepperDiv setloadingStepperSpinner = {setloadingStepperSpinner} {...props} />
        <LoadingSpinner open={loadingStepperSpinner}></LoadingSpinner>
      </Dialog>
    </div>
  );
}
