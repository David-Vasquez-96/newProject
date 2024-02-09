import React, { useState, useEffect } from "react";
import { Icon } from "@material-ui/core/";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import Footer from "page/Home/Footer2";
import Table from "component/Table";
import NewModal from "./NewModal";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";

export default function SolicitudNuevaAdhesion(props) {
/********** VARIABLES **********/
    const [controller] = useState('solicitudHojasAdhesion'),
        [openCreateRequest, setOpenCreateRequest] = useState(false),
        [mensajeAlertModal, setMensajeAlertModal] = useState(''),
        [showAddRegister, setShowAddRegister] = useState(false),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [titleAlertModal, setTitleAlertModal] = useState(''),
        [authorized, setAuthorized] = useState(true),
        [loading, setLoading] = useState(false),
        [data, setData] = useState([]),
        [headerTable] = useState([
            { title: "No. de solicitud", field: "id", cellStyle: { width: "100px" } },
            { title: "Hojas solicitadas", field: "cantidadDeHojas" },
            { title: "Nombre solicitante", field: "usuarioOp.nombreAfiliado" },
            { title: "Fecha y hora de solicitud", field: "fechaCreacionSolicitudParseada" },
            { title: "Estado", field: "estado", filtering: false,
                render: (rowData) => (
                    <div style={{ minWidth: "200px" }}>
                        {rowData.idEstadoSolicitud === 1 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon style={{ color: "#5dade2" }}>timer</Icon>{" "} SOLICITUD EN PROCESO
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon style={{ color: "#5dade2" }}>timer</Icon> SOLICITUD AUTORIZADA
                            </div>
                        )}
                    </div>
                )
            }
        ]);

/********** FUNCTIONS **********/
    useEffect(() => {
        if (props.data) {
            setAuthorized(props.authorized);
            if (props.data.dataOp.faseOp === 2) {
                setShowAddRegister(true);
            } else {
                setShowAddRegister(false);
            }
        }
    }, [props.data]);

    useEffect(() => {
        showList();
    }, [])

    /*  Este método lista la información de las solicitudes de hojas de adhesion en status 1 y 2,
        se ejecuta en el useEffect y en el "refreshList"   */
    const showList = async () => {
        try {
            setLoading(true);
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "listFilter");
            if (hasPermission.error) {
                setAuthorized(false);
                setLoading(false);
            } else {
                ApiServices[controller].orderCriteria.clear();
                ApiServices[controller].orderCriteria.addAsc("fechaCreacionSolicitud");
                ApiServices[controller].searchCriteria.clear();
                ApiServices[controller].searchCriteria.setOperator("or");
                ApiServices[controller].searchCriteria.addEquals("idEstadoSolicitud", 1);
                ApiServices[controller].searchCriteria.addEquals("idEstadoSolicitud", 2);

                let response = await ApiServices[controller].listFilter();
                let data = [];
                if (response.error !== null) Alert.error(response.error.message);
                else if (response.data !== "") data = response.data.ultimaSolicitud.data;
                
                setAuthorized(true);
                setLoading(false);
                setData(data);
                setOpenCreateRequest(false)
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
            setAuthorized(false);
        }
    }

    /*  El método despliega el modal "NewModal"que tiene el formulario para crear una nueva solicitud de hojas
        se ejecuta desde el botón de la tabla "Crear Solicitud" */
    const addRegister = () => {
        setOpenCreateRequest(true);
    }

    /*  Cierra el modal "NewModal", se ejecuta desde este modal en el botón "Cancelar" */
    const cancelRegister = () => {
        setOpenCreateRequest(false)
    }

    /*  Despliega una alerta de creación exitosa de la solicitud de hojas, se ejecuta desde el modal "NewModal" */
    const createRequestSuccess = (cantHojas, idRegistro) => {
        setOpenAlertModal(true);
        setTitleAlertModal('Solicitud Generada');
        setMensajeAlertModal('La solicitud de ' + cantHojas + ' Hojas se genero con el No.' + idRegistro + ' de forma exitosa.');
        setOpenCreateRequest(false);
    }

    /* Este método cierra el modal "AlertElement" de mensajes de alerta */
    const handCloseModal = () => {
        setOpenAlertModal(false)
    }

/********** RENDER **********/
    if (!authorized && !loading) { return <NotAuthorized /> }

    return (
        <div>
            {loading && (<LoadingSpinner open={loading}></LoadingSpinner>)}
            {openCreateRequest && (<NewModal open={openCreateRequest} handleClose={cancelRegister} reloadList={showList} controller={controller} requestSuccess={createRequestSuccess} />)}
            {openAlertModal && (<AlertElement success openModal={openAlertModal} title={titleAlertModal} mensaje={mensajeAlertModal} handCloseModal={handCloseModal} />)}
            <Table filter={true} title={"Listado de solicitudes"} header={headerTable} data={data} refreshList={showList} addButtonTitle={"Crear Solicitud"} addRegister={showAddRegister ? addRegister : undefined} />
            <Footer />
        </div>
    );
}