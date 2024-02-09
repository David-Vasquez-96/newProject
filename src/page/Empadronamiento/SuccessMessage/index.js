import React from "react";
import Alert from "react-s-alert";
import { Icon, Button, CircularProgress, Slide } from "@material-ui/core/";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
//Api services
import ApiServices from "service/ApiServices";
//Styles
import { useStyles } from "./style";
import AlertDialogSlide from "component/AlertElementSimple";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SuccessMessage(props) {
  const classes = useStyles(props),
    [loading, setLoading] = React.useState(false);

  const ClearCircularProgressButton = () => {
    setLoading(false);
  };

  const [elements] = React.useState({
    password: {
      idelement: "password",
      value: "",
      label: "Clave",
      pattern: "^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$",
      validators: ["required"],
      errorMessages: [
        'Alfanumérico y simbolos "().%$#/-@" de 6 a 20 caracteres',
      ],
      isError: false,
      elementType: "password",
    },
  });

  return (
    <div>
      <Dialog
        maxWidth={"sm"}
        fullWidth={false}
        className={classes.rootSize}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className={classes.iconContainer}>
          <AlertDialogSlide success openModal={props.open} />
        </div>

        <DialogTitle className={classes.title} id="alert-dialog-slide-title">
          ¡Solicitud de Empadronamiento enviada exitosamente!
        </DialogTitle>

        <DialogContent className={classes.description}>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          <DialogContentText className={classes.descriptionText}>
            Se ha enviado una solicitud de empadronamiento. Pronto, uno de
            nuestros colaboradores revisará tu solicitud para determinar si
            pueden actualizarse tus datos. Puedes esperar una respuesta en las
            próximas 72 horas.
            <br></br>
          </DialogContentText>
        </DialogContent>

        <DialogActions className={classes.buttonContainer}>
          <Button onClick={props.handleClose} color="primary" variant="contained">
            {/* <Icon> note_add </Icon> */}
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
