import React, { useEffect, useState } from "react";
import { Tooltip, IconButton } from '@material-ui/core/';
import { CheckCircleOutline } from "@material-ui/icons";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import Footer from "page/Home/Footer2";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
import { functions } from "constant";

export default function PaquetesOperados() {
/********** VARIABLES **********/
    const [controller] = useState('paquetesDeAfiliacionYAdhesion'),
        [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
        [spinnerMessage, setSpinnerMessage] = useState('Cargando...'),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [authorized, setAuthorized] = useState(true),
        [loading, setLoading] = useState(false),
        [data, setData] = useState([]),
        [tableOptions] = useState(
            { filtering: true, pageSize: 20, pageSizeOptions: [20, 30, 50, 75, 100], toolbar: true, paging: true, search: true, actionsColumnIndex: -1 }
        ),
        [tableHeader] = useState([
            { title: "Identificador del paquete", field: "id", cellStyle: { width: "100px", height: '50px' } },
            { title: "Nombre del paquete", field: "nombrePaquete" },
            { title: "Hojas en el paquete", field: "hojasPaquete" },
            { title: "Fecha de creación", field: "fechaCreacion" },
            { title: "Fecha de envío", field: "fechaEnvio" },
            { title: "Fecha de resolución", field: "fechaResolucion" },
            { title: "Estado", field: "estado", filtering: false,
                render: (rowData) => 
                    <div style={{ minWidth: "200px" }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircleOutline style={{ color: "#52be80" }} />{" "}PAQUETE OPERADO
                        </div>
                    </div>                
            },
            { title: "Documentos", field: "acciones", filtering: false,
                render: (rowData) => 
                    <div style={{ minWidth: '200px' }}>
                        <Tooltip title="Descargar Reporte">
                            <IconButton size="small" color="primary"
                                onClick={() => dowloadReport(rowData)}>
                                <img alt="dowload" style={{ height: 40, width: 40 }} src="/assets/constancia_dowload.svg" />
                            </IconButton>
                        </Tooltip>
                    </div>                
            },
        ]);

/********** FUNCTIONS **********/
    useEffect(() => {
        showList();
    }, [])

    /*  Este método lista la información de los paquetes con esta 4 - Finalizado y que sean de faseOP 3 - Partido Político
        se ejecuta en el useEffect y en el "refreshList"   */
    const showList = async () => {
        setLoading(true);
        setSpinnerMessage('Cargando...');
        try {
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "list");
            if (hasPermission.error) {
                setAuthorized(false);
                setLoading(false);
            } else {
                ApiServices[controller].searchCriteria.clear();
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("estado", 4);
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("faseOP", 3);
                ApiServices[controller].orderCriteria.clear();
                ApiServices[controller].orderCriteria.addDesc("fechaCreacionParseada");

                let response = await ApiServices[controller].customGET('list');
                let data = [];
                if (response.error !== null) {
                    setOpenAlertModal(true);
                    setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
                }
                else if (response.data !== "") {
                    data = response.data;
                    for (let value of data) {
                        value.hojasPaquete = value.detallePaquete.length;
                        for (let valueData of value.movimientoPaquete) {
                            if (valueData.idEstadoPaquete === 0) {
                                value.fechaCreacion = valueData.fechaYHoraMovimientoParseada;
                            } else if (valueData.idEstadoPaquete === 1) {
                                value.fechaEnvio = valueData.fechaYHoraMovimientoParseada;
                            } else if (valueData.idEstadoPaquete === 4) {
                                value.fechaResolucion = valueData.fechaYHoraMovimientoParseada;
                            }
                        }
                    }
                    setData(data);
                }
                setAuthorized(true);
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /*  Este método ejecuta la función para descargar un documento pdf con el cve de cada paquete,
        se ejecuta desde el icono "Descargar Reporte" */
    const dowloadReport = async (data) => {
        var idPackage = data.id;
        try {
            setLoading(true);
            setSpinnerMessage('Generando Reporte...')
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "reporte");
            if (hasPermission.error) {
                setLoading(false);
            } else {
                let response = await ApiServices.paquetesDeAfiliacionYAdhesion.generarReporte(idPackage, 0);
                if (response.error !== null) {
                    setOpenAlertModal(true);
                    setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
                }
                else if (response.data !== "") {
                    functions.downloadPDFFromStringBase64(response.data, 'Reporte General Paquete ' + idPackage);
                }
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /* Este método cierra el modal "AlertElement" de mensajes de alerta */
    const handCloseModal = () => {
        setOpenAlertModal(false);
    }

        
/********** RENDER **********/
    if (!authorized && !loading) {
        return <NotAuthorized />;
    }

    return (
        <div>           
            {loading && <LoadingSpinner message={spinnerMessage} open={loading}></LoadingSpinner>}
            {openAlertModal &&<AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handCloseModal} />}
            <Table title={"Listado de paquetes"} header={tableHeader} data={data} refreshList={showList} options={tableOptions} />
            <Footer />
        </div>
    );
}