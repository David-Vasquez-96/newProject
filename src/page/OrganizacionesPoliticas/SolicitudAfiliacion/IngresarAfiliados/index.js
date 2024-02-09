import React, { useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core/";
import { Edit, Delete } from '@material-ui/icons/';
import Footer from "page/Home/Footer2";
import NewModal from "./NewModal";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import ConfirmationElement from 'component/ConfirmationElement';
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import CardInput from "./CardInput";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
/********** STYLES **********/
import { useStyles } from './style';

export default function SolicitudNuevaAfiliacion() {
    /********** VARIABLES **********/
    const classes = useStyles();
    const [controllerDetalle] = useState('detalleHojaAfiliacionAdhesion'),
        [controllerHojas] = useState('hojasAfiliacionYAdhesion'),        
        [disableAddRequest, setDisableAddRequest] = useState(true),
        [openDeleteModal, setOpenDeleteModal] = useState(false),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [openNewModal, setOpenNewModal] = useState(false),
        [correlativo, setCorrelativo] = useState(''),
        [idDeleteRow, setIdDeleteRow] = useState(''),
        [updateData, setUpdateData] = useState(null),
        [authorized, setAuthorized] = useState(true),
        [loading, setLoading] = useState(false),
        [noLinea, setNoLinea] = useState(''),
        [data, setData] = useState([]),
        [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
        [tableOptions] = useState({ pageSize: 10, pageSizeOptions: [10], toolbar: true, paging: true, search: false, actionsColumnIndex: -1 }),
        [titleHeader] = useState([
            { title: "No. de línea", field: "noLinea", cellStyle: { width: "200px", height: "40px" } },
            { title: "Código Único de Identificación", field: "cui" },
            { title: "Fecha de afiliación", field: "fechaAfiliacionSimple" },
            { title: 'Primer nombre', field: 'primerNombre' },
            { title: 'Segundo nombre', field: 'segundoNombre' },
            { title: 'Primer apellido', field: 'primerApellido' },
            { title: 'Segundo apellido', field: 'segundoApellido' },
            {
                title: "Acciones", field: "acciones",
                render: (rowData) => (
                    <div className={classes.actionContainer} style={{ minWidth: "200px" }}>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Editar' onClick={() => updateDataAffiliate(rowData)} >
                                <IconButton className={classes.iconStyles} size="small" color="primary">
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={classes.iconButtonContainer}>
                            <Tooltip title='Eliminar' onClick={() => handleOpenDeleteModal(rowData.id, rowData.noLinea)} >
                                <IconButton className={classes.iconStyles} size="small" color="secondary">
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                )
            }
        ]);

    /********** FUNCTIONS **********/
    /*  El metodo verifica que el correlativo de la hoja ingresado sea valido, se ejecuta al presionar el botón "Buscar Hoja"  
        y al cerrar el modal de "Agregar Ciudadano" */
    const validateFoil = async () => {
        try {
            setLoading(true);
            const hasPermission = await ApiServices.userSecurity.hasPermission(controllerHojas, "list");
            if (hasPermission.error) {
                setAuthorized(false);
                setLoading(false);
            } else {
                let newData = [];
                let response = await ApiServices[controllerHojas].consultarHoja(correlativo);
                if (response.error !== null) {
                    setOpenAlertModal(true);
                    setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
                }
                else if (response.data !== "") {
                    newData = response.data
                    setData([]);
                    if (response.data.estadoHojaAfiliacion.descripcion === "DISPONIBLE") {
                        setDisableAddRequest(false);
                        Alert.success('HOJA VALIDA, PUEDE AGREGAR AFILIADOS');
                    } else if (response.data.estadoHojaAfiliacion.descripcion === "DIGITADA") {
                        newData = response.data.detalleHoja;
                        newData.sort((a, b) => a.noLinea > b.noLinea ? 1 : -1);
                        setDisableAddRequest(false);
                        Alert.success('HOJA VALIDA, REVISE LA INFORMACIÓN');
                        setData(newData);
                    } else if (response.data.estadoHojaAfiliacion.descripcion === "EN PAQUETE") {
                        setOpenAlertModal(true);
                        setElementAlertModal({ titleAlert: 'LA HOJA YA ESTA AGREGADA A UN PAQUETE', typeAlert: 'warning' });
                    } else if (response.data.estadoHojaAfiliacion.descripcion === "ENVIADA") {
                        setOpenAlertModal(true);
                        setElementAlertModal({ titleAlert: 'LA HOJA YA FUE ENVIADA PARA REVISION', typeAlert: 'warning' });
                    }
                }
                setAuthorized(true);
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /*  El método elimina un ciudadano de la hoja, se ejecuta por el boton  "Confirmar" en el "ConfirmationElement" */
    const deleteAffiliate = async () => {
        setLoading(true);
        try {
            handleCloseDeleteModal()
            let response = await ApiServices[controllerDetalle].eliminarAfiliado(idDeleteRow);
            if (response.error !== null) {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
            } else {
                setOpenAlertModal(true);
                setIdDeleteRow('');
                setElementAlertModal({ titleAlert: 'REGISTRO ELIMINADO', typeAlert: 'success' });
                /* Si el ciudadano fue eliminado correctamente, recarga la tabla con la información actualizada */
                validateFoil();
            }
            setLoading(false);
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /* El método despliega el modal "newModal" con el formulario para ingresar la información de los ciudadanos en la hoja, 
       se ejecuta con el botón "Agregar Ciudadano" */
    const addNewAffiliate = () => {
        setUpdateData(null)
        setOpenNewModal(true);
    }

    /*  El método despliega el modal "newModal" con el formulario lleno con la información del ciudadano que queremos actualizar,
        se ejecuta con el botón "Editar" en cada fila de los ciudadanos en la tabla */
    const updateDataAffiliate = (updateDataRow) => {
        setUpdateData(updateDataRow);
        setOpenNewModal(true);
    }

    /*  El método cierra el modal "newModal" y envia null a la variable que contiene la información para actualizar al ciudadano,
        se ejecuta desde el botón "Cerrar" en el "newModal"  */
    const cancelAffiliate = () => {
        setUpdateData(null);
        setOpenNewModal(false);
    }

    /*  El método cierra el "AlertElement" que muestra los modales de alertas, se ejecuta desde el "AlertElement" */
    const handCloseModal = () => {
        setOpenAlertModal(false)
    }

    /*  El método limpia la información del input de correlativo, desactiva el boton de "Agregar ciudadano" y limpia la tabla,
        se ejecuta desde el botón limpiar datos */
    const clearAllRegister = () => {
        setCorrelativo('');
        setDisableAddRequest(true);
        setData([])
    }

    /*  El método cierra el modal "ConfirmationElement" que se encarga de confirmar la eliminación de un ciudadano en la hoja */
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    /*  El metodo despliega el modal "ConfirmationElement" que sirve para eliminar al ciudadano de la hoja, se ejecuta
        desde el botón "Eliminar" en la fila del ciudadano en la tabla */
    const handleOpenDeleteModal = (id, linea) => {
        setNoLinea(linea)
        setOpenDeleteModal(true);
        setIdDeleteRow(id);
    }

    /********** RENDER **********/
    if (!authorized && !loading) {
        return <NotAuthorized />;
    }
    return (
        <div>
            <br />
            {loading && <LoadingSpinner open={loading}></LoadingSpinner>}
            {openDeleteModal && <ConfirmationElement open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={deleteAffiliate}
                titleModal='Eliminar afiliado' subtitleModal={'¿Quiere eliminar la linea ' + noLinea + ' de la hoja ' + correlativo + '?'} />}
            {openAlertModal && <AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handCloseModal} />}
            {openNewModal && <NewModal open={openNewModal} updateState={validateFoil} handleClose={cancelAffiliate} controller={controllerHojas} correlativo={correlativo}
                updateData={updateData} />}
            <div>
                <CardInput valueInput={correlativo} valueChangeInput={setCorrelativo} searchButton={validateFoil} clearButton={clearAllRegister} />
                <Table title={"Listado de afiliados"} header={titleHeader} data={data} setData={setData} options={tableOptions}
                    addRegister={addNewAffiliate} addDisable={disableAddRequest} addButtonTitle='Agregar ciudadano' />
            </div>
            <Footer />
        </div>
    );
}