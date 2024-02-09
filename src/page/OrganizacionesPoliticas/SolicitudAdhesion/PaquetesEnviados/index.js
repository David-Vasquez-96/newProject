import React, { useEffect, useState } from "react";
import { ScheduleSharp, Send, Assignment, Description } from "@material-ui/icons";
import { Tooltip, IconButton } from '@material-ui/core/';
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import PackageDetail from "./PackageDetail";
import Footer from "page/Home/Footer2";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
import { functions } from "constant";
/********** STYLES **********/
import { useStyles } from './style';

export default function PaquetesEnviados() {
/********** VARIABLES **********/
    const classes = useStyles();
    const [controller] = useState('paquetesDeAfiliacionYAdhesion'),
        [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
        [spinnerMessage, setSpinnerMessage] = useState('Cargando...'),
        [openPackageDetail, setOpenPackageDetail] = useState(false),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [detailPackage, setDetailPackage] = useState([]),
        [authorized, setAuthorized] = useState(true),
        [infoPackage, setInfoPackage] = useState([]),
        [loading, setLoading] = useState(false),
        [data, setData] = useState([]),
        [tableOptions] = useState(
            { pageSize: 20, filtering: true, pageSizeOptions: [20, 30, 50, 75, 100], toolbar: true, paging: true, search: true, actionsColumnIndex: -1 }
        ),
        [tableHeader] = useState([
            { title: "Identificador del paquete", field: "id", cellStyle: { width: "100px", height: '50px' } },
            { title: "Nombre del paquete", field: "nombrePaquete" },
            { title: "Hojas en el paquete", field: "hojasPaquete" },
            { title: "Fecha de creacion", field: "fechaYHoraCreacionParseada" },
            { title: "Fecha de envío", field: "fechaEnviado" },
            { title: "Fecha de recepción", field: "fechaRecibido" },
            { title: "Estado", field: "estado", filtering: false,
                render: rowData => <div style={{ minWidth: '200px' }}>
                    {
                        (rowData.estadoPaquete.descripcion === "RECIBIDO") ?
                            (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ScheduleSharp style={{ color: "#5dade2" }} /> RECIBIDO
                            </div>) : (rowData.estadoPaquete.descripcion === "DEPURACION" ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Assignment style={{ color: "#5dade2" }} /> EN DEPURACIÓN
                                </div> :
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Send style={{ color: "#5dade2" }} /> ENVIADO
                                </div>)
                    }
                </div>
            },
            { title: "Acciones", field: "acciones", filtering: false,
                render: (rowData) => 
                    <div className={classes.actionContainer} style={{ minWidth: "200px" }}>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Detalle Paquete' onClick={() => showPackageModal(rowData.detallePaquete, rowData)} >
                                <IconButton className={classes.iconStyles} size="small" color="primary">
                                    <Description />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>                
            },
            { title: 'Documentos', field: 'archivo', filtering: false,
                render: rowData =>
                    <div style={{ minWidth: '200px' }}>
                        <Tooltip title="Constancia de Envío">
                            <IconButton size="small" color="primary"
                                onClick={() => dowloadDocument(rowData)}>
                                <img alt="dowload" style={{ height: 40, width: 40 }} src="/assets/constancia_dowload.svg" />
                            </IconButton>
                        </Tooltip>
                    </div>
            }
        ]);

/********** FUNCTIONS **********/
    useEffect(() => {
        showList();
    }, []);    

    /*  Este método lista la información de los paquetes desde el estado 1 al 3 y que sean de faseOP 2 - Comite
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
                ApiServices[controller].searchCriteria.setOperator("or");
                ApiServices[controller].searchCriteria.addEquals("estado", 1);
                ApiServices[controller].searchCriteria.addEquals("estado", 2);
                ApiServices[controller].searchCriteria.addEquals("estado", 3);
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("faseOP", 2);
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
                    /*  Se asigna el valor de la fecha de envío y la fecha Recibido si posee. */
                    for (let value of data) {
                        value.hojasPaquete = value.detallePaquete.length;
                        for (let valueData of value.movimientoPaquete) {
                            if (valueData.idEstadoPaquete === 1) {
                                value.fechaEnviado = valueData.fechaYHoraMovimientoParseada;
                            } else if (valueData.idEstadoPaquete === 2) {
                                value.fechaRecibido = valueData.fechaYHoraMovimientoParseada;
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

    /*  Este método despliega el modal "PackageDetail" que contiene la informacion detallada del paquete que seleccionemos, se ejecuta desde el botón
        "Detalle Paquete" en la fila de cada paquete de la tabla */
    const showPackageModal = (rowData, data) => {
        setOpenPackageDetail(true);
        setDetailPackage(rowData);
        setInfoPackage(data);
    }

    /*  El método cierra el modal "PackageDetail" se ejecuta desde el mismo componente en el botón "Cancelar" */
    const handleClosePackageModal = () => {
        setOpenPackageDetail(false);
    }

    /*  Este método ejecuta la función para descargar un documento pdf con el cve de cada paquete,
        se ejecuta desde el icono "Constancia de envío" */
    const dowloadDocument = async (data) => {
        var idPackage = data.id;
        try {
            setLoading(true);
            setSpinnerMessage('Generando Constancia de Envio...')
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "openFile");
            if (hasPermission.error) {
                setLoading(false);
            } else {
                let response = await ApiServices.paquetesDeAfiliacionYAdhesion.openConstanciaEnvio(idPackage);
                if (response.error !== null) {
                    setOpenAlertModal(true);
                    setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
                }
                else if (response.data !== "") {
                    functions.downloadPDFFromStringBase64(response.data, 'Constancia de Envío del paquete  ' + idPackage);
                }
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /* Este método cierra el modal "AlertElement" de mensajes de alerta */
    const handCloseAlertModal = () => {
        setOpenAlertModal(false)
    }

/********** RENDER **********/
    if (!authorized && !loading) {
        return <NotAuthorized />;
    }

    return (
        <div>
            {loading && <LoadingSpinner message={spinnerMessage} open={loading}></LoadingSpinner>}
            {openAlertModal && <AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handCloseAlertModal} />}
            {openPackageDetail && <PackageDetail open={openPackageDetail} handCloseModal={handleClosePackageModal} data={detailPackage} infoPackage={infoPackage} showList={showList} />}
            <Table title={"Listado de paquetes enviados"} header={tableHeader} data={data} refreshList={showList} options={tableOptions} />
            <Footer />
        </div>
    );
}