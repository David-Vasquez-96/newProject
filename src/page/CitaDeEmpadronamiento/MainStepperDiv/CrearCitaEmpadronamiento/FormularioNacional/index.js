import React, { useState } from "react";
import clsx from "clsx";
import { Send } from "@material-ui/icons";
import { useStyles } from "./style";
import { functions } from "constant/index";
import { useHistory } from "react-router-dom";
import { Grid, Button, Icon } from "@material-ui/core/";
//COMPONENTS
import Form from "component/Form/FormTwoColumns";
import ApiServices from "service/ApiServices";
import ResponseElement from "component/MensajeElement";
//REDUX
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

// Desde y Hasta Imports
function FormularioNacional(props) {
    let history = useHistory();
    const newDate = new Date();
    const classes = useStyles(),
        [open, setOpen] = React.useState(false),
        [mensaje, setMensaje] = React.useState({tipoError: "success", tipoMensaje: ""}),
        [success, setSuccess] = React.useState(false),
        [apiErrors, setApiErrors] = useState([]),
        // Inputs
        [cuiValue, setCuiValue] = useState(""),
        [correoValue, setCorreoValue] = useState(""),
        [telefonoValue, setTelefonoValue] = useState(""),
        [fechaCitaValue, setFechaCitaValue] = useState(""),
        [nombreYApellidoValue, setNombreYApellidoValue] = useState(""),
        // Días state
        [horaInicioValue, setHoraInicioValue] = React.useState(""),
        [numeroBoletaValue, setNumeroBoletaValue] = React.useState(""),
        [userHasAnAppointment, setUserHasAnAppointment] = React.useState(false);
        
    const buttonClassname = clsx({[classes.buttonSuccess]: success});

    const handClose = (event, reason) => {
        if (reason === "clickaway") {return}
        setOpen(false);
    };

    const additionalHandlerCui = () => {
        setUserHasAnAppointment(false);  // When CUI changes, userHasAnAppointment shall be changed to false.
    };

    const handlerFechaCita = (event, value, reason) => {
        if (event.target.value != null) {
            // console.log("event.target.value at handlerFechaCita:", event.target.value);
            getHorariosCitas(event.target.value);
        }
    };

    const getHorariosCitas = async (fechaCita) => {
        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        let requestBody = {fechaCita: fechaCita};
        var datos
        try {
            let response = await ApiServices.citasEmpadronamientoActualizacion.customPOSTpublic("obtenerHorasParaCita",requestBody);
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al listar los horarios de las citas. Por favor intente más tarde."});
                setOpen(true);
            } else {
                datos = response.data;
                // console.log("datos en citasEmpadronamientoActualizacion/obtenerHorasParaCita:",datos);
                newElements.horaInicio.list = [];
                Object.keys(datos).forEach((element, key, _array) => {
                    if (datos[element].disponible) {    // Agregando a la lista de horas, solo las disponibles.
                        newElements.horaInicio.list.push({
                            id: datos[element].id,
                            name: datos[element].name,
                            horaGuatemala: datos[element].hora,
                        });
                    }
                });
                setElements(newElements);
            }
            props.setloadingStepperSpinner(false);
        } catch (error) {
            setMensaje({tipoError: "error", tipoMensaje:"Problemas en la petición de los horarios de las citas. Por favor intente más tarde."});
            setOpen(true);
            setElements(newElements);
            props.setloadingStepperSpinner(false);
        }
    };

    const handlerHoraInicio = (event, value, reason) => {
        let newArray = elements.horaInicio.list.filter(function (element) {
            return element.id === event.target.value;
        });
        setHoraInicioValue(newArray[0].name);
    };

    const [elements, setElements] = React.useState({
        cui: {
            idelement: "cui", value: "", label: "CUI del DPI *", pattern: "^[0-9]*$", requiredLength: 13, validators: ["required"], errorMessages: ["Valor numérico de 13 dígitos."],
            autoComplete: false, isError: false, elementType: "input", additionalHandler: additionalHandlerCui, useStateHook: setCuiValue,
        },
        nombreYApellido: {
            idelement: "nombreYApellido", value: "", label: "Nombre y Apellido *", pattern: "^([\\w_][\\w_ -.\"'Ññ]*[\\w_.\"'Ññ]){1,50}$", validators: ["required"], errorMessages: ["Sin tildes, ni espacios al inicio y final"],
            isError: false, elementType: "input", disabled: false, enableOnExit: true, useStateHook: setNombreYApellidoValue,
        },
        telefono: {
            idelement: "telefono", value: "", label: "Número de Teléfono *", pattern: "^[0-9]*$", validators: ["required"], errorMessages: ["Teléfono es requerido."],
            isError: false, enableOnExit: true, elementType: "input", useStateHook: setTelefonoValue,
        },
        correo: {
            idelement: "correo", value: "", label: "Dirección de Correo Electrónico *", pattern: "^[\\w-+._%.]+(\\.[\\w-]{1,25}){0,25}@[\\w-]{1,25}(\\.[\\w-]{1,10})+[\\w-]+$",
            validators: ["required"], errorMessages: ["Dirección de correo electrónico válida."], isError: false, enableOnExit: true, elementType: "input", useStateHook: setCorreoValue,
        },
        fechaCita: {
            idelement: "fechaCita", value: newDate, defaultValue: newDate, label: "Fecha de la Cita *", pattern: "^[0-9]{1,2}[/][0-9]{1,2}[/][0-9]{4}$", validators: ["required"],
            errorMessages: ["Es requerido seleccionar fecha"], isError: false, elementType: "date", handler: handlerFechaCita, useStateHook: setFechaCitaValue,
        },
        horaInicio: {//Al llamar clearElementValues, se vacía esta lista. 
            idelement: "horaInicio", value: "", label: "Hora de Cita *", pattern: "", validators: ["required"], errorMessages: ["Especifique hora de cita."], isError: false,
            elementType: "customDropdown", cleanListOnExit: true, list: [], useStateHook: setHoraInicioValue, handler: handlerHoraInicio,
        },
    });

    const crearRegistro = async () => {
        props.setloadingStepperSpinner(true);
        let allGood = true;
        let errorMessage = "Debe completar todos los campos obligatorios (*) del formulario.";
        let requestBody = {};

        allGood = functions.checkIsEmptyWhenRequiredElement(elements, setElements);
        requestBody = {cui: cuiValue, nombreYApellido: nombreYApellidoValue, fechaCita: fechaCitaValue, numeroContacto: telefonoValue, email: correoValue, horaCita: horaInicioValue};
        
        Object.keys(requestBody).forEach((attribute) => {
            if (requestBody[attribute] === "" || requestBody[attribute] === null) {allGood = false;}
        });

        requestBody["nroBoleta"] = numeroBoletaValue;
        requestBody["codigoPais"] = "";
        requestBody["esNacional"] = true;
        requestBody["codigoEstado"] = "";
        
        // console.log("requestBody:", requestBody);

        let FechaSistema = new Date();
        let diaFechaSistema = FechaSistema.getDate();

        if ((allGood && fechaCitaValue) && (fechaCitaValue < FechaSistema)) {
            if (diaFechaSistema > fechaCitaValue.getDate()) {
                allGood = false;
                errorMessage = "Fecha seleccionada es menor a la actual. Por favor seleccione una fecha mayor a la de hoy.";
            }
        }

        if (userHasAnAppointment) {
            allGood = false;
            errorMessage = "El ciudadano cuyo CUI fue ingresado ya tiene una cita de empadronamiento pendiente.";
        }

        if (allGood) {
            try {
                let response = await ApiServices.citasEmpadronamientoActualizacion.customPOSTpublic("instituirCita", requestBody);

                if (response.error) {
                    setOpen(true);
                    setMensaje({ tipoError: "error", tipoMensaje: response.error.message});
                } else {
                    frontStep();
                }
                props.setloadingStepperSpinner(false);
            } catch (error) {
                setOpen(true);
                setMensaje({tipoError: "error", tipoMensaje: "Problemas al realizar la petición crear registro de cita. Por favor intente más tarde."});
                props.setloadingStepperSpinner(false);
            }
        } else {
            props.setloadingStepperSpinner(false);
            setMensaje({tipoError: "error", tipoMensaje: errorMessage});
            setOpen(true);
        }
        props.setloadingStepperSpinner(false);
    };

    const frontStep = () => {props.CITA_EMPADRONAMIENTO_SET_STEP(1)};

    const cancel = () => {
        functions.clearElementValues(elements, setElements);
        setNumeroBoletaValue("");
        setUserHasAnAppointment(false);
        history.push("/", {});
    };

    // React.useEffect(() => {
    //     getHorariosCitas(elements.fechaCita.value)
    // }, [])

    return (
        <React.Fragment>
            <Grid container>
                <Grid className={classes.AlignTable} item xs={12}>
                    <Form elements={elements} apiErrors={apiErrors} />
                </Grid>                        
            
                <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                    <div className={classes.wrapper}>
                        <Button onClick={cancel} color="secondary" variant="outlined">
                            <Icon className={classes.icon}> cancel </Icon> Cancelar
                        </Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained" color="primary"
                            disabled={false} className={buttonClassname}
                            onClick={crearRegistro} endIcon={<Send />}
                        >
                        Crear Cita
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <ResponseElement type={mensaje.tipoError} content={mensaje.tipoMensaje} open={open} handClose={handClose}/>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularioNacional);
