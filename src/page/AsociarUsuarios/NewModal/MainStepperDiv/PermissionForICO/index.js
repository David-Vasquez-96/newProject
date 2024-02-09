import React, { useRef, useState, state, useEffect } from "react";
import { useStyles } from "./style";
import {
  Grid,
  CssBaseline,
  Paper,
  Typography,
  Switch,
} from "@material-ui/core";
import Form from "component/Form/FormTwoColumns";
import { connect } from "react-redux";
import { functions } from "constant/index";
import ApiServices from "service/ApiServices";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import Alert from "react-s-alert";
import "./styles.css";
import ResponseElement from "component/MensajeElement";

const UploadDocs = (props) => {
  const classes = useStyles(),
    [open, setOpen] = React.useState(false),
    [mensaje, setMensaje] = React.useState({
      tipoError: "success",
      tipoMensaje: "",
    }),
    [tipoPermisoValue, setTipoPermisoValue] = React.useState(""),
    handlerTipoPermiso = (event, self) => {
      let newArray = tipoPermiso.tipoPermiso_id.list.filter(function (element) {
        return element.id === event.target.value;
      });
      setTipoPermisoValue(newArray[0].name);
      props.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO(newArray[0].name);

      if (newArray[0].name === "Nacional") {
        cleanMunicipio();
        cleanDepartamento();
      }
      if (newArray[0].name === "Departamental") {
        cleanMunicipio();
      }
      if (
        newArray[0].name != "Nacional" &&
        departamento.departamento_id.list.length === 0
      ) {
        getDepartamentos();
      }
      if (
        newArray[0].name === "Municipal" &&
        departamento.departamento_id.value != ""
      ) {
        getMunicipios(departamento.departamento_id.value);
      }
    },
    handlerDepartamento = (event, self) => {
      let newArray = departamento.departamento_id.list.filter(function (
        element
      ) {
        return element.id === event.target.value;
      });

      props.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO(newArray[0].name);
      if (tipoPermiso.tipoPermiso_id.value == 3) {
        cleanMunicipio();
        getMunicipios(newArray[0].id);
      }
    },
    handlerMunicipio = (event, self) => {
      let newArray = municipio.municipio_id.list.filter(function (element) {
        return element.id === event.target.value;
      });
      props.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO(newArray[0].name);
    },
    getDepartamentos = async () => {
      let newDepartamento = Object.assign({}, departamento);
      try {
        let response = await ApiServices.departamentos.listRegisterPublic();
        if (response.error) {
          Alert.error("Problemas al obtener los departamentos");
        } else {
          var datos = response.data;
          //console.log("datos:", datos);
          Object.keys(datos).forEach((element, key, _array) => {
            if (
              datos[element].id === 23 ||
              datos[element].id === 24 ||
              datos[element].id === 25
            ) {
            } else {
              newDepartamento.departamento_id.list.push({
                id: datos[element].id,
                name: datos[element].name,
              });
            }
          });
          functions.orderArray(newDepartamento.departamento_id.list, "name");
        }
      } catch (error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje: error,
        });
        setOpen(true);
      }
      setDepartamento(newDepartamento);
    },
    getMunicipios = async (idDepartamento) => {
      let newMunicipio = Object.assign({}, municipio);
      newMunicipio.municipio_id.list = [];
      try {
        ApiServices.municipios.searchCriteria.clear();
        ApiServices.municipios.searchCriteria.setOperator("and");
        ApiServices.municipios.searchCriteria.addEquals(
          "id.departamentoId",
          parseInt(idDepartamento)
        );
        ApiServices.municipios.setIsPublic(true);
        let response = await ApiServices.municipios.listRegisterCriteria();
        if (response.error) {
          Alert.error("Problemas al obtener los municipios");
        } else {
          var datos = response.data;
          //console.log("Municipios:", datos);

          Object.keys(datos).forEach((element, key, _array) => {
            if (
              datos[element].id === 23 ||
              datos[element].id === 24 ||
              datos[element].id === 25
            ) {
            } else {
              newMunicipio.municipio_id.list.push({
                id: datos[element].id.id,
                name: datos[element].name,
              });
            }
          });
          // newMunicipio.city_id.list=response.data;
          functions.orderArray(newMunicipio.municipio_id.list, "name");
        }
      } catch (error) {
        setMensaje({
          tipoError: "error",
          tipoMensaje: error,
        });
        setOpen(true);
      }
      setMunicipio(newMunicipio);
    },
    cleanMunicipio = () => {
      //console.log("cleanMunicipio()")
      props.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO("");
      let newMunicipio = Object.assign({}, municipio);
      newMunicipio.municipio_id.value = "";
      setMunicipio(newMunicipio);
    },
    cleanDepartamento = () => {
      props.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO("");
      let newDepartamento = Object.assign({}, departamento);
      newDepartamento.departamento_id.value = "";
      setDepartamento(newDepartamento);
    },
    cleanTipoPermisoICO = () => {
      props.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO("");
      let newTipoPermiso = Object.assign({}, tipoPermiso);
      newTipoPermiso.tipoPermiso_id.value = "";
      setTipoPermiso(newTipoPermiso);
    },
    [tipoPermiso, setTipoPermiso] = React.useState({
      tipoPermiso_id: {
        idelement: "tipoPermiso_id",
        value: "",
        label: "Tipo de Permiso",
        pattern: "^[1-9][0-9]*$",
        validators: ["required"],
        errorMessages: ["Un elemento del listado"],
        isError: false,
        elementType: "customDropdown",
        list: [
          { id: "1", name: "Nacional" },
          { id: "2", name: "Departamental" },
          { id: "3", name: "Municipal" },
        ],
        handler: handlerTipoPermiso,
      },
    }),
    [departamento, setDepartamento] = React.useState({
      departamento_id: {
        idelement: "departamento_id",
        value: "",
        label: "Departamento",
        pattern: "^[1-9][0-9]*$",
        validators: ["required"],
        errorMessages: ["Un elemento del listado"],
        isError: false,
        elementType: "customDropdown",
        list: [],
        handler: handlerDepartamento,
      },
    }),
    [municipio, setMunicipio] = React.useState({
      municipio_id: {
        idelement: "municipio_id",
        value: "",
        label: "Municipio",
        pattern: "^[1-9][0-9]*$",
        validators: ["required"],
        errorMessages: ["Un elemento del listado"],
        isError: false,
        elementType: "customDropdown",
        list: [],
        handler: handlerMunicipio,
      },
    });
  const [switchState, setSwitchState] = React.useState({
    checkedICO: false,
  });

  /*   useEffect(() => {
    console.log("permissionForICO");
    }, []); */

  const handClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChangeICOSwitch = (event) => {
    setSwitchState({ ...state, [event.target.name]: event.target.checked });
    props.ASOCIAR_USUARIOS_SET_PERMISO_ICO(event.target.checked);
    if (event.target.checked === false) {
      cleanTipoPermisoICO();
      cleanDepartamento();
      cleanMunicipio();
    }
  };

  const uploadImage = async (event, data) => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm container>
            <Grid item xs>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Portal Web de Inscripción de Candidatos de Organizaciones
                  Políticas
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Switch
              checked={switchState.checkedICO}
              onChange={handleChangeICOSwitch}
              color="primary"
              name="checkedICO"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Grid>
        </Grid>
        {switchState.checkedICO ? (
          <Grid className={classes.comboBox} container spacing={2}>
            <Grid item xs={3}>
              <Form
                elements={tipoPermiso}
                apiErrors={""}
                hideInPrintView={true}
              />
            </Grid>
            {tipoPermisoValue === "Departamental" ||
            tipoPermisoValue === "Municipal" ? (
              <React.Fragment>
                <Grid item xs={3}>
                  <Form
                    elements={departamento}
                    apiErrors={""}
                    hideInPrintView={true}
                  />
                </Grid>

                {tipoPermisoValue === "Municipal" ? (
                  <React.Fragment>
                    {" "}
                    <Grid item xs={3}>
                      <Form
                        elements={municipio}
                        apiErrors={""}
                        hideInPrintView={true}
                      />
                    </Grid>{" "}
                  </React.Fragment>
                ) : (
                  <React.Fragment> </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </Grid>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Paper>
      <ResponseElement
        type={mensaje.tipoError}
        content={mensaje.tipoMensaje}
        open={open}
        handClose={handClose}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocs);
