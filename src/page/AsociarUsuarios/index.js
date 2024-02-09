import React, { Component, Fragment } from "react";
import ApiServices from "service/ApiServices";
import LoadingIndicator from "common/CircularProgressMessage";
import NotAuthorized from "common/NotAuthorized";
//No me gusta el título con el ícono todo grande.
//import Title from "component/TitleWithIcon";
import Title from "component/Title";
import Table from "component/Table";
import LoadingSpinner from "component/LoadingSpinner";
import Alert from "react-s-alert";
import { functions } from "constant/index";
import ListElement from "./ListElement";
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { Icon, Button, Divider } from "@material-ui/core/";
import { Refresh, Add } from "@material-ui/icons";
import PeopleIcon from "@material-ui/icons/People";
import Footer from "page/Home/Footer2";
import Media from "react-media";
import NewModal from "./NewModal";

class AsociarUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      controller: "constanciaCandidatoEleccionPopular",
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
      rowData: [],
      data: [],
      customActions: [],
      CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA:
        props.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
      ASOCIAR_USUARIOS_SET_STEP: props.ASOCIAR_USUARIOS_SET_STEP,
      ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR:
        props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR,
      ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO:
        props.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO,
      ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO:
        props.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO,
      ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO:
        props.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO,
      ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION:
        props.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION,
      dataUsuarioPorAsociarVacia: props.dataUsuarioPorAsociarVacia,
      header: [
        { title: "No.", field: "id", cellStyle: { width: "100px" } },
        { title: "DPI", field: "cui" },
        { title: "Nombre", field: "nombre" },
        {
          title: "Fecha de solicitud",
          field: "fechaSolicitud",
          render: (rowData) => this.splitDate(rowData.fechaSolicitud),
        },
        {
          title: "Fecha de resolución",
          field: "fechaResolucion",
          render: (rowData) => (
            <div style={{ minWidth: "200px" }}>
              {rowData.esRechazado === false &&
              rowData.esVerificado === true ? (
                <p>{this.splitDate(rowData.fechaResolucion)}</p>
              ) : (
                ""
              )}
            </div>
          ),
        },
        {
          title: "Estado",
          field: "estado", //,cellStyle:{ width: '100px' },
          render: (rowData) => (
            <div style={{ minWidth: "200px" }}>
              {rowData.esVerificado === true &&
              rowData.esRechazado === false ? (
                <div>
                  <Icon style={{ color: "#1E88E5" }}>description</Icon>{" "}
                  Solicitud Aceptada
                </div>
              ) : rowData.esVerificado === true &&
                rowData.esRechazado === true ? (
                <div>
                  <Icon style={{ color: "#FA0000" }}>close</Icon> Solicitud
                  Rechazada
                </div>
              ) : (
                <div>
                  <Icon style={{ color: "#57C48F" }}>timer</Icon> En proceso
                </div>
              )}
            </div>
          ),
        },
        {
          title: "Observación",
          field: "observacion",
          render: (rowData) => <p>{rowData.observacion}</p>,
        },
        {
          title: "Archivo",
          field: "archivo", //,cellStyle:{ width: '100px' },
          render: (rowData) => (
            <div style={{ minWidth: "200px" }}>
              {rowData.esVerificado === true &&
              rowData.esRechazado === false ? (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  endIcon={<Icon>get_app</Icon>}
                  onClick={async () => {
                    try {
                      let response = await ApiServices[
                        this.state.controller
                      ].openFile(rowData.id);
                      if (response.error != null) {
                        Alert.error("Intente de nuevo");
                      } else {
                        const fileName =
                          "ConstanciaCandidatoEleccionPopular_" +
                          rowData.cui +
                          "_" +
                          rowData.fechaResolucion +
                          ".pdf";
                        functions.downloadPDFFromStringBase64(
                          response.data.base64,
                          fileName
                        );
                      }
                    } catch (error) {
                      //console.log("error: ", error);
                    }
                  }}
                >
                  Descargar
                </Button>
              ) : (
                ""
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
    this.setState({ create: true });
  }

  async showList() {
    try {
      this.setState({ loading: true });
      const hasPermission = await ApiServices.userSecurity.hasPermission(
        this.state.controller,
        "list"
      );
      //console.log("this.state.controller:", this.state.controller);
      //console.log("hasPermission:", hasPermission);

      if (hasPermission.error) {
        this.setState({
          checkAutorization: false,
          authorized: false,
          loading: false,
        });
      } else {
        ApiServices[this.state.controller].orderCriteria.clear();
        ApiServices[this.state.controller].orderCriteria.addDesc(
          "fechaSolicitud"
        );
        ApiServices[this.state.controller].orderCriteria.addDesc("id");
        let response = await ApiServices[
          this.state.controller
        ].listRegisterCriteria();
        let data = [];
        if (response.error !== null) Alert.error(response.error.message);
        else if (response.data !== "") data = response.data;

        this.state.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA(data);
        this.setState({
          checkAutorization: false,
          authorized: true,
          loading: false,
          data: data,
          create: false,
        });
      }
    } catch (exception) {
      exception.status === 404
        ? Alert.warning("Intente de nuevo")
        : Alert.warning("Intente de nuevo ");
      this.setState({ loading: false, checkAutorization: false });
    }
  }

  updateList = () => {};

  clearFiles = () => {
    this.state.ASOCIAR_USUARIOS_SET_STEP(0);
    this.state.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
      this.state.dataUsuarioPorAsociarVacia
    );
    this.state.ASOCIAR_USUARIOS_SET_TIPO_PERMISO_ICO("");
    this.state.ASOCIAR_USUARIOS_SET_DEPARTAMENTO_ICO("");
    this.state.ASOCIAR_USUARIOS_SET_MUNICIPIO_ICO("");
    this.state.ASOCIAR_USUARIOS_SET_PERMISO_AFILIACION("");
  };

  clickAway = (event, reason) => {
    this.clearFiles();
    this.showList();
  };
  async componentDidMount() {
    this.showList();
  }

  render() {
    if (this.state.checkAutorization) return <LoadingIndicator />;
    if (!this.state.authorized && !this.state.loading) {
      return <NotAuthorized />;
    }

    return (
      <div>
        <LoadingSpinner open={this.state.loading}></LoadingSpinner>

        <NewModal
          open={this.state.create}
          controller={this.state.controller}
          handleClose={this.clickAway}
          clearFiles={this.clearFiles}
          showList={this.showList}
          updateList={this.updateList}
        />
        <div style={{ backgroundColor: "#FFFFFF" }}>
          <Title
            title="Usuarios Asociados a Servicios de Organización Política"
            icon={<PeopleIcon />}
          />
        </div>
        <br />

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
                    <h3>
                      <strong>Listado de solicitudes</strong>
                    </h3>
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
                      Agregar
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
                  <ListElement />
                </>
              )}
              {matches.large && (
                <>
                  <Table
                    pageSize={this.state.pageSize}
                    title={"Listado de solicitudes"}
                    header={this.state.header}
                    data={this.state.data}
                    refreshList={this.showList}
                    detailPanel={this.state.detailPanel}
                    addRegister={this.addRegister}
                  />
                </>
              )}
            </Fragment>
          )}
        </Media>

        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsociarUsuarios);
