import React, { useEffect, useState } from "react";
import { Icon, Tooltip, IconButton } from "@material-ui/core/";
import { CheckCircleOutline } from "@material-ui/icons";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import LoadingSpinner from "component/LoadingSpinner";
import NotAuthorized from "common/NotAuthorized";
import Footer from "page/Home/Footer2";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
import { functions } from "constant";

export default function SolicitudProcesadaHojasAfiliacion() { 
/********** VARIABLES **********/   
    const [controller] = useState('solicitudHojasAfiliacion'),
        [tableOptions] = useState({ pageSize: 20, pageSizeOptions: [20, 30, 40, 50, 100], toolbar: true, paging: true,  filtering: true, actionsColumnIndex: -1 }),
        [messageSpinner, setMessageSpinner] = useState('Cargando...'),
        [authorized, setAuthorized] = useState(true),
        [loading, setLoading] = useState(false),
        [data, setData] = useState([]),
        [headerTitle] = useState([
            { title: "No. de solicitud", field: "id", cellStyle: { width: "100px" } },
            { title: "Rangos", field: "rangoHojasAutorizadoParseado" },
            { title: "Hojas solicitadas", field: "cantidadDeHojas" },
            { title: "Nombre solicitante", field: "usuarioOp.nombreAfiliado" },
            { title: "Fecha y hora de solicitud", field: "fechaCreacionSolicitudParseada" },
            { title: "Fecha y hora de resolución", field: "fechaResolucionSolicitudParseada" },
            { title: "Estado", field: "estado", filtering: false,
                render: (rowData) => (
                    <div style={{ minWidth: "200px" }}>
                        {rowData.esProcesado === 1 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircleOutline style={{ color: "#52be80" }} />{" "} SOLICITUD ACEPTADA
                            </div>
                        ) : (
                            <div>
                                <Icon style={{ color: "#5dade2" }}>timer</Icon>SOLICITUD EN PROCESO
                            </div>
                        )}
                    </div>
                ),
            },
            { title: 'Documentos', field: 'archivo', filtering: false,
                render: rowData =>
                    <div style={{ minWidth: '200px' }}>
                        <Tooltip title="Oficio de Solicitud">
                            <IconButton size="small" color="primary"
                                onClick={() => downloadPDF(rowData.cve, 'oficio', ("Oficio de la Solicitud No " + rowData.id + " Con " + rowData.cantidadDeHojas + " Hojas"))}>
                                <img alt="dowload" style={{ height: 40, width: 40 }} src="/assets/constancia_dowload.svg" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Constancia de Solicitud">
                            <IconButton size="small" color="primary"
                                onClick={() => downloadPDF(rowData.cve, 'constancia', ("Constancia Solicitud No " + rowData.id + " Con " + rowData.cantidadDeHojas + " Hojas"))}>
                                <img alt="dowload" style={{ height: 40, width: 40 }} src="/assets/constancia_dowload.svg" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Hojas Procesadas">
                            <IconButton size="small" color="primary"
                                onClick={() => downloadPDF(rowData.cve, 'solicitud', ("Documento No " + rowData.id + " Con " + rowData.cantidadDeHojas + " Hojas"))}>
                                <img alt="dowload" style={{ height: 40, width: 40 }} src="/assets/document_download.svg" />
                            </IconButton>
                        </Tooltip>
                    </div>
            }
        ]);

/********** FUNCTIONS **********/
    useEffect(() => {
        showList()
    }, [])

    /*  Este método lista la información de las solicitudes de hojas de afiliación en status 3,
        se ejecuta en el useEffect y en el "refreshList"   */
    const showList = async () => {
        try {
            setLoading(true)
            setMessageSpinner('Cargando...');
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "list");
            if (hasPermission.error) {
                setAuthorized(false);
                setLoading(false);
            } else {
                ApiServices[controller].orderCriteria.clear();
                ApiServices[controller].orderCriteria.addDesc("fechaCreacionSolicitud");
                ApiServices[controller].searchCriteria.clear();
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("idEstadoSolicitud", 3);

                let response = await ApiServices[controller].listFilter();
                let data = [];
                if (response.error !== null) Alert.error(response.error.message);
                else if (response.data !== "") data = response.data.ultimaSolicitud.data;
                setAuthorized(true);
                setLoading(false);
                setData(data);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /*  El método genera la descarga de los documentos pdf de las hojas y los demas documentos */
    const downloadPDF = async (CVE, ruta, name) => {
        try {
            setMessageSpinner('Generando Documento...')
            setLoading(true);
            let response = await ApiServices[controller].openFile(CVE, ruta);
            if (response.error != null) Alert.error("Intente de nuevo");
            else {
                functions.downloadPDFFromStringBase64(response.data.base64, name);
                setLoading(false);
                setMessageSpinner('');
            }
        } catch (error) {
            Alert.error("Error al descargar PDF, Intente de Nuevo");
        }
    }

/********** RENDER **********/
    if (!authorized && !loading) { return <NotAuthorized />; }

    return (
        <div>
            {loading && <LoadingSpinner message={messageSpinner} open={loading}></LoadingSpinner>}
            <Table  title={"Listado de solicitudes"} header={headerTitle} data={data} refreshList={showList} options={tableOptions} />
            <Footer />
        </div>
    );
}