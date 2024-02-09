import React, { Component, Fragment } from "react";
import ApiServices from "service/ApiServices";
import LoadingIndicator from "common/CircularProgressMessage";
import NotAuthorized from "common/NotAuthorized";
//No me gusta el título con el ícono todo grande.
//import Title from "component/TitleWithIcon";
import useStyles from "./style";
import Title from "component/Title";
import Table from "component/Table";
import LoadingSpinner from "component/LoadingSpinner";
import Alert from "react-s-alert";
import { functions } from "constant/index";
import ListElement from "./ListElement";
import StatusDescription from "page/Empadronamiento/StatusDescription";
import SuccessMessage from "page/Empadronamiento/SuccessMessage";

import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import {
  Icon,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core/";
import { Refresh, Add, Check } from "@material-ui/icons";
import PeopleIcon from "@material-ui/icons/People";
import Footer from "page/Home/Footer2";
import Media from "react-media";
import NewModal from "./NewModal";
import ModalObservation from "component/ModalObservation";
import DatosCiudadano from "./NewModal/MainStepperDiv/DatosCiudadanoRENAP/DatosCiudadano";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  marginText: {
    paddingLeft: "10px",
    display: "contents",
  },
  colorComponente: {
    backgroundColor: "white",
    alignItems: "center",
    flexFlow: "row-wrap",
    border: "1px solid  #cccccc ",
    borderRadius: "20px",
    position: "relative",
    width: "100%",
    overflow: "auto",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  lineaDegradadaBottom: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 4,
    background: `linear-gradient(344deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
  },
  table: {
    marginBottom: "50px",
  },
  tableDiv: {
    marginBottom: "1%",
  },
  tableDivLarge: {
    marginBottom: "5%",
    backgroundColor: "#FFFFFF",
    border: "1px solid  #cccccc ",
    borderRadius: "20px",
    overflow: "hidden",
    "@media (max-width:1150px)": {
      marginBottom: "10%",
    },
    "@media (max-width:460px)": {
      // mobile
      marginBottom: "18%",
    },
  },
  mobileTitle: {
    paddingLeft: "13px",
    paddingRight: "13px",
  },
});

class Empadronamiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      controller: "solicitudesEmpadronamiento",
      loading: false,
      authorized: true,
      checkAutorization: false,
      create: false,
      update: false,
      delete: false,
      override: `position: fixed;
      display: block;
      margin: 0 auto;
      top: 40%;
      left: 45%;
      z-index: 1;`,
      tableOptions: {
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        toolbar: true,
        paging: true,
        actionsColumnIndex: -1,
      },
      rowData: [],
      data: [],
      datosCiudadanoTableDefault: props.datosCiudadanoTableDefault,
      containsCurrentRequest: false,
      successMessageOpen: false,
      secondTitleDescription: (
        <span>
          A continuación puede visualizar las solicitudes de empadronamiento o
          actualización de datos realizadas desde la implementación del Portal
          Web en enero del 2021.
          <br />
          Puede hacer clic en "Crear Solicitud" para hacer una nueva solicitud
          de empadronamiento o actualización de residencia electoral.
        </span>
      ),
      customActions: [],
      openObservation: false,
      ASOCIAR_USUARIOS_SET_STEP: props.ASOCIAR_USUARIOS_SET_STEP,
      SOLICITUD_EMPADRONAMIENTO_SET_STEP:
        props.SOLICITUD_EMPADRONAMIENTO_SET_STEP,
      SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE:
        props.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE,
      SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES:
        props.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES,
      dataUsuarioPorAsociarVacia: props.dataUsuarioPorAsociarVacia,
      header: [
        {
          title: "No. de Solicitud",
          field: "idSolicitud",
          cellStyle: { width: "100px" },
        },
        {
          title: "Fecha de solicitud",
          field: "fechaSolicitud",

          render: (rowData) => (
            <React.Fragment>
              {rowData.fechaCreacion
                ? this.splitDate(rowData.fechaCreacion)
                : ""}
            </React.Fragment>
          ),
        },
        {
          title: "Fecha de resolución",
          field: "fechaResolucion",
          render: (rowData) => (
            <React.Fragment>
              {rowData.fechaResolucion
                ? this.splitDate(rowData.fechaResolucion)
                : ""}
            </React.Fragment>
          ),
        },
        {
          title: "Estado de la Solicitud",
          field: "estado", //,cellStyle:{ width: '100px' },
          render: (rowData) => (
            <div style={{ minWidth: "200px" }}>
              {rowData.status === 1 ? (
                <div>
                  <Check style={{ color: "#008104" }} />
                  Solicitud aceptada
                </div>
              ) : rowData.status === 2 ? (
                <div>
                  <Icon style={{ color: "#FA0000" }}>close</Icon> Solicitud
                  rechazada
                </div>
              ) : (
                <div>
                  <Icon style={{ color: "#57C48F" }}>timer</Icon> Solicitud en
                  proceso
                </div>
              )}
            </div>
          ),
        },
        /* {
           title: "Observación",
           field: "observacion",
           render: (rowData) => <p>{rowData.observacion}</p>,
         }, */
        {
          title: "Motivo de Rechazo",
          field: "Motivo de Rechazo",
          render: (rowData) => (
            <div>
              {rowData.status === 2 ? (
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    this.abrirObservacion();
                    this.setObservacion(
                      rowData.mensajeRechazo,
                      "Motivo de Rechazo de la Solicitud"
                    );
                  }}
                >
                  <img
                    alt="comments"
                    style={{ height: 40, width: 40 }}
                    src="/assets/comments.svg"
                  />
                </IconButton>
              ) : (
                ""
              )}
            </div>
          ),
        },
        {
          title: "Archivo",
          field: "archivo", //,cellStyle:{ width: '100px' },
          render: (rowData) => (
            <div style={{ minWidth: "200px" }}>
              {rowData.status === 1 ? (
                <Tooltip title="Constancia de Empadronamiento">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={async () => {
                      this.downloadConstanciaEmpadronamiento(rowData.cve);
                    }}
                  >
                    <img
                      style={{ height: 40, width: 40 }}
                      src="/assets/AutorizacionDeAlta.svg"
                      alt="AutorizacionDeAlta.svg"
                    />
                    {/* <Icon>get_app</Icon> */}
                  </IconButton>
                </Tooltip>
              ) : (
                <React.Fragment />
              )}
              {rowData.status === 1 || rowData.status === 2 ? (
                <React.Fragment>
                  {/* Las otras constancias. No borrar por si las piden mostrar. */}

                  {/* <Tooltip title="Solicitud de Empadronamiento">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={async () => {
                        let response =
                          await ApiServices.empadronamiento.customGET(
                            "solicitud/" + rowData.cve
                          );
                        if (response.error != null)
                          Alert.error("Intente de nuevo");
                        else
                          functions.downloadPDFFromStringBase64(
                            response.data.base64,
                            "SolicitudDeEmpadronamiento" +
                              response.data.cui +
                              "_" +
                              this.splitDate(response.data.fecha)
                          );
                      }}
                    >
                      <img
                        style={{ height: 40, width: 40 }}
                        src="/assets/SolicitudDeAlta.svg"
                        alt="SolicitudDeAlta.svg"
                      />
                    </IconButton>
                  </Tooltip> */}
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </div>
          ),
        },
      ],
      currentUser: props.currentUser,
    };
    this.addRegister = this.addRegister.bind(this);
    this.showList = this.showList.bind(this);
    this.splitDate = this.splitDate.bind(this);
    this.getInfoEmpadronamiento = this.getInfoEmpadronamiento.bind(this);
  }
  splitDate = (date) => {
    if (date !== undefined) {
      var arr1 = date.split("-");
      var arr2 = arr1[2].split("T");
      var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
      return finalDate;
    }
  };
  async addRegister() {
    await this.showList();
    // Descomentar para que no deje abrir el modal cuando ya hay una solicitud en proceso al menos.
    if (this.state.containsCurrentRequest === false) {
      this.setState({ loading: true });
      //QUERY THAT GETS RENAP INFORMATION OF USER.
      this.setState({ create: true });
      this.setState({ loading: false });
    } else {
      Alert.error(
        "Ya existe una solicitud en proceso. Espere a que sea resuelta."
      );
    }
  }

  async showList() {
    try {
      this.setState({ loading: true });
      const hasPermission = await ApiServices.userSecurity.hasPermission(
        this.state.controller,
        "list"
      );

      if (hasPermission.error) {
        this.setState({
          checkAutorization: false,
          authorized: false,
          loading: false,
        });
      } else {
        let response =
          await ApiServices.solicitudesDeEmpadronamientoGeo.customGET(
            "consultarSolicitudes"
          );
        let data = [];
        // console.log("response en showList():", response);
        if (response.error !== null) {
          this.state.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES([]);
          Alert.error(
            "Error obteniendo los registros. Por favor intente más tarde."
          );
        } else if (response.data !== "") {
        }
        let newSolicitudesArray = [];
        if (response.data) {
          response.data.forEach((solicitud) => {
            if (solicitud.status === null) {
              solicitud.status = 0;
            }
            let newSolicitud = {
              idSolicitud: solicitud.idSolicitud,
              fechaCreacion: solicitud.fechaCreacion,
              fechaResolucion: solicitud.datosSolicitudEmpadronamiento.fechaMod,
              status: solicitud.datosSolicitudEmpadronamiento.statusSolicitud,
              cve: solicitud.datosSolicitudEmpadronamiento.cveSolicitud,
              mensajeRechazo:
                solicitud.datosSolicitudEmpadronamiento.observaciones,
            };
            newSolicitudesArray.push(newSolicitud);
          });
        }

        //Adding one rejected request to showcase UI.
        // newSolicitudesArray.push({
        //   idSolicitud: 900,
        //   fechaCreacion: "2021-07-19T06:00:00.000+0000",
        //   fechaResolucion: "2021-07-21T06:00:00.000+0000",
        //   status: 2,
        //   cve: "ASDFGH123",
        //   mensajeRechazo:
        //     "Se encuentra empadronado. Debe acercarse a las oficinas de delegaciones o sub-delegaciones para su debida actualización.",
        // });

        functions.orderArrayDescent(newSolicitudesArray, "idSolicitud");
        // console.log("newSolicitudesArray:", newSolicitudesArray);
        data = newSolicitudesArray;
        this.state.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES(
          newSolicitudesArray
        );
        let dataContainsStatus1 = false;
        data.forEach((element) => {
          if (element.status === 0) {
            dataContainsStatus1 = true;
          }
        });
        if (dataContainsStatus1 === true) {
          this.setState({ containsCurrentRequest: true });
        } else {
          this.setState({ containsCurrentRequest: false });
        }
        this.setState({
          checkAutorization: false,
          authorized: true,
          loading: false,
          data: data,
          create: false,
        });
      }
    } catch (exception) {
      console.error(exception);
      // Seteamos la variable data cuando queremos al menos un campo dummy para visualización.
      let data = [
        {
          idSolicitud: 1,
          fechaCreacion: "2021-05-14T06:00:00.000+0000",
          fechaResolucion: "2021-06-03T06:00:00.000+0000",
          status: 2,
          cve: "ASDFGH123",
          mensajeRechazo:
            "Se encuentra empadronado. Debe acercarse a las oficinas de delegaciones o sub-delegaciones para su debida actualización.",
        },
      ];
      // this.state.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES(data);
      this.state.SOLICITUD_EMPADRONAMIENTO_SET_SOLICITUDES([]);
      // this.setState({
      //   data: data,
      // });
      this.setState({
        data: [],
      });
      exception.status === 404
        ? Alert.warning("Intente de nuevo")
        : Alert.warning("Intente de nuevo");
      this.setState({ loading: false, checkAutorization: false });
    }
    // this.setState({ loading: false, checkAutorization: false });
  }

  async getInfoEmpadronamiento() {
    try {
      // this.setState({ loading: true });
      this.state.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE(
        this.state.datosCiudadanoTableDefault
      );
      let response =
        await ApiServices.consultarRegistrosDeEmpadramientoYRenap.customGET(
          "consultarRegistros"
        );

      let data = [];
      if (response.error !== null) {
        console.error("error en getInfoEmpadronamiento:", response.error);
        Alert.error(
          "Error obteniendo los registros. Por favor intente más tarde."
        );
        this.state.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE(
          this.state.datosCiudadanoTableDefault
        );
      } else if (response.data !== "") {
        data = response.data;
        // console.log("data en getInfoEmpadronamiento:", data);
        let newDatosCiudadanoTable = {
          cui: "",
          fechaEmisionDpi: "",
          serieDpi: "",
          fechaNacimiento: "",
          departamentoNacimiento: {
            id: "",
            name: "",
          },
          municipioNacimiento: {
            id: { id: "", departamentoId: "" },
            name: "",
          },
          genero: "",
          primerNombre: "",
          segundoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          tercerApellido: "",
          apellidoCasada: "",
          direccionElectoral: "",
          nroCasaElectoral: "",
          nroZonaElectoral: "",
          nroBoleta: "",
          telefono: "",
          email: "",
          descripcionOcupacion: "",
          descripcionOcupacionId: "",
          fechaUltimaDirección: "",
          departamentoEmpadronamientoId: "",
          departamentoEmpadronamientoName: "",
          municipioEmpadronamientoId: "",
          municipioEmpadronamientoName: "",
          paisEmpadronamientoId: "",
          estadoEmpadronamientoId: "",
          ciudadEmpadronamientoId: "",
        };
        if (data.cui !== null) {
          newDatosCiudadanoTable.cui = data.cui;
        }
        if (data.fechaEmisionDpi !== null) {
          newDatosCiudadanoTable.fechaEmisionDpi = data.fechaEmisionDpi;
        }
        if (data.serieDpi !== null) {
          newDatosCiudadanoTable.serieDpi = data.serieDpi;
        }
        if (data.genero !== null) {
          newDatosCiudadanoTable.genero = Number(data.genero);
        }
        if (data.fechaNacimiento !== null) {
          newDatosCiudadanoTable.fechaNacimiento = data.fechaNacimiento;
        }
        if (data.fechaNacimiento !== null) {
          newDatosCiudadanoTable.fechaNacimiento = data.fechaNacimiento;
        }
        if (data.departamentoNacimientoRenap !== null) {
          newDatosCiudadanoTable.departamentoNacimiento =
            data.departamentoNacimientoRenap;
        }
        if (data.municipioNacimientoRenap !== null) {
          newDatosCiudadanoTable.municipioNacimiento =
            data.municipioNacimientoRenap;
        }
        if (data.primerNombre !== null) {
          newDatosCiudadanoTable.primerNombre = data.primerNombre;
        }
        if (data.segundoNombre !== null) {
          newDatosCiudadanoTable.segundoNombre = data.segundoNombre;
        }
        if (data.primerApellido !== null) {
          newDatosCiudadanoTable.primerApellido = data.primerApellido;
        }
        if (data.segundoApellido !== null) {
          newDatosCiudadanoTable.segundoApellido = data.segundoApellido;
        }
        if (data.tercerApellido !== null && data.tercerApellido !== undefined) {
          newDatosCiudadanoTable.tercerApellido = data.tercerApellido;
        }
        if (data.apellidoCasada !== null && data.apellidoCasada !== undefined) {
          newDatosCiudadanoTable.apellidoCasada = data.apellidoCasada;
        }

        // Cuando el departamentoResidencia es 25, el usuario tiene registro de status 17,
        // incluido en el padron del extranjero, pero el objeto datosresidenciaEnELExtranjero viene null,
        // ignoraré dirección y cualquier otra cosa, y pondré "RESIDENTE EN EL EXTRANJERO, COMPLETAR INFORMACIÓN."
        if (data.departamentoResidencia) {
          if (data.departamentoResidencia.id == 25) {
            if (data.datosresidenciaEnELExtranjero !== null) {
              if (data.datosresidenciaEnELExtranjero.pais.nombrePaisCorto) {
                newDatosCiudadanoTable.direccionElectoral =
                  data.datosresidenciaEnELExtranjero.pais.nombrePaisCorto;
              }
              if (data.datosresidenciaEnELExtranjero.estado.nombreDelEstado) {
                newDatosCiudadanoTable.direccionElectoral +=
                  ", " +
                  data.datosresidenciaEnELExtranjero.estado.nombreDelEstado;
              }
              if (data.datosresidenciaEnELExtranjero.ciudad.nombreDeCiudad) {
                newDatosCiudadanoTable.direccionElectoral +=
                  ", " +
                  data.datosresidenciaEnELExtranjero.ciudad.nombreDeCiudad;
              }
            } else {
              newDatosCiudadanoTable.direccionElectoral =
                "RESIDENTE EN EL EXTRANJERO. DEBE COMPLETAR INFORMACIÓN.";
            }
          } else {
            if (data.direccion !== null) {
              newDatosCiudadanoTable.direccionElectoral = data.direccion;
            }
          }
        }

        if (data.numeroCasa !== null && data.numeroCasa) {
          newDatosCiudadanoTable.nroCasaElectoral = data.numeroCasa;
        }
        if (data.numeroZona !== null && data.numeroZona) {
          newDatosCiudadanoTable.nroZonaElectoral = data.numeroZona;
        }

        if (data.departamentoResidencia) {
          if (data.departamentoResidencia.id == 25) {
            newDatosCiudadanoTable.nroCasaElectoral = "";
            newDatosCiudadanoTable.nroZonaElectoral = "";
          }
        }
        if (data.telefono !== null) {
          newDatosCiudadanoTable.telefono = data.telefono;
        }
        if (data.email !== null) {
          newDatosCiudadanoTable.email = data.email;
        }
        if (data.descripcionOcupacion !== null) {
          newDatosCiudadanoTable.descripcionOcupacion =
            data.descripcionOcupacion;
        }
        if (data.profesionDescripcion) {
          if (data.profesionDescripcion.id !== null) {
            newDatosCiudadanoTable.descripcionOcupacionId =
              data.profesionDescripcion.id;
          }
          if (data.profesionDescripcion.name !== null) {
            newDatosCiudadanoTable.descripcionOcupacion =
              data.profesionDescripcion.name;
          }
        }
        if (
          data.fechaUltimaDirección !== null &&
          data.fechaUltimaDirección !== ""
        ) {
          newDatosCiudadanoTable.fechaUltimaDirección =
            data.fechaUltimaDirección;
        }
        if (data.departamentoResidencia) {
          if (
            data.departamentoResidencia.id !== null &&
            data.departamentoResidencia.id !== ""
          ) {
            newDatosCiudadanoTable.departamentoEmpadronamientoId =
              data.departamentoResidencia.id;
          }
          if (
            data.departamentoResidencia.name !== null &&
            data.departamentoResidencia.name !== ""
          ) {
            newDatosCiudadanoTable.departamentoEmpadronamientoName =
              data.departamentoResidencia.name;
          }
        }
        if (data.municipioResidencia) {
          if (
            data.municipioResidencia.id !== null &&
            data.municipioResidencia.id !== ""
          ) {
            newDatosCiudadanoTable.municipioEmpadronamientoId =
              data.municipioResidencia.id;
          }
          if (
            data.municipioResidencia.municipio !== null &&
            data.municipioResidencia.municipio !== ""
          ) {
            newDatosCiudadanoTable.municipioEmpadronamientoName =
              data.municipioResidencia.municipio;
          }
        }
        if (data.departamentoResidencia) {
          if (data.departamentoResidencia.id == 25) {
            if (data.datosresidenciaEnELExtranjero !== null) {
              if (data.datosresidenciaEnELExtranjero.pais.id) {
                newDatosCiudadanoTable.paisEmpadronamientoId =
                  data.datosresidenciaEnELExtranjero.pais.id;
              }
              if (data.datosresidenciaEnELExtranjero.estado.id) {
                newDatosCiudadanoTable.estadoEmpadronamientoId =
                  data.datosresidenciaEnELExtranjero.estado.id;
              }
              if (data.datosresidenciaEnELExtranjero.ciudad.id) {
                newDatosCiudadanoTable.ciudadEmpadronamientoId =
                  data.datosresidenciaEnELExtranjero.ciudad.id;
              }
            }
          }
        }

        if (data.nroBoleta != null && data.nroBoleta !== "") {
          newDatosCiudadanoTable.nroBoleta = data.nroBoleta;
        }

        // Para pruebas con data dummy de cuando el
        // usuario está empadronado en el extranjero.
        // newDatosCiudadanoTable.departamentoEmpadronamientoId = 25;
        // newDatosCiudadanoTable.municipioEmpadronamientoId = "";
        // newDatosCiudadanoTable.paisEmpadronamientoId = 3;
        // newDatosCiudadanoTable.estadoEmpadronamientoId = 3;
        // newDatosCiudadanoTable.ciudadEmpadronamientoId = 1;
        // console.log("newDatosCiudadanoTable:", newDatosCiudadanoTable);

        this.state.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE(
          newDatosCiudadanoTable
        );

        // this.setState({
        //   checkAutorization: false,
        //   authorized: true,
        //   loading: false,
        //   data: data,
        //   create: false,
        // });
      }
    } catch (exception) {
      this.state.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_CIUDADANO_TABLE(
        this.state.datosCiudadanoTableDefault
      );
      console.error(exception);
    }
  }

  abrirObservacion = () => {
    this.setState({ openObservation: true });
  };
  cerrarObservacion = () => {
    this.setState({ openObservation: false });
  };

  updateList = () => {};

  clearFiles = () => {
    this.state.SOLICITUD_EMPADRONAMIENTO_SET_STEP(0);
    // this.state.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
    //   this.state.dataUsuarioPorAsociarVacia
    // );
  };

  clickAway = (event, reason) => {
    this.clearFiles();
    this.setState({
      create: false,
    });
    this.showList();
  };

  closeSuccessMessage = (event, reason) => {
    this.clearFiles();
    this.setState({
      successMessageOpen: false,
    });
    this.showList();
  };

  openSuccessMessage = (event, reason) => {
    // this.clearFiles();
    this.setState({
      successMessageOpen: true,
    });
    // this.showList();
  };

  setObservacion = (message, title) => {
    this.setState({
      textoObservacion: message,
      title: title,
    });
  };

  downloadConstanciaEmpadronamiento = async (cve) => {
    let response = await ApiServices.empadronamiento.customGET(
      "constancia/" + cve
    );
    if (response.error != null) Alert.error("Intente de nuevo");
    else
      functions.downloadPDFFromStringBase64(
        response.data.base64,
        "ConstanciaDeEmpadronamiento_" +
          response.data.cui +
          "_" +
          this.splitDate(response.data.fecha)
      );
  };

  async componentDidMount() {
    // console.log(
    //   "datosCiudadanoTableDefault:",
    //   this.state.datosCiudadanoTableDefault
    // );

    this.setState({ loading: true });
    await this.getInfoEmpadronamiento();
    await this.showList();
    this.setState({ loading: false });
  }

  render() {
    const { classes } = this.props;
    if (this.state.checkAutorization) return <LoadingIndicator />;
    if (!this.state.authorized && !this.state.loading) {
      return <NotAuthorized />;
    }

    return (
      <div style={{marginTop: '37px', backgroundColor: '#EDEDED'}}>
        <LoadingSpinner open={this.state.loading}></LoadingSpinner>

        <NewModal
          open={this.state.create}
          controller={this.state.controller}
          handleClose={this.clickAway}
          clearFiles={this.clearFiles}
          showList={this.showList}
          updateList={this.updateList}
          openSuccessMessage={this.openSuccessMessage}
        />

        <SuccessMessage
          open={this.state.successMessageOpen}
          handleClose={this.closeSuccessMessage}
          // idDeSolicitudAceptar={this.state.idDeSolicitudAceptar}
          // rowData={this.state.rowData}
        />

        <ModalObservation
          open={this.state.openObservation}
          handleClose={this.cerrarObservacion}
          textoObservacion={this.state.textoObservacion}
          title={this.state.title}
        />

        <div style={{ backgroundColor: "#FFFFFF" }}>
          <Title
            title="Información Actual de Empadronamiento"
            icon={<PeopleIcon />}
            description={
              `A continuación se muestra la información que obra en ` +
              `el registro de ciudadanos del Tribunal Supremo Electoral.`
            }
          />
        </div>
        <br />
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
        <div className={classes.tableDivLarge}>
          <Media
            queries={{
              small: "(max-width: 1023px)",
              large: "(min-width: 1024px)",
            }}
          >
            {(matches) => (
              <Fragment>
                {matches.small && (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <h3 className={classes.mobileTitle}>
                        <strong>
                          Historial de Solicitudes de Empadronamiento o
                          Actualización de Datos
                        </strong>
                      </h3>

                      <p className={classes.description}>
                        {this.state.secondTitleDescription}
                      </p>

                      <Button
                        variant="contained"
                        size="medium"
                        style={{
                          background:
                            "linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",
                          color: "#fff",
                          marginRight: "5px",
                        }}
                        endIcon={<Add />}
                        onClick={this.addRegister}
                      >
                        Crear Solicitud
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        style={{
                          background:
                            "linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ",
                          color: "#fff",
                        }}
                        endIcon={<Refresh />}
                        onClick={this.showList}
                      >
                        Actualizar
                      </Button>
                    </div>
                    <br></br>
                    <Divider></Divider>
                    <div className={classes.tableDiv}>
                      <ListElement
                        {...this.state}
                        downloadConstanciaEmpadronamiento={
                          this.downloadConstanciaEmpadronamiento
                        }
                        dataSolicitudes={this.state.data}
                        abrirObservacion={this.abrirObservacion}
                        setObservacion={this.setObservacion}
                      />
                    </div>
                  </>
                )}
                {matches.large && (
                  <React.Fragment>
                    <div style={{ backgroundColor: "#FFFFFF" }}>
                      <Title
                        title="Historial de Solicitudes de Empadronamiento o Actualización de Datos"
                        icon={<PeopleIcon />}
                        description={this.state.secondTitleDescription}
                      />
                    </div>
                    <br />
                    <div className={classes.tableDiv}>
                      <Table
                        pageSize={this.state.pageSize}
                        title={"Listado de solicitudes"}
                        header={this.state.header}
                        data={this.state.data}
                        refreshList={this.showList}
                        detailPanel={this.state.detailPanel}
                        addRegister={this.addRegister}
                        className={classes.table}
                        addButtonTitle={"Crear Solicitud"}
                        options={this.state.tableOptions}
                      />
                    </div>
                  </React.Fragment>
                )}
              </Fragment>
            )}
          </Media>
          <StatusDescription />
          <br />
          <div className={classes.lineaDegradadaBottom}></div>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Empadronamiento));
