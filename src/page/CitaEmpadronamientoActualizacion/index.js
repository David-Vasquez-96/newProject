import React, { Component, Fragment } from "react";
import Title from "component/Title";
import Table from "component/Table";
import Alert from "react-s-alert";
import Media from "react-media";
import Footer from "page/Home/Footer2";
import NewModal from "./NewModal";
import PeopleIcon from "@material-ui/icons/People";
import ApiServices from "service/ApiServices";
import ListElement from "./ListElement";
import { connect } from "react-redux";
import BotonElement from "component/BotonTable";
import { functions } from "constant/index";
import NotAuthorized from "common/NotAuthorized";
import LoadingSpinner from "component/LoadingSpinner";
import mapStateToProps from "./mapStateToProps";
import ModalObservation from "component/ModalObservation";
import mapDispatchToProps from "./mapDispatchToProps";
import { Refresh, Add, Description } from "@material-ui/icons";
import {Icon, Button, Divider, IconButton, ButtonGroup} from "@material-ui/core/";
class CitaEmpadronamientoActualizacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            controller: "citaEmpadronamientoActualizacion",
            loading: false,
            authorized: true,
            checkAutorization: false,
            create: false,
            update: false,
            delete: false,
            rowData: [],
            data: [],
            customActions: [],
            CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA: props.CONSTANCIACANDIDATOELECCIONPOPULAR_SET_DATA,
            ASOCIAR_USUARIOS_SET_STEP: props.ASOCIAR_USUARIOS_SET_STEP,
            ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR: props.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR,
            CITA_EMPADRONAMIENTO_SET_STEP: props.CITA_EMPADRONAMIENTO_SET_STEP,
            dataUsuarioPorAsociarVacia: props.dataUsuarioPorAsociarVacia,
            containsCurrentRequest: false,
            openObservacion: false,
            textoObservacion: "",
            titleObservacion: "",
            procesarCitaOpen: false,
            citaEnProceso: "",
            header: [
                { title: "No.", field: "noCita" },
                { title: "DPI", field: "cui" },
                { title: "Nombre", field: "name" },
                { title: "Nacional/Extranjero", field: "nacionalOExtranjero" },
                { title: "Pais", field: "paisResidencia",
                    render: (rowData) => (
                        <div>{((rowData.paisResidencia !== null) ? rowData.paisResidencia.nombrePaisExtendido : rowData.paisEstatico)}</div>
                    ),
                },
                { title: "Fecha de Cita Nacional", field: "fechaCitaGuatemala" },
                { title: "Hora de Cita Nacional", field: "horaCitaGuatemala" },
                { title: "Zona horaria", field: "idTimeZone" },
                { title: "Fecha de Cita Extranjero", field: "fechaCita" },
                { title: "Hora de Cita Extranjero", field: "horaCita" },
                { title: "Fecha de Creación", field: "fechaCreacion",
                    render: (rowData) => this.splitDate(rowData.fechaCreacion),
                },
                { title: "Fecha de Modificación", field: "fechaModificacion",
                    render: (rowData) => (
                        <React.Fragment>
                            {rowData.fechaModificacion ? (<p>{this.splitDate(rowData.fechaModificacion)}</p>) : ("")}
                        </React.Fragment>
                    ),
                },
                { title: "Número de Contacto", field: "numeroContacto"},
                { title: "Estado", field: "nombreEstadoSolicitud"},
                { title: "Observación", field: "observacion",
                    render: (rowData) => (
                        <div>
                            {rowData.observacion !== null ? (
                                <IconButton size="small"color="primary"
                                    onClick={() => {
                                        this.abrirObservacion();
                                        this.setState({textoObservacion: rowData.observacion, title: "Observaciones"});
                                    }}
                                >
                                    <img alt="comments" style={{ height: 40, width: 40 }} src="/assets/comments.svg"/>
                                </IconButton>
                            ) : ("")
                            }
                        </div>
                    ),
                },
            ],
            currentUser: props.currentUser,
        };
        this.showList = this.showList.bind(this);
        this.splitDate = this.splitDate.bind(this);
        this.addRegister = this.addRegister.bind(this);
        this.abrirObservacion = this.abrirObservacion.bind(this);
        this.cerrarObservacion = this.cerrarObservacion.bind(this);
        this.splitHoursFromDate = this.splitHoursFromDate.bind(this);
    }
    splitDate = (date) => {
        if (date !== undefined) {
            var arr1 = date.split("-");
            var arr2 = arr1[2].split("T");
            var finalDate = arr2[0] + "/" + arr1[1] + "/" + arr1[0];
            return finalDate;
        }
    };

    splitHoursFromDate = (date) => {
        if (date !== undefined) {
            let arr1 = date.split("T");
            let arr2 = arr1[1].split(".");
            let finalHour = arr2[0];
            return finalHour;
        }
    };
    
    async addRegister() {
        await this.showList();
        if (this.state.containsCurrentRequest === false) {
            this.setState({ loading: true });
            //QUERY THAT GETS RENAP INFORMATION OF USER.
            this.setState({ create: true });
            this.setState({ loading: false });
        } else {
            Alert.error("Ya existe una cita programada pendiente. Espere a que sea resuelta.");
        }
    }

    async showList() {
        try {
            this.setState({ loading: true });
            const hasPermission = await ApiServices.userSecurity.hasPermission(this.state.controller,"list");

            if (hasPermission.error) {
                this.setState({checkAutorization: false, authorized: false, loading: false});
            } else {
                let data = [];
                // ApiServices.citasEmpadronamientoActualizacion.searchCriteria.clear();
                // ApiServices.citasEmpadronamientoActualizacion.searchCriteria.setOperator("or");
                // ApiServices.citasEmpadronamientoActualizacion.searchCriteria.addEquals("estadoSolicitud", 0);
                // ApiServices.citasEmpadronamientoActualizacion.searchCriteria.addEquals("estadoSolicitud", 3);
                ApiServices.citasEmpadronamientoActualizacion.orderCriteria.clear();
                ApiServices.citasEmpadronamientoActualizacion.orderCriteria.addDesc("id");

                let response = await ApiServices.citasEmpadronamientoActualizacion.listRegisterCriteria();
                
                if (response.error !== null) {
                    Alert.error(response.error.message);
                } else if (response.data !== "") {
                    data = [];
                    let responseData = response.data;
                    responseData.forEach((element) => {
                        let nacionalOExtranjero = "NACIONAL";
                        if (element.esnacional !== true) {nacionalOExtranjero = "EXTRANJERO"}
                        
                        let newElement = {
                            noCita: element.id,
                            cui: element.cui,
                            name: element.nombreCiudadano, //Solicitar a Jose
                            horaCita: element.horaCita,
                            fechaCreacion: element.createdAt,
                            fechaModificacion: element.updatedAt,
                            nacionalOExtranjero: nacionalOExtranjero,
                            estadoSolicitud: element.estadoSolicitud,
                            nombreEstadoSolicitud: element.nombreEstadoSolicitud,
                            numeroContacto: element.numeroContacto,
                            observacion: element.observacion,
                            paisResidencia: element.paisResidencia,
                            fechaCita: element.fechaCita,
                            horaCitaGuatemala: element.horaCitaGuatemala, 
                            fechaCitaGuatemala: element.fechaCitaGuatemala,
                            idTimeZone: element.idTimeZone,
                            paisEstatico: element.paisEstatico,

                        };
                        data.push(newElement);
                    });

                    functions.orderArrayDescent(data, "noCita");

                    let dataContainsRequestPending = false;
                    data.forEach((element) => {
                        if (element.estadoSolicitud == 0 || element.estadoSolicitud == 3) {dataContainsRequestPending = true}
                    });

                    if (dataContainsRequestPending === true) {this.setState({ containsCurrentRequest: true })} 
                    else {this.setState({ containsCurrentRequest: false })}

                    this.setState({checkAutorization: false, authorized: true, loading: false, data: data, create: false});
                }
            }
        } catch (exception) {
            console.error("exception:", exception);
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo");
            this.setState({ loading: false, checkAutorization: false });
        }
        this.setState({ loading: false });
    }

    abrirObservacion() {
        this.setState({ openObservacion: true });
    }

    cerrarObservacion() {
        this.setState({ openObservacion: false });
    }

    openProcesarCitaModal(infoCita) {
        // console.log("infoCita: ", infoCita);
        this.setState({ procesarCitaOpen: true, citaEnProceso: infoCita });
    }

    closeProcesarCitaModal() {
        this.setState({ procesarCitaOpen: false });
    }

    updateList = () => {};

    clearFiles = () => {
        this.state.CITA_EMPADRONAMIENTO_SET_STEP(0);
        // this.state.ASOCIAR_USUARIOS_SET_DATA_USUARIO_POR_ASOCIAR(
        //   this.state.dataUsuarioPorAsociarVacia
        // );
    };

    clickAway = (event, reason) => {
        this.clearFiles();
        this.showList();
        this.setState({
        create: false,
        procesarCitaOpen: false,
        });
    };
    
    async componentDidMount() {
        this.showList();
    }

    render() {
        if (!this.state.authorized && !this.state.loading) {return <NotAuthorized />}

        return (
            <React.Fragment>
                <LoadingSpinner open={this.state.loading}></LoadingSpinner>

                <ModalObservation open={this.state.openObservacion}
                    handleClose={this.cerrarObservacion}
                    textoObservacion={this.state.textoObservacion}
                    title={this.state.titleObservacion}
                />

                <NewModal open={this.state.create}
                    controller={this.state.controller}
                    handleClose={this.clickAway}
                    clearFiles={this.clearFiles}
                    showList={this.showList}
                    updateList={this.updateList}
                />

                <div style={{ backgroundColor: "#FFFFFF" }}>
                    <Title title="Citas de Empadronamiento y Actualización de Datos" icon={<PeopleIcon />}/>
                </div>
                <br />

                <Media
                    queries={{
                        // small: "(max-width: 1023px)",
                        // large: "(min-width: 1024px)",
                        small: "(max-width: 10px)",
                        large: "(min-width: 11px)",
                    }}
                >
                {(matches) => (
                    <Fragment>
                    {matches.small && (
                        <>
                            <div style={{ textAlign: "center" }}>
                                <h3><strong>Listado de Citas</strong></h3>
                                <Button variant="contained" size="medium"
                                    style={{background:"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ", color: "#fff", marginRight: "5px"}}
                                    endIcon={<Add />}
                                    onClick={this.addRegister}
                                >
                                    Crear Cita
                                </Button>
                                <Button variant="contained" size="medium"
                                    style={{background:"linear-gradient(130deg, rgb(6, 107, 189) 30%, rgb(30, 136, 229) 90%) repeat scroll 0% 0% ", color: "#fff"}}
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
                                title={"Listado de Citas"}
                                header={this.state.header}
                                data={this.state.data}
                                refreshList={this.showList}
                                detailPanel={this.state.detailPanel}
                                addRegister={this.addRegister}
                                addButtonTitle={"Crear Cita"}
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
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitaEmpadronamientoActualizacion);
