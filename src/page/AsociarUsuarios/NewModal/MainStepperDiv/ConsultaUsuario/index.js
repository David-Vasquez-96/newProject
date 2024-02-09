import React from "react";
//import uuid from "react-uuid";
import Form from "component/Form/FormTwoColumns";
//import QRCode from "react-weblineindia-qrcode-generator";
import ListElement from "./ListElement";
import ApiServices from "service/ApiServices";
//import ResponseElement from "components/ResponseElement";
import ResponseElement from "component/MensajeElement";
import { NavigateNext } from "@material-ui/icons";
import { Button, Icon } from "@material-ui/core";

//REDUX
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { useStyles } from "./styles";

const ConsultaUsuario = (props) => {
  const classes = useStyles();

  //console.log("props:", props);
  const svgRef = React.useRef(),
    [cve, setCve] = React.useState(0),
    [open, setOpen] = React.useState(false),
    [apiErrors, setApiErrors] = React.useState([]),
    [mensaje, setMensaje] = React.useState({
      tipoError: "success", //Hay que inicializarlo con un valor válido o da warning.
      tipoMensaje: "",
    });

  const handClose = (event, reason) => {
    if (reason === "clickaway") {
      // console.log("clickaway");
      return;
    }
    setOpen(false);
  };

  const keyPressCui = (event) => {
    elements.email.value = "";
    setElements({ ...elements });

    if (event.key === "Enter") {
      if (
        event.target.value
          .toString()
          .match(elements[event.target.name].pattern) === null
      ) {
        elements[event.target.name].isError = true;
      } else {
        elements[event.target.name].isError = false;
        consulta2(elements.cui.value);
        elements.email.value = "";
        setElements({ ...elements });
      }
    }
  };

  const onChangeCui = (event, self) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || event.target.value.length === 13) {
      elements[event.target.name].isError = false;
    }
    if (event.target.value === "" || re.test(event.target.value)) {
      elements.cui.value = event.target.value;
      elements.email.value = "";
      setElements({ ...elements });
    }
  };

  const onChangeEmail = (event) => {
    if (
      event.target.value === "" ||
      event.target.value
        .toString()
        .match(elements[event.target.name].pattern) != null
    ) {
      elements[event.target.name].isError = false;
    }
    elements.email.value = event.target.value;
    elements.cui.value = "";
    setElements({ ...elements });
  };

  const keyPressEmail = (event) => {
    elements.cui.value = "";
    setElements({ ...elements });
    if (event.key === "Enter") {
      if (
        event.target.value
          .toString()
          .match(elements[event.target.name].pattern) === null
      ) {
        elements[event.target.name].isError = true;
      } else {
        elements.cui.value = "";
        setElements({ ...elements });
        consulta2(elements.email.value);
      }
    }
  };

  const [elements, setElements] = React.useState({
    cui: {
      idelement: "cui",
      value: "",
      label: "Ingrese CUI del DPI",
      pattern: "^[0-9]{13}$",
      validators: ["required"],
      errorMessages: ["El número debe tener 13 dígitos."],
      isError: false,
      elementType: "customInput",
      disabled: false,
      keyPress: keyPressCui,
      onChange: onChangeCui,
    },
    email: {
      idelement: "email",
      value: "",
      label: " Ingrese correo del usuario",
      pattern:
        "^[\\w-+._%.]+(\\.[\\w-]{1,25}){0,25}@[\\w-]{1,25}(\\.[\\w-]{1,10})+[\\w-]+$",
      errorMessages: ["Debe especificar un email válido."],
      isError: false,
      elementType: "customInput",
      disabled: false,
      keyPress: keyPressEmail,
      onChange: onChangeEmail,
    },
  });

  /*   const validarLetrasDeCui = (newCve) => {
    let numero = elements.cui.value;
    if (!/^[0-9]{13}$/.test(numero)) {
      setOpen(true);
      setMensaje({
        tipoError: "error",
        tipoMensaje: "CUI demasiado corto/largo o incluye letras",
      });
    } else {
      consulta2(newCve);
    }
  }; */

  const nextStepConsulta = () => {
    //Valida que exista en props el registro del usuario.
    if (props.dataUsuarioPorAsociar.cui != "") {
      props.ASOCIAR_USUARIOS_SET_STEP(1);
    } else {
      setOpen(true);
      setMensaje({
        tipoError: "error",
        tipoMensaje: "Debe consultar un usuario con derecho a esta asociación.",
      });
    }
  };

  const consulta2 = async (cuiOrEmail) => {
    props.setloadingStepperSpinner(true);
    try {
      let response =
        await ApiServices.consultaExistenciaEnPortalWebExterno.consultarExistenciaEnPortalWebExterno(
          cuiOrEmail
        );
      if (response.error !== null) {
        props.HUAOP_SET_DATA(props.dataVacia);

        setOpen(true);
        setMensaje({ tipoError: "error", tipoMensaje: response.error.message });
        //setLoading(false);
      } else {
        if (response.data) {
          //console.log("response.data:", response.data);
          // if (response.data.afiliationData.afiliacion) {
          if (response.data.afiliationData) {
            let dataAfiliado = {
              cui: response.data.afiliationData.cuiDpi,
              email: response.data.email,
              name: response.data.afiliationData.name,
              // afiliacion: response.data.afiliationData.afiliacion,
              // partido: response.data.afiliationData.nombreOP,
            };

            Object.keys(dataAfiliado).forEach(function (key) {
              if (dataAfiliado[key] == null) {
                dataAfiliado[key] = "";
              }
            });

            //console.log("dataAfiliado:", dataAfiliado);
            props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(dataAfiliado);

            setElements({ ...elements });
            setOpen(true);

            /* if (dataAfiliado.afiliacion === "AFILIADO") {
              setMensaje({
                tipoError: "success",
                tipoMensaje:
                  "El ciudadano está afiliado y sí cuenta con derecho a este proceso.",
              });
            } else {
              setMensaje({
                tipoError: "success",
                tipoMensaje:
                  "El ciudadano no está afiliado, pero cuenta con derecho a este proceso.",
              });
            } */

            setMensaje({
              tipoError: "success",
              tipoMensaje:
                "El ciudadano existe en el Portal Web y puede asociarse.",
            });
          } else {
            setOpen(true);
            setMensaje({
              tipoError: "error",
              tipoMensaje:
                "Error en la consulta. Comuníquese con soporte técnico.",
            });
            props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
              props.dataUsuarioPorAsociarVacia
            );
          }
        } else {
          setOpen(true);
          setMensaje({
            tipoError: "error",
            tipoMensaje:
              "Error en la consulta. Comuníquese con soporte técnico.",
          });
          props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
            props.dataUsuarioPorAsociarVacia
          );
        }
      }
    } catch (exception) {
      console.error("exception:", exception);
      setOpen(true);
      setMensaje({
        tipoError: "error",
        tipoMensaje: "¡Error al buscar datos de padrón!",
      });
      props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
        props.dataUsuarioPorAsociarVacia
      );
    }
    props.setloadingStepperSpinner(false);
  };

  const back = () => {
    props.handleClose();
  };

  return (
    <div>
      <ResponseElement
        type={mensaje.tipoError}
        content={mensaje.tipoMensaje}
        open={open}
        handClose={handClose}
      />

      <Form elements={elements} apiErrors={apiErrors} />
      <div ref={svgRef} style={{ display: "none" }}></div>
      <ListElement data={props.data} />
      <Button
        name={"Siguiente"}
        key={1}
        variant="contained"
        className={classes.buttonSiguiente}
        size="medium"
        onClick={() => {
          nextStepConsulta();
        }}
      >
        <Icon>
          {" "}
          <NavigateNext />
        </Icon>
        {" Siguiente"}
      </Button>
      <Button onClick={back} color="secondary" variant="contained">
        <Icon className={classes.iconCancelar}> cancel </Icon>
        Cancelar
      </Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultaUsuario);
