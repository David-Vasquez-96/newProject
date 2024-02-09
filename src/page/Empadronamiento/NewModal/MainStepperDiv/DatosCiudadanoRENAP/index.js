import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core/";
import clsx from "clsx";
import { Icon } from "@material-ui/core/";
import { Send } from "@material-ui/icons";
import { useStyles } from "./style";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { useHistory } from "react-router-dom";
import Form from "component/Form/FormTwoColumns";
import DatosCiudadano from "./DatosCiudadano";
import { functions } from "constant/index";
import ApiServices from "service/ApiServices";
import ResponseElement from "component/MensajeElement";

function DatosCiudadanoRENAP(props) {
  let history = useHistory();
  const classes = useStyles(),
    [open, setOpen] = React.useState(false),
    [mensaje, setMensaje] = React.useState({
      tipoError: "success",
      tipoMensaje: "",
    }),
    [success, setSuccess] = React.useState(false),
    [apiErrors, setApiErrors] = useState([]),
    [selectedForm, setSelectedForm] = React.useState("Nacional"),
    // customInputs
    [direccionValue, setDireccionValue] = useState(""),
    [telefonoValue, setTelefonoValue] = useState(""),
    [emailValue, setEmailValue] = useState(""),
    [noVidenteValue, setNoVidenteValue] = useState(""),
    [alfabetismoValue, setAlfabetismoValue] = useState(""),
    // [noCasaValue, setnoCasaValue] = useState(""),
    // [zonaValue, setzonaValue] = useState(""),
    //Departamento combobox.
    [departamentoValue, setDepartamentoValue] = React.useState(""),
    //Municipio combobox.
    [municipioValue, setMunicipioValue] = React.useState(""),
    //Comunidad combobox.
    [comunidadValue, setComunidadValue] = React.useState(""),
    //Ocupación combobox.
    [ocupacionValue, setOcupacionValue] = React.useState(""),
    //Country combobox.
    [countryValue, setCountryValue] = React.useState(""),
    //State combobox.
    [stateValue, setStateValue] = React.useState(""),
    //City combobox.
    [cityValue, setCityValue] = React.useState(""),
    // [dontAllowChange, setDontAllowChange] = React.useState(false),
    [articulo5Text, setArticulo5Text] = React.useState("");
    let ArrayNoVidentePadron =[ {id:'0', name: 'Vidente'}, {id: '1', name: 'No vidente'}]
    let ArrayNoVidenteRenap =[ {id:'0', name: 'No Vidente'}, {id: '1', name: 'Vidente'}]
    let ArrayAlfabetismo =[ {id: '0', name: 'No lee, No Escribe'},{id: '1', name: 'Lee'},{id: '2', name: 'Escribe'},{id: '3', name: 'Lee, Escribe'}]
    let noVidenteValidacion = ''

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateChangeInputRadio = (element) => {
    if (Number(element.value) === 1) {
      setSelectedForm("Extranjero");
      functions.clearElementValues(elementsNacional, setElementsNacional);
    } else {
      functions.clearElementValues(elementsExtranjero, setElementsExtranjero);
      setSelectedForm("Nacional");
    }
    setElements({ ...elements });
  };

  const getDepartamentos = async () => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsNacional);
    try {
      // let response = await ApiServices.departamentos.listRegisterPublic();
      let response = await ApiServices.departamentosGeo.customGET(
        "consultarDepartamento/"
      );
      newElements.departamento.list = [];
      if (response.error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener los departamentos. Por favor intente más tarde.",
        });
        setOpen(true);
        console.error("response.error en getDepartamentos:", response.error);
        /*  newElements.departamento.list = [
          { id: 1, name: "Jutiapa" },
          { id: 2, name: "Huehuetenango" },
        ]; */
        newElements.departamento.list = [];
        setElementsNacional(newElements);
      } else {
        var datos = response.data;
        Object.keys(datos).forEach((element, key, _array) => {
          if (
            datos[element].id == 23 ||
            datos[element].id == 24 ||
            datos[element].id == 25
          ) {
          } else {
            newElements.departamento.list.push({
              id: datos[element].id,
              name: datos[element].nameShort,
            });
          }
        });
        // console.log(
        //   "newElements.departamento.list:",
        //   newElements.departamento.list
        // );
        functions.orderArray(newElements.departamento.list, "name");
        setElementsNacional(newElements);
      }
    } catch (error) {
      console.error("error:", error);
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener los departamentos. Por favor intente más tarde.",
      });
      setOpen(true);
      /*  newElements.departamento.list = [
          { id: 1, name: "Jutiapa" },
          { id: 2, name: "Huehuetenango" },
        ]; */
      newElements.departamento.list = [];
      setElementsNacional(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  const getMunicipios = async (idDepartamento) => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsNacional);
    try {
      ApiServices.municipiosGeo.searchCriteria.clear();
      ApiServices.municipiosGeo.searchCriteria.setOperator("and");
      ApiServices.municipiosGeo.searchCriteria.addEquals("departamentoId", parseInt(idDepartamento));
      ApiServices.municipiosGeo.setIsPublic(true);
      let response = await ApiServices.municipiosGeo.customGET(
        "consultarMunicipios/"
      );
      if (response.error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener los municipios. Por favor intente más tarde.",
        });
        setOpen(true);
        console.error("response.error en getMunicipios:", response.error);
      } else {
        var datos = response.data;
        // console.log("Datos de municipios:", datos);
        newElements.municipio.list = [];
        Object.keys(datos).forEach((element, key, _array) => {
          // if (
          //   datos[element].id === 23 ||
          //   datos[element].id === 24 ||
          //   datos[element].id === 25
          // ) {
          // } else {
            // }
            newElements.municipio.list.push({
              id: datos[element].id,
              name: datos[element].municipio,
            });
        });
        // console.log("newElements.municipio.list:", newElements.municipio.list);
        functions.orderArray(newElements.municipio.list, "name");
        setElementsNacional(newElements);
      }
    } catch (error) {
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener los municipios. Por favor intente más tarde.",
      });
      setOpen(true);
      /*  newElements.municipio.list = [
        { id: 1, name: "Agua Blanca" },
        { id: 2, name: "Jalpatagua" },
      ]; */
      newElements.municipio.list = [];
      setElementsNacional(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  //Cargamos las comunidades con base en el municipio seleccionado
  const getComunidad = async (idDepartamento, idMunicipio) => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsNacional);
    try {
      ApiServices.comunidadesGeo.searchCriteria.clear();
      ApiServices.comunidadesGeo.searchCriteria.setOperator("and");
      ApiServices.comunidadesGeo.searchCriteria.addEquals(
        "departamentoId",
        parseInt(idDepartamento)
      );
      ApiServices.comunidadesGeo.searchCriteria.addEquals(
        "municipioId",
        parseInt(idMunicipio)
      );
      // ApiServices.comunidades.orderCriteria.clear();
      // ApiServices.comunidades.orderCriteria.addAsc("descripcionComunidad");
      let response = await ApiServices.comunidadesGeo.customGET(
        "consultarComunidades/"
      );
      newElements.comunidad.list = [];

      if (response.error) {
        console.error("response.error en getComunidad():", response.error);
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener las comunidades. Por favor intente más tarde.",
        });
        setOpen(true);
        console.error("response.error:", response.error);

        // setCargandoDatos(false);
      } else {
        let datos = response.data;
        //console.log("datos en getComunidad:", datos);
        Object.keys(datos).forEach((element, key, _array) => {
          newElements.comunidad.list.push({
            id: datos[element].id,
            name: datos[element].name,
            centroVotacionId: datos[element].centroVotacionId,
            // name: datos[element].descripcionComunidad,
          });
        });
        functions.orderArray(newElements.comunidad.list, "id");
        setElementsNacional(newElements);
      }
    } catch (error) {
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener las comunidades. Por favor intente más tarde.",
      });
      setOpen(true);
      /*  newElements.comunidad.list = [
        { id: 1, name: "Aldea El Chorro" },
        { id: 2, name: "Caserío Alaskasitas" },
      ]; */
      newElements.comunidad.list = [];
      //setElements(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  const getCountries = async () => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsExtranjero);
    try {
      let response = await ApiServices.paisesGeo.customGET("consultarPais/");
      if (response.error) {
        console.error("response.error en getCountries():", response.error);
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener los países. Por favor intente más tarde.",
        });
        setOpen(true);
      } else {
        var datos = response.data;
        Object.keys(datos).forEach((element, key, _array) => {
          if (datos[element].id !== 1) {
            newElements.country.list.push({
              id: datos[element].id,
              name: datos[element].nombrePaisCorto,
            });
          }
        });
        functions.orderArray(newElements.country.list, "name");
        setElementsExtranjero(newElements);
      }
    } catch (error) {
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener los países. Por favor intente más tarde.",
      });
      setOpen(true);
      /*  newElements.country.list = [
        { id: 1, name: "USA" },
        { id: 2, name: "Alemania" },
      ]; */
      newElements.country.list = [];
      setElementsExtranjero(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  const getStates = async (idCountry) => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsExtranjero);
    try {
      ApiServices.estadosDePaisesGeo.searchCriteria.clear();
      ApiServices.estadosDePaisesGeo.searchCriteria.setOperator("and");
      ApiServices.estadosDePaisesGeo.searchCriteria.addEquals(
        "paisId",
        parseInt(idCountry)
      );
      ApiServices.estadosDePaisesGeo.setIsPublic(true);
      let response = await ApiServices.estadosDePaisesGeo.customGET(
        "consultarEstadosDePaises/"
      );
      if (response.error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener los estados. Por favor intente más tarde.",
        });
        setOpen(true);
        console.error("response.error:", response.error);
      } else {
        var datos = response.data;
        newElements.countryState.list = [];
        Object.keys(datos).forEach((element, key, _array) => {
          newElements.countryState.list.push({
            id: datos[element].id,
            name: datos[element].nombreDelEstado,
          });
        });

        functions.orderArray(newElements.countryState.list, "name");
        setElementsExtranjero(newElements);
      }
    } catch (error) {
      console.error("error:", error);
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener los estados. Por favor intente más tarde.",
      });
      setOpen(true);
      /* newElements.countryState.list = [
        { id: 1, name: "Ohio" },
        { id: 2, name: "Colorado" },
      ]; */
      newElements.countryState.list = [];
      setElementsExtranjero(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  const getCities = async (idCountry, idState) => {
    props.setloadingStepperSpinner(true);
    let newElements = Object.assign({}, elementsExtranjero);
    try {
      ApiServices.ciudadesDelExtranjeroGeo.searchCriteria.clear();
      ApiServices.ciudadesDelExtranjeroGeo.searchCriteria.setOperator("and");
      ApiServices.ciudadesDelExtranjeroGeo.searchCriteria.addEquals(
        "paisId",
        parseInt(idCountry)
      );
      ApiServices.ciudadesDelExtranjeroGeo.searchCriteria.addEquals(
        "estadoId",
        parseInt(idState)
      );
      let response = await ApiServices.ciudadesDelExtranjeroGeo.customGET(
        "consultarCiudadesDelExtranjero/"
      );

      if (response.error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener las ciudades. Por favor intente más tarde.",
        });
        setOpen(true);
      } else {
        var datos = response.data;
        Object.keys(datos).forEach((element, key, _array) => {
          newElements.city.list.push({
            id: datos[element].id,
            name: datos[element].nombreDeCiudad,
          });
        });

        functions.orderArray(newElements.city.list, "name");
        setElementsExtranjero(newElements);
      }
    } catch (error) {
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener las ciudades. Por favor intente más tarde.",
      });
      setOpen(true);
      /*  newElements.city.list = [
        { id: 1, name: "Chicago" },
        { id: 2, name: "Austin" },
      ]; */
      newElements.city.list = [];
      setElementsExtranjero(newElements);
    }
    props.setloadingStepperSpinner(false);
  };

  const handlerDepartamento = (event) => {
    if (event.target.value != null) {
      getMunicipios(event.target.value);
    }
  };

  const handlerMunicipio = (event) => {
    if (event.target.value != null) {
      // Descomentar si se obtiene comunidad del formulario del usuario.
      // getComunidad(elementsNacional.departamento.value, event.target.value);
    }
  };

  const handlerOcupacion = (event) => { };

  const handlerCountry = (event) => {
    if (event.target.value != null) {
      getStates(event.target.value);
    }
  };

  const handlerState = (event) => {
    if (event.target.value != null) {
      getCities(elementsExtranjero.country.value, Number(event.target.value));
    }
  };

  //cargamos las ocupaciones
  const getOcupaciones = async () => {
    // setCargandoDatos(true);
    let newElements = Object.assign({}, elements);
    try {
      let response = await ApiServices.ocupacionesGeo.customGET(
        "consultarOcupaciones"
      );
      if (response.error) {
        // setCargandoDatos(false);
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Problemas al obtener las ocupaciones. Por favor intente más tarde.",
        });
        setOpen(true);
      } else {
        /* if (
          props.ArrayListado.ArrayOcupaciones.length === 0 ||
          elements.profesion.value != props.data.profesion
        ) {
          var datos = response.data;
          Object.keys(datos).forEach((element, key, _array) => {
            if (datos[element].name !== " ") {
              newElements.profesion.list.push({
                id: datos[element].id,
                name: datos[element].name,
              });
            }
          });
        } else {
          newElements.profesion.list = props.ArrayListado.ArrayOcupaciones;
        } */
        var datos = response.data;
        Object.keys(datos).forEach((element, key, _array) => {
          if (datos[element].name !== " ") {
            /* newElements.profesion.list.push({
              id: datos[element].id,
              name: datos[element].name,
            }); */
            newElements.ocupacion.list.push({
              id: datos[element].id,
              name: datos[element].name,
            });
          }
        });
        setElements(newElements);
      }
    } catch (error) {
      setMensaje({
        tipoError: "error",
        tipoMensaje:
          "Problemas al obtener las ocupaciones. Por favor intente más tarde.",
      });
      setOpen(true);
      newElements.ocupacion.list = [
        { id: 1, name: "Ingeniero" },
        { id: 2, name: "Abogado" },
      ];
      setElements(newElements);
    }
  };

  const elementsNacionalDefault = {
    departamento: {
      idelement: "departamento",
      value: "",
      label: "Departamento *",
      pattern: "",
      // defaultValue: "",
      validators: ["required"],
      errorMessages: ["Departamento requerido"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      handler: handlerDepartamento,
      useStateHook: setDepartamentoValue,
      disabled: false,
      key: 1,
      keys: [1, 2],
      children: ["municipio", "comunidad"],
    },
    municipio: {
      idelement: "municipio",
      value: "",
      label: "Municipio *",
      pattern: "",
      // defaultValue: "",
      validators: ["required"],
      errorMessages: ["Municipio requerido"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      handler: handlerMunicipio,
      useStateHook: setMunicipioValue,
      disabled: false,
      key: 3,
      keys: [3, 4],
      children: ["comunidad"],
    },
    /* comunidad: {
      idelement: "comunidad",
      value: "",
      label: "Comunidad *",
      pattern: "",
      validators: ["required"],
      errorMessages: ["Comunidad requerida"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      //handler: handlerComunidad2,
      useStateHook: setComunidadValue,
      key: 5,
      keys: [5, 6],
    }, */
    direccion: {
      idelement: "direccion",
      value: "",
      label: "Dirección *",
      pattern: "^([\\w_][\\w_ -.\"'Ññ]*[\\w_.\"'Ññ]){1,50}$",
      validators: ["required"],
      errorMessages: ["Sin tildes, ni espacios al inicio y final"],
      isError: false,
      elementType: "input",
      useStateHook: setDireccionValue,
      key: 13,
      keys: [13, 14],
    },
    /* nocasalote: {
      idelement: "nocasalote",
      value: "",
      label: "No. Casa/Lote",
      pattern: "^([\\w_][\\w_ -]*[\\w_]){0,50}$",
      validators: [""],
      errorMessages: ["Sin espacios al inicio y final"],
      isError: false,
      elementType: "input",
      useStateHook: setnoCasaValue,
      key: 15,
      keys: [15, 16],
    },
    zona: {
      idelement: "zona",
      value: "",
      label: "Zona",
      pattern: "^[0-9]*$",
      validators: [""],
      errorMessages: ["Únicamente valores numéricos"],
      isError: false,
      elementType: "input",
      useStateHook: setzonaValue,
      key: 17,
      keys: [17, 18],
    }, */
  };
  const [elementsNacional, setElementsNacional] = React.useState(
    elementsNacionalDefault
  );

  const [elementsExtranjero, setElementsExtranjero] = React.useState({
    country: {
      idelement: "country",
      value: "",
      label: "País *",
      pattern: "",
      validators: ["required"],
      errorMessages: ["País requerido"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      handler: handlerCountry,
      useStateHook: setCountryValue,
      key: 7,
      keys: [7, 8],
      children: ["countryState", "city"],
    },
    countryState: {
      idelement: "countryState",
      value: "",
      label: "Estado *",
      pattern: "",
      validators: ["required"],
      errorMessages: ["Estado requerido"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      handler: handlerState,
      useStateHook: setStateValue,
      key: 9,
      keys: [9, 10],
      children: ["city"],
    },
    city: {
      idelement: "city",
      value: "",
      label: "Ciudad *",
      pattern: "",
      validators: ["required"],
      errorMessages: ["Ciudad requerida"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      // handler: handlerCity,
      useStateHook: setCityValue,
      key: 11,
      keys: [11, 12],
    },
  });
  const [elements, setElements] = useState({
    ocupacion: {
      idelement: "ocupacion",
      value: "",
      label: "Profesión *",
      pattern: "",
      disabled: false,
      validators: ["required"],
      errorMessages: ["Profesión requerida"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      handler: handlerOcupacion,
      useStateHook: setOcupacionValue,
      key: 19,
      keys: [19, 20],
    },
    telefono: {
      idelement: "telefono",
      value: "",
      label: "Teléfono *",
      pattern: "^[0-9]{8,8}$",
      validators: ["required"],
      errorMessages: ["8 caracteres, sin espacios al inicio y final"],
      isError: false,
      elementType: "input",
      useStateHook: setTelefonoValue,
      key: 30,
      keys: [30, 31],
    },
    email: {
      idelement: "email",
      value: "",
      label: "Correo *",
      pattern: "([\\wA-Z0-9._%+-]+@[\\wA-Z0-9.-]+\\.\\w{2,3}){1,50}$",
      validators: ["required"],
      errorMessages: ["Correo requerido, sin espacios al inicio y final"],
      isError: false,
      elementType: "input",
      useStateHook: setEmailValue,
      key: 32,
      keys: [32, 33],
    },
    noVidente: {
      idelement: "noVidente",
      value: "",
      label: "Vista *",
      pattern: "^([0-9][0-9]*){1,1}$",
      disabled: false,
      validators: ["required"],
      errorMessages: ["Vista requerida"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      // handler: handlerOcupacion,
      useStateHook: setNoVidenteValue,
      key: 34,
      keys: [34, 35],
    },    
    alfabetismo: {
      idelement: "alfabetismo",
      value: "",
      label: "Alfabetismo *",
      pattern: "^([0-9][0-9]*){1,1}$",
      disabled: false,
      validators: ["required"],
      errorMessages: ["Alfabetismo requerido"],
      isError: false,
      elementType: "customAutocomplete",
      list: [],
      // handler: handlerOcupacion,
      useStateHook: setAlfabetismoValue,
      key: 34,
      keys: [34, 35],
    },    
  });
  const [elementsRadioButton, setElementsRadioButton] = useState({
    extranjeroONacional: {
      idelement: "extranjeroONacional",
      value: "0",
      label: "Seleccione el territorio en el que se encuentra.",
      isError: false,
      elementType: "radio",
      errorMessages: ["Debe seleccionar una opción"],
      options: [
        { value: "0", label: "Nacional" },
        { value: "1", label: "Extranjero" },
      ],
      disabled: false,
      validateChangeInputRadio: validateChangeInputRadio,
      key: 21,
      keys: [21, 22],
    },
  });

  const enviarSolicitud = async () => {
    props.setloadingStepperSpinner(true);

    if (
      props.dontAllowChange &&
      props.datosCiudadanoTable.departamentoEmpadronamientoId == 25
    ) {
      setMensaje({
        tipoError: "error",
        tipoMensaje: "Actualmente no puede realizar ninguna solicitud.",
      });
      setOpen(true);

      // props.setloadingStepperSpinner(false);
    } else {
      let allGood = true;
      let requestBody = {};

      if (selectedForm === "Nacional") {
        let elementsNacionalHere = Object.assign({}, elementsNacional);
        allGood = functions.checkIsEmptyWhenRequiredElement(
          elementsNacionalHere,
          setElementsNacional
        );

        allGood = functions.checkIsEmptyWhenRequiredElement(
          elements,
          setElements
        );
        if(!props.datosCiudadanoTable.nroBoleta) {
          if(noVidenteValue===1) noVidenteValidacion = 0;
          else noVidenteValidacion = 1;
        }else{
          noVidenteValidacion=noVidenteValue
        }
        requestBody = {
          departamentoResidencia: departamentoValue,
          municipioResidencia: municipioValue,
          // Descomentar si recibimos comunidad del formulario.
          // comunidadResidencia: comunidadValue,
          profesion: ocupacionValue,
          direccion: direccionValue,
          telefono: telefonoValue,
          email: emailValue,
          noVidente: noVidenteValidacion,
          alfabetismo: alfabetismoValue,
        };
        Object.keys(requestBody).forEach((attribute) => {
          if (
            requestBody[attribute] === "" ||
            requestBody[attribute] === null
          ) {
            allGood = false;
          }
        });
        //Comentar si recibimos comunidad del formulario.
        requestBody["comunidadResidencia"] = comunidadValue;
        requestBody["centroVotacion"] = "";
        // Descomentar si recibimos comunidad del formulario.
        /* elementsNacional.comunidad.list.forEach((comunidad) => {
          if (comunidad.id == requestBody.comunidadResidencia) {
            requestBody["centroVotacion"] = comunidad.centroVotacionId;
          }
        }); */

        // Necesito ponerlo vacio porque siempre viene 2 por default gracias
        // a que se setea el 2 cuando se setea el default value EEUU.
        requestBody["paisResidencia"] = "";
        // requestBody["paisResidencia"] = countryValue;
        requestBody["estadoResidencia"] = stateValue;
        requestBody["ciudadResidencia"] = cityValue;
      } else if (selectedForm === "Extranjero") {
        allGood = functions.checkIsEmptyWhenRequiredElement(
          elementsExtranjero,
          setElementsExtranjero
        );

        allGood = functions.checkIsEmptyWhenRequiredElement(
          elements,
          setElements
        );
        if(!props.datosCiudadanoTable.nroBoleta) {
          if(noVidenteValue===1) noVidenteValidacion = 0;
          else noVidenteValidacion = 1;
        }else{
          noVidenteValidacion=noVidenteValue
        }        
        requestBody = {
          paisResidencia: countryValue,
          estadoResidencia: stateValue,
          ciudadResidencia: cityValue,
          profesion: ocupacionValue,
          telefono: telefonoValue,
          email: emailValue,
          noVidente: noVidenteValidacion,
          alfabetismo: alfabetismoValue,          
        };
        Object.keys(requestBody).forEach((attribute) => {
          if (
            requestBody[attribute] === "" ||
            requestBody[attribute] === null
          ) {
            allGood = false;
          }
        });
        requestBody["departamentoResidencia"] = 25;
        requestBody["municipioResidencia"] = 1;
        requestBody["comunidadResidencia"] = comunidadValue;
        requestBody["centroVotacion"] = "";
      }
      // requestBody["noCasaLote"] = noCasaValue;
      // requestBody["numeroZona"] = zonaValue;

      // console.log("requestBody:", requestBody);

      //Comentar o borrar en el flujo oficial.
      // allGood = true;
      if (allGood) {
        // console.log('saveData: ', requestBody);
        try {
          let responseCreate =
            await ApiServices.generarSolicitudDeEmpadronamiento.customPOST(
              "generar",
              requestBody
            );

          if (
            responseCreate.error === null &&
            !(responseCreate.data === null)
          ) {
            props.handleClose();
            functions.clearElementValues(elementsNacional, setElementsNacional);
            functions.clearElementValues(
              elementsExtranjero,
              setElementsExtranjero
            );
            functions.clearElementValues(elements, setElements);
            props.openSuccessMessage();
          } else if (!(responseCreate.error == null)) {
            setOpen(true);
            setMensaje({
              tipoError: "error",
              tipoMensaje: responseCreate.error,
            });
          } else {
            // console.error(
            //   "response.error en enviarSolicitud:",
            //   responseCreate.error
            // );
            setOpen(true);
            setMensaje({
              tipoError: "error",
              tipoMensaje:
                "Error al enviar la solicitud. Por favor intente más tarde.",
            });
          }
        } catch (error) {
          console.error("Error en try/catch en enviarSolicitud:", error);
          setOpen(true);
          setMensaje({
            tipoError: "error",
            tipoMensaje:
              "Error al enviar la solicitud. Por favor intente más tarde.",
          });
        }
      } else {
        props.setloadingStepperSpinner(false);
        setMensaje({
          tipoError: "error",
          tipoMensaje:
            "Debe completar todos los campos obligatorios (*) del formulario.",
        });
        setOpen(true);
      }
    }

    props.setloadingStepperSpinner(false);
  };

  const setGuatemalaAsDefault = async () => {
    let newElementsNacional = Object.assign({}, elementsNacional);
    let indexOfDepartamentoId = 0;
    let departamentoResidenciaId = 0;
    newElementsNacional.departamento.list.forEach(function (value, i) {
      if (value.name == "GUATEMALA") {
        indexOfDepartamentoId = i;
        departamentoResidenciaId = Number(value.id);
      }
    });
    newElementsNacional.departamento.defaultValue = indexOfDepartamentoId;
    newElementsNacional.departamento.value = departamentoResidenciaId;
    newElementsNacional.departamento.useStateHook(departamentoResidenciaId);
    newElementsNacional = functions.switchKeysInElements(newElementsNacional);
    setElementsNacional({ ...newElementsNacional });
    await getMunicipios(departamentoResidenciaId);
  };

  const setUsaAsDefault = async () => {
    let indexOfCountryId = 0;
    let paisEmpadronamientoId = 2;
    let newElementsExtranjero = Object.assign({}, elementsExtranjero);
    newElementsExtranjero.country.list.forEach(function (value, i) {
      if (value.id == paisEmpadronamientoId) {
        indexOfCountryId = i;
      }
    });
    newElementsExtranjero.country.defaultValue = indexOfCountryId;
    newElementsExtranjero.country.value = paisEmpadronamientoId;
    newElementsExtranjero.country.useStateHook(paisEmpadronamientoId);
    newElementsExtranjero = functions.switchKeysInElements(
      newElementsExtranjero
    );
    setElementsExtranjero({ ...newElementsExtranjero });
    await getStates(paisEmpadronamientoId);
  };

  const checkDontAllowChange = async () => {
    if (
      (props.datosCiudadanoTable.fechaUltimaDirección !== null) &
      (props.datosCiudadanoTable.fechaUltimaDirección !== "")
    ) {
      let wasLongerThanSixMonthsFromNow = true;
      wasLongerThanSixMonthsFromNow = functions.checkLongerThanSixMonthsFromNow(
        props.datosCiudadanoTable.fechaUltimaDirección
      );
      if (wasLongerThanSixMonthsFromNow) {
        props.SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE(false);
        setGuatemalaAsDefault();
        setUsaAsDefault();
      } else {
        //Poner true cuando se vaya a tirar a dev.
        props.SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE(true);
        if (props.datosCiudadanoTable.departamentoEmpadronamientoId !== 25) {
          setArticulo5Text(
            `El artículo 5 del Reglamento de la Ley Electoral y de Partidos Políticos establece que, de acuerdo con la ` +
            `fecha de su última actualización de datos, no es posible procesar una solicitud` +
            ` de actualización de residencia electoral para una ubicación fuera de su municipio,` +
            ` por lo que debe esperar a que se cumpla el plazo establecido de seis meses desde la` +
            ` última actualización para cambiar de munipio, departamento, o hacia una dirección fuera de territorio nacional.`
          );
          let departamentoResidenciaId =
            props.datosCiudadanoTable.departamentoEmpadronamientoId;
          let municipioResidenciaId =
            props.datosCiudadanoTable.municipioEmpadronamientoId;

          let newElementsRadioButton = Object.assign({}, elementsRadioButton);
          let newElementsNacional = Object.assign({}, elementsNacional);
          if (newElementsNacional.departamento.list.length === 0) {
            await getDepartamentos();
          }
          let indexOfDepartamentoId = 0;
          newElementsNacional.departamento.list.forEach(function (value, i) {
            if (value.id == departamentoResidenciaId) {
              indexOfDepartamentoId = i;
            }
          });
          newElementsNacional.departamento.disabled = true;
          newElementsNacional.departamento.defaultValue = indexOfDepartamentoId;
          newElementsNacional.departamento.value = departamentoResidenciaId;
          newElementsNacional.departamento.useStateHook(
            departamentoResidenciaId
          );
          await getMunicipios(departamentoResidenciaId);
          let indexOfMunicipioId = 0;
          newElementsNacional.municipio.list.forEach(function (value, i) {
            if (value.id == municipioResidenciaId) {
              indexOfMunicipioId = i;
            }
          });
          newElementsNacional.municipio.disabled = true;
          newElementsNacional.municipio.defaultValue = indexOfMunicipioId;
          newElementsNacional.municipio.value = municipioResidenciaId;
          newElementsNacional.municipio.useStateHook(municipioResidenciaId);

          newElementsRadioButton.extranjeroONacional.disabled = true;
          newElementsNacional =
            functions.switchKeysInElements(newElementsNacional);
          setElementsNacional({ ...newElementsNacional });
          setElementsRadioButton({ ...newElementsRadioButton });
        } else {
          //Lógica de cuando está empadronado en el extranjero.
          setArticulo5Text(
            `El artículo 5 del Reglamento de la Ley Electoral y de Partidos Políticos establece que, de acuerdo con la ` +
            `fecha de su última actualización de datos, no es posible procesar una solicitud` +
            ` de actualización de residencia electoral,` +
            ` por lo que debe esperar a que se cumpla el plazo establecido de seis meses desde la` +
            ` última actualización para realizar su solicitud.`
          );
          let paisEmpadronamientoId =
            props.datosCiudadanoTable.paisEmpadronamientoId;
          let estadoEmpadronamientoId =
            props.datosCiudadanoTable.estadoEmpadronamientoId;
          let ciudadEmpadronamientoId =
            props.datosCiudadanoTable.ciudadEmpadronamientoId;

          let newElementsRadioButton = Object.assign({}, elementsRadioButton);
          let newElementsExtranjero = Object.assign({}, elementsExtranjero);
          let newElements = Object.assign({}, elements);

          if (newElementsExtranjero.country.list.length === 0) {
            await getCountries();
          }
          let indexOfCountryId = 0;
          newElementsExtranjero.country.list.forEach(function (value, i) {
            if (value.id == paisEmpadronamientoId) {
              indexOfCountryId = i;
            }
          });
          newElementsExtranjero.country.disabled = true;
          newElementsExtranjero.country.defaultValue = indexOfCountryId;
          newElementsExtranjero.country.value = paisEmpadronamientoId;
          newElementsExtranjero.country.useStateHook(paisEmpadronamientoId);

          await getStates(paisEmpadronamientoId);
          let indexOfStateId = 0;
          newElementsExtranjero.countryState.list.forEach(function (value, i) {
            if (value.id == estadoEmpadronamientoId) {
              indexOfStateId = i;
            }
          });
          newElementsExtranjero.countryState.disabled = true;
          newElementsExtranjero.countryState.defaultValue = indexOfStateId;
          newElementsExtranjero.countryState.value = estadoEmpadronamientoId;
          newElementsExtranjero.countryState.useStateHook(
            estadoEmpadronamientoId
          );

          await getCities(paisEmpadronamientoId, estadoEmpadronamientoId);
          let indexOfCityId = 0;
          newElementsExtranjero.city.list.forEach(function (value, i) {
            if (value.id == ciudadEmpadronamientoId) {
              indexOfCityId = i;
            }
          });
          newElementsExtranjero.city.disabled = true;
          newElementsExtranjero.city.defaultValue = indexOfCityId;
          newElementsExtranjero.city.value = ciudadEmpadronamientoId;
          newElementsExtranjero.city.useStateHook(ciudadEmpadronamientoId);

          newElementsRadioButton.extranjeroONacional.disabled = true;
          newElementsRadioButton.extranjeroONacional.value = 1;

          newElements.ocupacion.disabled = true;

          newElementsExtranjero = functions.switchKeysInElements(
            newElementsExtranjero
          );
          newElementsRadioButton = functions.switchKeysInElements(
            newElementsRadioButton
          );
          setElementsExtranjero({ ...newElementsExtranjero });
          setElements({ ...newElements });
          setElementsRadioButton({ ...newElementsRadioButton });
          setSelectedForm("Extranjero");
        }
      }
    } else {
      props.SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE(false);
      setGuatemalaAsDefault();
      setUsaAsDefault();
    }
  };

  const frontStep = () => {
    props.SOLICITUD_EMPADRONAMIENTO_SET_STEP(1);
  };

  const cancel = () => {
    // if (!props.dontAllowChange) {
    functions.clearElementValues(elementsNacional, setElementsNacional);
    // }
    functions.clearElementValues(elementsExtranjero, setElementsExtranjero);
    functions.clearElementValues(elements, setElements);
    props.handleClose();
  };
  useEffect(() => {
    getOcupaciones();
    getDepartamentos();
    getCountries();
  }, []);
  useEffect(() => {
    if (props.open === true) {
      checkDontAllowChange();
      elements.noVidente.list = ((props.datosCiudadanoTable.nroBoleta) ? ArrayNoVidentePadron : ArrayNoVidenteRenap);
      // elements.noVidente.value = ((props.datosCiudadanoTable.genero) ? props.datosCiudadanoTable.genero : '')
      elements.alfabetismo.list = ArrayAlfabetismo;
      // elements.alfabetismo.value = ((props.datosCiudadanoTable.genero) ? props.datosCiudadanoTable.genero : '')
      // console.log('props.datosCiudadanoTable: ', props.datosCiudadanoTable)
    }
  }, [props.open]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.colorComponente}>
          <Grid>
            <Grid className={classes.marginText} item xs={12}>
              <DatosCiudadano />
            </Grid>
          </Grid>
          <br />
          <div className={classes.lineaDegradadaBottom}></div>
        </div>
        <br />
        <Container className={classes.colorComponente}>
          <Grid container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.formTitle}
            >
              <Typography component="span" variant="body1" color="textPrimary">
                <strong>Datos de Residencia Electoral </strong>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.formTitle}
            >
              <p className={classes.description}>
                Su dirección puede registrarse en el territorio nacional o en el
                extranjero, para lo cual deberá completar los datos que se
                presentan a continuación.
              </p>
            </Grid>

            <Grid className={classes.AlignTable} item xs={12}>
              <Form
                elements={elementsRadioButton}
                apiErrors={apiErrors}
                validateChangeInputRadio={validateChangeInputRadio}
              />
            </Grid>
            <Grid className={classes.comboboxGrid} item xs={12}>
              {selectedForm === "Nacional" ? (
                <React.Fragment>
                  <Form
                    key={selectedForm}
                    elements={elementsNacional}
                    apiErrors={apiErrors}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Form
                    key={selectedForm}
                    elements={elementsExtranjero}
                    apiErrors={apiErrors}
                  />
                </React.Fragment>
              )}
            </Grid>
            <Grid className={classes.formSecondRow} item xs={12}>
              <Form elements={elements} apiErrors={apiErrors} />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.sixMonthReminderGridItem}
            >
              {props.dontAllowChange ? (
                <p className={classes.cantAllowChangeErrorMessage}>
                  {articulo5Text}
                </p>
              ) : (
                <p className={classes.sixMonthReminder}>
                  Recuerde que la dirección consignada no podrá ser modificada
                  en un plazo de 6 meses, de acuerdo con lo regulado por el
                  artículo 5 del Reglamento de la Ley Electoral y de Partidos
                  Políticos. Debe estar seguro de la información registrada en
                  este formulario para facilitar la emisión de su voto en la
                  localidad más cercana a su residencia para el próximo evento
                  electoral.
                </p>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <div className={classes.wrapper}>
                <Button onClick={cancel} color="secondary" variant="contained">
                  <Icon className={classes.icon}> cancel </Icon> Cancelar
                </Button>
              </div>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  onClick={enviarSolicitud}
                  //onClick={frontStep}
                  color="primary"
                  disabled={false}
                  className={buttonClassname}
                  endIcon={<Send />}
                >
                  Enviar Solicitud
                </Button>
              </div>
            </Grid>
          </Grid>
          <br />
          <div className={classes.lineaDegradadaBottom}></div>
        </Container>
        <br />
      </div>
      <ResponseElement
        type={mensaje.tipoError}
        content={mensaje.tipoMensaje}
        open={open}
        handClose={handClose}
      />
    </React.Fragment>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatosCiudadanoRENAP);
