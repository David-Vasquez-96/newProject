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

    const getNamesFromCUI = async (cui) => {
        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        const requestBody = {cui: cui.toString()};
        // Para cuando no hay API para probar la funcionalidad:
        // newElements.nombreYApellido.value = "DIEGO JOSE GONZALEZ ROCA";
        // newElements.nombreYApellido.disabled = true;
        // setElements({...newElements});
        try {
            let response = await ApiServices.citasEmpadronamientoActualizacion.customPOST("obtenerIdentidad", requestBody);

            if (response.error === null && !(response.data === null) && !(response.data === "")) {
                // Setear el valor en el input.

                //Valor de cui
                newElements.cui.value = response.data.cui;
                newElements.cui.disabled = true;
                newElements.cui.isError = false;
                setCuiValue(response.data.cui);

                //Valores de nombre y apellido
                newElements.nombreYApellido.value = response.data.nombreCompleto;
                newElements.nombreYApellido.disabled = true;
                newElements.nombreYApellido.isError = false;
                setNombreYApellidoValue(response.data.nombreCompleto);

                //Valor de número telefónico.
                if (response.data.telefono !== "" && response.data.telefono != null) {
                    newElements.telefono.value = response.data.telefono;
                    // newElements.telefono.disabled = true;
                    newElements.telefono.isError = false;
                    setTelefonoValue(response.data.telefono);
                }

                //Valor de número telefónico.
                if (response.data.correo !== "" && response.data.correo != null) {
                    newElements.correo.value = response.data.correo;
                    // newElements.correo.disabled = true;
                    newElements.correo.isError = false;
                    setCorreoValue(response.data.correo);
                }

                //Valor de numero de boleta.
                if (response.data.nroBoleta !== "" && response.data.nroBoleta != null) {
                    setNumeroBoletaValue(response.data.nroBoleta);
                }

                setElements({ ...newElements });
                
                if (response.data.SolicitudesPendientes === true) {setUserHasAnAppointment(true)} 
                    else {setUserHasAnAppointment(false)}

            } else if (!(response.error == null)) {
                setOpen(true);
                setMensaje({tipoError: "error", tipoMensaje: response.error});
            } else {
                setOpen(true);
                setMensaje({tipoError: "error", tipoMensaje: "Error al consultar CUI. Por favor intente más tarde."});
            }
        } catch (error) {
            console.error("Error en try/catch en getNamesFromCUI:", error);
            setOpen(true);
            setMensaje({tipoError: "error", tipoMensaje: "Error al consultar CUI. Por favor intente más tarde."});
        }
        props.setloadingStepperSpinner(false);
    };

    const keyPressCui = (event) => {
        if (event.key === "Enter") {
            if (elements[event.target.name].requiredLength) {
                if (elements[event.target.name].requiredLength == event.target.value.length) {getNamesFromCUI(event.target.value)} 
                else {
                    elements[event.target.name].isError = true;
                    setElements({ ...elements });
                }
            } else {
                getNamesFromCUI(event.target.value);
            }
        }
    };

    const additionalHandlerCui = () => {
        setUserHasAnAppointment(false);  // When CUI changes, userHasAnAppointment shall be changed to false.
    };

    const handlerFechaCita = (event) => {
        if (event.target.value != null) {
            getHorariosCitas(event.target.value);
        }
    };

    const getHorariosCitas = async (fechaCita) => {
        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        let requestBody = {fechaCita: fechaCita};
        var datos
        try {
            let response = await ApiServices.citasEmpadronamientoActualizacion.customPOST("obtenerHorasParaCita",requestBody);
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener los horarios de las citas. Por favor intente más tarde."});
                setOpen(true);
            } else {
                datos = response.data;
                newElements.horaInicio.list = [];
                Object.keys(datos).forEach((element, key, _array) => {
                    if (datos[element].disponible) {    // Agregando a la lista de horas, solo las disponibles.
                        // let nuevaHora = functions.aplicarDiferenciaHoraria(datos[element].hora, horasDeDiferencia);
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
            setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener los horarios de las citas. Por favor intente más tarde."});
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
            autoComplete: false, isError: false, elementType: "input", additionalHandler: additionalHandlerCui, useStateHook: setCuiValue, keyPress: keyPressCui, minWidth: 100, 
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

        let FechaSistema = new Date();
        let diaFechaSistema = FechaSistema.getDate();

        if ((allGood && fechaCitaValue) && (fechaCitaValue < FechaSistema)) {
            if (diaFechaSistema > fechaCitaValue.getDate()) {
                allGood = false;
                errorMessage = "Fecha del sistema es mayor a la fecha seleccionada. Por favor seleccione una fecha válida.";
            }
        }

        if (userHasAnAppointment) {
            allGood = false;
            errorMessage = "El ciudadano cuyo CUI fue ingresado ya tiene una cita de empadronamiento pendiente.";
        }

        if (allGood) {
            try {
                let response = await ApiServices.citasEmpadronamientoActualizacion.customPOST("instituirCita", requestBody);
                if (response.error) {
                    setOpen(true);
                    setMensaje({ tipoError: "error", tipoMensaje: "Problemas al crear registro de cita. Por favor intente más tarde."});
                } else {
                    frontStep();
                }
                props.setloadingStepperSpinner(false);
            } catch (error) {
                setOpen(true);
                setMensaje({tipoError: "error", tipoMensaje: "Problemas al crear registro de cita. Por favor intente más tarde."});
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

    React.useEffect(() => {
        if (props.open === true) {
            getNamesFromCUI("")
        }
    }, [props.open]);

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
