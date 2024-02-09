import React, { useState, useEffect } from "react";
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
function FormularioExtranjero(props) {
    let history = useHistory();
    const classes = useStyles(),
        [open, setOpen] = React.useState(false),
        [mensaje, setMensaje] = React.useState({tipoError: "success", tipoMensaje: ""}),
        [success, ] = React.useState(false),
        [apiErrors, ] = useState([]),
        // Inputs
        [cuiValue, setCuiValue] = useState(""),
        [correoValue, setCorreoValue] = useState(""),
        [telefonoValue, setTelefonoValue] = useState(""),
        [fechaCitaValue, setFechaCitaValue] = useState(""),
        [nombreYApellidoValue, setNombreYApellidoValue] = useState(""),
        //Country combobox.
        [countryValue, setCountryValue] = React.useState(""),
        //State combobox.
        [stateValue, setStateValue] = React.useState(""),
                
        [horaInicioValue, setHoraInicioValue] = React.useState(""),
        [zonaHorariaValue, setZonaHorariaValue] = React.useState(""),
        [numeroBoletaValue, setNumeroBoletaValue] = React.useState(""),
        [zonaHorariaValueName, setzonaHorariaValueName] = React.useState(""),
        [userHasAnAppointment, setUserHasAnAppointment] = React.useState(false);

    const newDate = new Date();

    const buttonClassname = clsx({[classes.buttonSuccess]: success});

    const handClose = (event, reason) => {
        if (reason === "clickaway") {return}
        setOpen(false);
    };

    const getNamesFromCUI = async (cui) => {
        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        const requestBody = {cui: cui.toString()};
        try {
            let response = await ApiServices.citasEmpadronamientoActualizacion.customPOST("obtenerIdentidad", requestBody);

            if (response.error === null && !(response.data === null) && !(response.data === "")) {
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
                    newElements.telefono.isError = false;
                    setTelefonoValue(response.data.telefono);
                }

                //Valor de número telefónico.
                if (response.data.correo !== "" && response.data.correo != null) {
                    //console.log("response.data.correo:", response.data.correo);
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
                console.error("response.error en getNamesFromCUI:", response.error);
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

    const getTimeZones = async () => {
        let newElementsExtranjero = Object.assign({}, elements);
        let datos = [];
        try{
            let response = await ApiServices.catalogoTimezone.listRegister();
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al listar. Por favor intente más tarde."});
                setOpen(true);
            } else {
                datos = response.data;
                newElementsExtranjero.zonaHoraria.list = datos
                functions.orderArray(newElementsExtranjero.zonaHoraria.list, "name");
                setElements(newElementsExtranjero);
            }
        } catch (error) {
            setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener Zonas Horarias. Por favor intente más tarde."});
            setOpen(true);
            setElements(newElementsExtranjero);
        }
    }

    const getCountries = async () => {
        let newElements = Object.assign({}, elements);
        try {
            let response = await ApiServices.paises.listRegisterPublic();
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al listar los países. Por favor intente más tarde."});
                setOpen(true);
            } else {
                var datos = response.data;
                Object.keys(datos).forEach((element, key, _array) => {
                    if (datos[element].id != "1") {
                        newElements.country.list.push({
                            id: datos[element].id,
                            name: datos[element].name,
                        });
                    }
                });
                functions.orderArray(newElements.country.list, "name");
                setElements(newElements);
            }
        } catch (error) {
            setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener los países. Por favor intente más tarde."});
            setOpen(true);
            setElements(newElements);
        }
    };

    const getStates = async (idCountry) => {
        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        try {
            ApiServices.estadosDePaises.searchCriteria.clear();
            ApiServices.estadosDePaises.searchCriteria.setOperator("and");
            ApiServices.estadosDePaises.searchCriteria.addEquals("paisId", parseInt(idCountry));
            ApiServices.estadosDePaises.setIsPublic(true);
            let response = await ApiServices.estadosDePaises.listRegisterCriteria();
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al listar los estados. Por favor intente más tarde."});
                setOpen(true);
            } else {
                var datos = response.data;
                Object.keys(datos).forEach((element, key, _array) => { // console.log("datos en getStates:", datos);
                    newElements.state.list.push({
                        id: datos[element].id,
                        name: datos[element].name,
                    });
                });
                functions.orderArray(newElements.state.list, "name");
                setElements(newElements);
            }
        } catch (error) {
            setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener los estados. Por favor intente más tarde."});
            setOpen(true);
            setElements(newElements);
        }
        props.setloadingStepperSpinner(false);
    };

    // const getCities = async (idCountry, idState) => {
    //     let newElements = Object.assign({}, elementsExtranjero);
    //     try {
    //         ApiServices.ciudades.searchCriteria.clear();
    //         ApiServices.ciudades.searchCriteria.setOperator("and");
    //         ApiServices.ciudades.searchCriteria.addEquals("paisId", idCountry);
    //         ApiServices.ciudades.searchCriteria.addEquals("estadoId", idState);
    //         let response = await ApiServices.ciudades.listRegisterCriteria();

    //         if (response.error) {
    //             setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener las ciudades. Por favor intente más tarde."});
    //             setOpen(true);
    //         } else {
    //             var datos = response.data;
    //             //console.log("datos:", datos);
    //             Object.keys(datos).forEach((element, key, _array) => {
    //                 newElements.city.list.push({
    //                     id: datos[element].id,
    //                     name: datos[element].name,
    //                 });
    //             });
    //             //functions.orderArray(newCityList, "name");
    //             setElementsExtranjero(newElements);
    //         }
    //     } catch (error) {
    //         setMensaje({tipoError: "error", tipoMensaje:"Problemas al obtener las ciudades. Por favor intente más tarde."});
    //         setOpen(true);
    //     }
    // };

    const handlerZonaHoraria = (event, value, reason) => {
        if (elements.fechaCita.value !== "") {
            let newArray = elements.zonaHoraria.list.filter(function (element) {
                return element.id === event.target.value;
            });

            if(newArray.length !== 0){
                let zonaHorariaValue = newArray[0]?.name
                setzonaHorariaValueName(zonaHorariaValue)
                getHorariosCitas(elements.fechaCita.value, zonaHorariaValue);                
            }else{
                setzonaHorariaValueName("")
                elements.horaInicio.list = []
                elements.zonaHoraria.value = "";
                setMensaje({tipoError: "error", tipoMensaje:"Por favor elija una Zona Horaria"});
                setOpen(true);
            }
        }
    };

    const getHorariosCitas = async (event, zonaHorariaValue) => {

        props.setloadingStepperSpinner(true);
        let newElements = Object.assign({}, elements);
        let requestBody = {fechaCita: event, idTimeZone: zonaHorariaValue}
        // let requestBody = {fechaCita: "2021-10-22T19:20:00.000Z", idTimeZone:"Asia/Macao"}
        try {
            let response = await ApiServices.citasEmpadronamientoActualizacion.customPOST("obtenerHorasParaCita",requestBody);
            if (response.error) {
                setMensaje({tipoError: "error", tipoMensaje:"Problemas al listar los horarios de las citas. Por favor intente más tarde."});
                setOpen(true);
            } else {
                var datos = response.data;
                newElements.horaInicio.list = datos;
                setElements(newElements);
            }
            props.setloadingStepperSpinner(false);
        } catch (error) {
            setMensaje({tipoError: "warning", tipoMensaje:"Problemas al obtener los horarios de las citas. Por favor intente más tarde."});
            setOpen(true);
            setElements(newElements);
            props.setloadingStepperSpinner(false);
        }
    };

    const handlerCountry = (event, value, reason) => {
        if (event.target.value != null) {getStates(event.target.value)}
    };

    const handlerState = (event, value, reason) => {
        if (event.target.value != null) {
        // getCities(Number(event.target.value)); // Descomentar cuando se necesite obtener comunidades.
        }
    };

    const handlerHoraInicio = (event, value, reason) => {
        let newArray = elements.horaInicio.list.filter(function (element) {
            return element.id === event.target.value;
        });
        setHoraInicioValue(newArray[0].name);
    };

    const handlerFechaCita = (event, value, reason) => {

        let newArray = elements.zonaHoraria.value
        
        if (event.target.value != null) {  
            if(newArray.length !== 0){
                let zonaHorariaValue = newArray?.name
                getHorariosCitas(elements.fechaCita.value, zonaHorariaValue);     
            }else{     
                setMensaje({tipoError: "error", tipoMensaje:"Por favor elija una Zona Horaria"});
                setOpen(true);
            }
        }
    };

    const additionalHandlerCui = () => {
        setUserHasAnAppointment(false); // When CUI changes, userHasAnAppointment shall be changed to false.
    };

    // const [elementsExtranjero, setElementsExtranjero] = React.useState({
    //     country: {
    //         idelement: "country", value: "", label: "País *", pattern: "", validators: ["required"], errorMessages: ["País requerido"], isError: false, elementType: "customAutocomplete",
    //         list: [], handler: handlerCountry, useStateHook: setCountryValue, key: 7, keys: [7, 8], children: ["state", "city"],
    //     },
    //     state: {
    //         idelement: "state", value: "", label: "Estado *", pattern: "", validators: ["required"], errorMessages: ["Estado requerido"], isError: false, elementType: "customAutocomplete",
    //         list: [], cleanListOnExit: true, handler: handlerState, useStateHook: setStateValue, key: 9, keys: [9, 10], children: ["city"],
    //     },
    //     zonaHoraria: {
    //         idelement: "zonaHoraria", value: "", label: "Zona horaria *", pattern: "", validators: ["required"], errorMessages: ["Especifique su zona horaria."], isError: false, elementType: "autocompleteV2",
    //         list: [], useStateHook: setZonaHorariaValue, handler: handlerZonaHoraria , key: 13, keys: [13, 14],
    //     },
    // });

    const [elements, setElements] = React.useState({
        cui: {
            idelement: "cui", value: "", label: "CUI del DPI *", pattern: "^[0-9]*$", requiredLength: 13, validators: ["required"], errorMessages: ["Valor numérico de 13 dígitos."],
            autoComplete: false, isError: false, elementType: "input", additionalHandler: additionalHandlerCui, useStateHook: setCuiValue, keyPress: keyPressCui
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
        country: {
            idelement: "country", value: "", label: "País *", pattern: "", validators: ["required"], errorMessages: ["País requerido"], isError: false, elementType: "customAutocomplete",
            list: [], handler: handlerCountry, useStateHook: setCountryValue, key: 7, keys: [7, 8], children: ["state", "city"],
        },
        state: {
            idelement: "state", value: "", label: "Estado *", pattern: "", validators: ["required"], errorMessages: ["Estado requerido"], isError: false, elementType: "customAutocomplete",
            list: [], cleanListOnExit: true, handler: handlerState, useStateHook: setStateValue, key: 9, keys: [9, 10], children: ["city"],
        },
        zonaHoraria: {
            idelement: "zonaHoraria", value: "", label: "Zona horaria *", pattern: "", validators: ["required"], errorMessages: ["Especifique su zona horaria."], isError: false, elementType: "autocompleteV2",
            list: [], useStateHook: setZonaHorariaValue, handler: handlerZonaHoraria , key: 13, keys: [13, 14],
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
        let requestBody = {};
        let errorMessage = "Debe completar todos los campos obligatorios (*) del formulario.";

        allGood = functions.checkIsEmptyWhenRequiredElement(elements,setElements);
        requestBody = { //Chequeamos que los métodos llamados anteriormente hayan usado bie los hooks de cada element.
            codigoPais: countryValue, codigoEstado: stateValue, cui: cuiValue, nombreYApellido: nombreYApellidoValue, fechaCita: fechaCitaValue, 
            numeroContacto: telefonoValue, email: correoValue, horaCita: horaInicioValue, idTimeZone: zonaHorariaValueName
        };
        Object.keys(requestBody).forEach((attribute) => {
            if (requestBody[attribute] === "" || requestBody[attribute] === null) {allGood = false}
        });
        requestBody["nroBoleta"] = numeroBoletaValue;
        requestBody["esNacional"] = false;

        let FechaSistema = new Date();
        let diaFechaSistema = FechaSistema.getDate();

        if (allGood && fechaCitaValue) {
            if (fechaCitaValue < FechaSistema) {
                if (diaFechaSistema > fechaCitaValue.getDate()) {
                    allGood = false;
                    errorMessage = "Fecha del sistema es mayor a la fecha seleccionada. Por favor seleccione una fecha válida.";
                }
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
                    console.error("Problemas al crear registro de cita:", response.error);
                } else {
                    frontStep();
                }
                props.setloadingStepperSpinner(false);
            } catch (error) {
                setOpen(true);
                setMensaje({tipoError: "error", tipoMensaje: "Problemas al crear registro de cita. Por favor intente más tarde."});
                props.setloadingStepperSpinner(false);
                console.error("Problemas al crear registro de cita:", error);
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

    useEffect(() => {
        functions.clearElementValues(elements, setElements);
        getCountries();
        getTimeZones();
    }, []);

    useEffect(() => {
        if (props.open === true){
            getNamesFromCUI("")
        }
    }, [props.open])

    return (
        <React.Fragment>
            <Grid className={classes.comboboxGrid} item xs={12}>
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
            <ResponseElement type={mensaje.tipoError} content={mensaje.tipoMensaje} open={open} handClose={handClose}/>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularioExtranjero);