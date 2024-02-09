import React, { useRef } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core/";
import ApiServices from "service/ApiServices";
import { useStyles } from "./style";
//import ResponseElement from "components/ResponseElement";
import ResponseElement from "component/MensajeElement";
import { Send, NavigateBefore } from "@material-ui/icons";
//REDUX
import { connect } from "react-redux";
import mapDispatchToProps from "./mapDispatchToProps";
import mapStateToProps from "./mapStateToProps";
import useState from "react-usestateref";

const SaveDataComponent = (props) => {
  const classes = useStyles(props),
    // [loading, setLoading] = React.useState(false),
    [success, setSuccess] = React.useState(false),
    [open, setOpen] = React.useState(false),
    [autorizationFile, setAutorizationFile, autorizationFileRef] = useState(""),
    [mensaje, setMensaje] = React.useState({
      tipoError: "success",
      tipoMensaje: "",
    }),
    buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });

  const handClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const cancel = () => {
    props.handleClose();
  };

  const frontStep = () => {
    props.ASOCIAR_USUARIOS_SET_STEP(2);
  };

  const habilitarUsuarioRequest = async () => {
    //console.table("props:", props)
    let allGood = true;
    let requestBody = {};
    requestBody = {
      permisoICO: props.permisoICO,
      tipoPermisoICO: props.tipoPermisoICO,
      departamentoICO: props.departamentoICO,
      municipioICO: props.municipioICO,
      permisoAfiliacion: props.permisoAfiliacion
    };

    //console.log("requestBody:", requestBody);

    if (requestBody.permisoICO){
      if (requestBody.tipoPermisoICO === ""){
        setMensaje({
          tipoError: "error",
          tipoMensaje: "Debe especificar un tipo de permiso para el Portal de Inscripción de Candidatos.",
        });
        setOpen(true);
        allGood = false;
      }
      else if (requestBody.tipoPermisoICO === "Departamental" && requestBody.departamentoICO === ""){
        setMensaje({
          tipoError: "error",
          tipoMensaje: "Debe especificar un departamento para el Portal de Inscripción de Candidatos.",
        });
        setOpen(true);
        allGood = false;

      }
      else if ((requestBody.tipoPermisoICO === "Municipal" && requestBody.departamentoICO === "") || (requestBody.tipoPermisoICO === "Municipal" && requestBody.municipioICO === "")){
        setMensaje({
          tipoError: "error",
          tipoMensaje: "Debe especificar departamento y municipio para el Portal de Inscripción de Candidatos.",
        });
        setOpen(true);
        allGood = false;
      }
    }

    /* let responseCreate = await ApiServices.habilitarUsuarioAfiliadoOP.create(
        requestBody
      ); 

    if (responseCreate.error === null) {
      setOpen(true);
      setMensaje({
        tipoError: "success",
        tipoMensaje: "Usuario asociado exitosamente.",
      });
      ClearFiles();
      props.updateList();
      frontStep();
    } else {
      setOpen(true);
      setMensaje({
        tipoError: "error",
        tipoMensaje: responseCreate.error.message,
      });
    } */

    if (allGood){
      frontStep();
    }
  };

  const habilitarUsuario = async () => {
    props.setloadingStepperSpinner(true);

    await habilitarUsuarioRequest();
    //frontStep();

    props.setloadingStepperSpinner(false);
  };

  const backStep = () => {
    props.clearFiles();
  };

  return (
    <div className={classes.rootdiv}>
      <ResponseElement
        type={mensaje.tipoError}
        content={mensaje.tipoMensaje}
        open={open}
        handClose={handClose}
      />

      <div className={classes.wrapper}>
        <Button
          variant="contained"
          onClick={backStep}
          className={classes.SpaceButton}
        >
          <Icon>
            <NavigateBefore />
          </Icon>
          Regresar
        </Button>
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          onClick={habilitarUsuario}
          //onClick={frontStep}
          color="primary"
          disabled={false}
          className={buttonClassname}
          endIcon={<Send />}
        >
          Asociar Usuario
        </Button>
        {/* {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )} */}
      </div>
      <div className={classes.wrapper}>
        <Button onClick={cancel} color="secondary" variant="contained">
          <Icon className={classes.icon}> cancel </Icon> Cancelar
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDataComponent);
