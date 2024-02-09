import React, { useEffect, useState } from "react";
import { Timer, Description, Send, Delete, Edit } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core/";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import ConfirmationElement from 'component/ConfirmationElement';
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import PackageDetail from "./PackageDetail";
import EditPackage from './EditPackage';
import Footer from "page/Home/Footer2";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
/********** STYLES **********/
import { useStyles } from './style';

export default function PaquetesCreados() {
/********** VARIABLES **********/
    const classes = useStyles();
    const [controller] = useState('paquetesDeAfiliacionYAdhesion'),
        [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
        [openDetailPackage, setOpenDetailPackage] = useState(false),
        [openDeletePackage, setOpenDeletePackage] = useState(false),
        [openEditPackage, setOpenEditPackage] = useState(false),
        [openSendPackage, setOpenSendPackage] = useState(false),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [detailPackage, setDetailPackage] = useState([]),
        [infoPackage, setInfoPackage] = useState([]),
        [authorized, setAuthorized] = useState(true),
        [idPackage, setIdPackage] = useState(''),
        [loading, setLoading] = useState(false),
        [data, setData] = useState([]),
        [tableOptions] = useState(
            { pageSize: 20, pageSizeOptions: [20, 30, 50, 75, 100], toolbar: true, paging: true, filtering: true, search: true, actionsColumnIndex: -1 }
        ),
        [tableHeader] = useState([
            { title: "Identificador del paquete", field: "id", cellStyle: { height: '50px' } },
            { title: "Nombre del paquete", field: "nombrePaquete" },
            { title: "Hojas en el paquete", field: "hojasPaquete" },
            { title: "Fecha de creacion", field: "fechaYHoraCreacionParseada" },
            { title: "Estado", field: "estado", filtering: false,
                render: (rowData) => (
                    <div style={{ minWidth: "100px" }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Timer style={{ color: "#5dade2" }} /> EN PROCESO
                        </div>
                    </div>
                )
            },
            { title: "Acciones", field: "acciones", filtering: false,
                render: (rowData) => (
                    <div className={classes.actionContainer} style={{ minWidth: "200px" }}>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Detalle Paquete' onClick={() => showDetailPackageModal(rowData.detallePaquete, rowData)} >
                                <IconButton className={classes.iconStyles} size="small" color="primary">
                                    <Description />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Editar Nombre' onClick={() => handleOpenEditPackage(rowData.id)} >
                                <IconButton className={classes.iconStyles} size="small" color="primary">
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </div>                        
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Enviar' onClick={() => handleOpenSendModal(rowData, rowData.id)} >
                                <IconButton className={classes.iconStyles} size="small" color="primary">
                                    <Send />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Eliminar' onClick={() => handleOpenDeleteModal(rowData, rowData.id)} >
                                <IconButton className={classes.iconStyles} size="small" color="secondary">
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )
            }
        ]);

/********** COMPONENTS **********/
    useEffect(() => {
        showList();
    }, []);
    
    /*  Este método lista la información de los paquetes en estado 0 - Disponible y que sean de faseOP 3 - Partido Politico
        se ejecuta en el useEffect y en el "refreshList"   */
    const showList = async () => {
        setLoading(true);
        try {
            const hasPermission = await ApiServices.userSecurity.hasPermission(controller, "list");
            if (hasPermission.error) {
                setAuthorized(false);
                setLoading(false);
            } else {
                ApiServices[controller].searchCriteria.clear();
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("estado", 0);
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
                    /*  Se agrega la cantidad de hojas que tiene el paquete */
                    for (let value of data) {
                        value.hojasPaquete = value.detallePaquete.length;
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
        "Detalle" en la fila de cada paquete de la tabla */
    const showDetailPackageModal = (rowData, data) => {
        setOpenDetailPackage(true);
        setDetailPackage(rowData);
        setInfoPackage(data);
    }
    
    /*  El método cierra el modal "PackageDetail" se ejecuta desde el mismo componente en el botón "Cancelar" */
    const closeDetailPackageModal = () => {
        setOpenDetailPackage(false);
    }

    /*  Este método despliega el modal "EditPackage" que tiene el formulario para cambiar el nombre que tiene el paquete, se ejecuta desde
        el botón de "Editar nombre" en la fila de cada paquete de la tabla */
    const handleOpenEditPackage = (rowId) => {
        setIdPackage(rowId);
        setOpenEditPackage(true);
    }

    /*  Este método muestra la alerta indicando que el nombre del paquete fue actualizado correctamente, se ejectua desde el componente
        "EditPackage" */
    const editPackageSuccess = () => {
        setOpenAlertModal(true);
        setElementAlertModal({ titleAlert: 'NOMBRE DE PAQUETE ACTUALIZADO', typeAlert: 'success' });
    }  

    /*  Este método cierra el modal "EditPackage" para editar el nombre del paquete, se ejecuta desde este componente */
    const cancelEditPackage = () => {
        setOpenEditPackage(false)
    }

    /*  El método abre el modal "ConfirmationElement" que se usa para el envío del paquete, valida que el paquete no se encuentre vacío,
        se ejecuta desde el botón "Enviar" en cada fila de los paquetes de la tabla */
    const handleOpenSendModal = (rowData, rowId) => {
        if (rowData.detallePaquete.length === 0) {
            setOpenAlertModal(true);
            setElementAlertModal({ titleAlert: 'El paquete está vacío, agregue hojas primero.', typeAlert: 'error' });
        } else {
            setIdPackage(rowId);
            setOpenSendPackage(true)
        }
    }

    /*  El método cierra el modal "ConfirmationElement" que se usa para el envío del paquete, se ejecuta en el método "sendPackage" y
        desde el modal cuando presionan el botón "Cancelar" */
    const closeSendModal = () => {
        setOpenSendPackage(false);
    }
   
    /*  Este método realiza el envío del paquete cambiando el estado del paquete que se haya seleccionado, se ejecuta desde 
        el botón "Confirmar" en el modal "ConfirmationElement" que se usa para el envío del paquete, si se ejecuta correctamente
        actualiza toda la información de la tabla. */
    const sendPackage = async () => {
        setLoading(true);
        try {
            closeSendModal()
            let response = await ApiServices.paquetesDeAfiliacionYAdhesion.enviarPaquete(idPackage);
            if (response.error !== null) {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
            } else {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: 'Paquete enviado correctamente', typeAlert: 'success' });
                showList();
            }
            setLoading(false);
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /*  El método muestra el modal "ConfirmationElement" que se usa para eliminar el paquete, si el paquete contiene hojas
        no permite mostrar el modal, se ejecuta desde el botón "Eliminar" de cada fila de paquetes en la tabla */
    const handleOpenDeleteModal = (rowData, rowId) => {
        if (rowData.detallePaquete.length > 0) {
            setOpenAlertModal(true);
            setElementAlertModal({ titleAlert: 'No puede eliminar un paquete con hojas, remueva las hojas primero.', typeAlert: 'error' });
        } else {
            setIdPackage(rowId);
            setOpenDeletePackage(true)
        }
    }

    /*  El método cierra el modal "ConfirmationElement" que se usa para eliminar el paquete, se ejecuta en el método "deletePackage" y
        desde el modal cuando presionan el botón "Cancelar" */
    const closeDeleteModal = () => {
        setOpenDeletePackage(false);
    }

    /*  Este método elimina el paquete, se ejecuta desde el botón "Confirmar" en el modal "ConfirmationElement" que se usa para eliminar 
        el paquete, si se ejecuta correctamente actualiza toda la información de la tabla. */
    const deletePackage = async () => {
        setLoading(true);
        try {
            closeDeleteModal();
            let response = await ApiServices.paquetesDeAfiliacionYAdhesion.eliminarPaquete(idPackage);
            if (response.error !== null) {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
            } else {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: 'Paquete eliminado', typeAlert: 'success' });
                showList();
            }
            setLoading(false);
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
            {loading && <LoadingSpinner open={loading}></LoadingSpinner>}
            {openAlertModal && <AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handCloseAlertModal} />}
            {openDetailPackage && <PackageDetail open={openDetailPackage} handCloseModal={closeDetailPackageModal} data={detailPackage} infoPackage={infoPackage} showList={showList} />}
            {openEditPackage && <EditPackage open={openEditPackage} handleClose={cancelEditPackage} reloadList={showList} requestSuccess={editPackageSuccess} idPackage={idPackage} />}
            {openSendPackage && <ConfirmationElement open={openSendPackage} handleClose={closeSendModal} handleConfirm={sendPackage}
                titleModal='¿Quiere enviar el paquete para su depuración?' subtitleModal={'Al enviar el paquete no podrá modificar su información.'} />}
            {openDeletePackage && <ConfirmationElement open={openDeletePackage} handleClose={closeDeleteModal} handleConfirm={deletePackage}
                titleModal={'¿Quiere eliminar el paquete ' + idPackage + '?'} />}
            <Table title={"Listado de paquetes"} header={tableHeader} data={data} options={tableOptions} refreshList={showList} />
            <Footer />
        </div>
    );
}