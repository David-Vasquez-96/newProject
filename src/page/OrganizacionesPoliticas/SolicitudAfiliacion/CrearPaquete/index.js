import React, { useEffect, useState } from "react";
import { CheckCircleOutline, Timer } from "@material-ui/icons";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import AddExistPackageModal from "./AddExistPackageModal";
import AddNewPackageModal from "./AddNewPackageModal";
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import NotAuthorized from "common/NotAuthorized";
import Footer from "page/Home/Footer2";
import Table from "component/Table";
import CardInput from "./CardInput";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";

export default function CrearPaquete() {
/********** VARIABLES **********/
    const [controller] = useState('hojasAfiliacionYAdhesion'),
        [loading, setLoading] = useState(false),
        [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
        [openPackageExist, setOpenPackageExist] = useState(false),
        [openAlertModal, setOpenAlertModal] = useState(false),
        [openNewPackage, setOpenNewPackage] = useState(false),
        [hojasSelected, setHojasSelected] = useState([]),
        [authorized, setAuthorized] = useState(true),
        [data, setData] = useState([]),
        [tableOptions] = useState(
            { pageSize: 20, pageSizeOptions: [20, 30, 50, 75, 100], selection: true, toolbar: true, paging: true, search: true, actionsColumnIndex: -1 }
        ),
        [tableHeader] = useState([
            { title: "Correlativo de hoja", field: "correlativoHoja", cellStyle: { width: "150px" } },
            { title: "Afiliados ingresados", field: "totalAfiliados" },
            { title: "Estado de la hoja", field: "estado",
                render: (rowData) => (
                    <div style={{ minWidth: "200px" }}>
                        {rowData.estadoAfiliados === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Timer style={{ color: "#5dade2" }} /> SIN COMPLETAR
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircleOutline style={{ color: "#52be80" }} />{" "} HOJA COMPLETA
                            </div>
                        )}
                    </div>
                )
            }
        ]);

/********** FUNCTIONS **********/
    useEffect(() => {
        showList();
    }, []);

    /*  Este método lista la información de todas las hojas en estado 2 - Digitadas y que sean de faseOP 3 - Partido Politico
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
                ApiServices[controller].searchCriteria.addEquals("estado", 2);
                ApiServices[controller].searchCriteria.setOperator("and");
                ApiServices[controller].searchCriteria.addEquals("faseOP", 3);
                ApiServices[controller].orderCriteria.clear();
                ApiServices[controller].orderCriteria.addAsc("correlativoHoja");

                let response = await ApiServices[controller].customGET('list');
                let data = [];
                if (response.error !== null) {
                    setOpenAlertModal(true);
                    setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
                }
                else if (response.data !== "") data = response.data;
                /* Se agregan los valores de la cantidad de afiliados agregados y el estado de la hoja */
                for (let value of data) {
                    value.totalAfiliados = value.detalleHoja.length + ' / 5';
                    if (value.detalleHoja.length < 5) {
                        value.estadoAfiliados = 0
                    } else {
                        value.estadoAfiliados = 1
                    }
                }
                setData(data);
                setAuthorized(true);
                setLoading(false);
            }
        } catch (exception) {
            exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
            setLoading(false);
        }
    }

    /*  El método despliega el modal "AlertElement" que confirma que el ciudadano se agrego correctamente a un paquete existente 
        se ejecuta en el componente "AddExistPackageModal" */
    const addExistPackage = (paquete) => {
        setOpenAlertModal(true);
        setElementAlertModal({ titleAlert: 'LA(S) HOJA(S)  SE AGREGO CORRECTAMENTE AL PAQUETE ' + paquete, typeAlert: 'success' });
        setHojasSelected([]);
    }

    /*  El método despliega el modal "AddExistPackageModal" que agrega a un paquete existente las hojas que hayamos seleccionado 
        en la tabla, se ejecuta desde el botón "Añadir a un paquete existente" en el componente "CardInput" */
    const openExistPackage = () => {
        if (hojasSelected.length === 0) {
            setOpenAlertModal(true);
            setElementAlertModal({ titleAlert: 'SELECCIONE AL MENOS UNA HOJA', typeAlert: 'error' });
        } else {
            let empty = false;
            for (let value of hojasSelected) {
                if (value.detalleHoja.length === 0) {
                    empty = true;
                }
            }
            if (empty) {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: 'SELECCIÓN DE UNA O MAS HOJAS VACIAS, REMUEVA LAS HOJAS SIN CIUDADANOS', typeAlert: 'error' });
            } else {
                setOpenPackageExist(true);
            }
        }
    }

    /* Este método cierra el modal "AddExistPackageModal" se ejecuta desde el botón cancelar de este modal */
    const cancelAddExistPackage = () => {
        setOpenPackageExist(false)
    }

    /*  Este método despliega el modal "AlertElement" que confirma que el paquete fue creado exitosamente
        se ejecuta en el componente "AddNewPackageModal" */
    const addNewPackage = () => {
        setOpenAlertModal(true);
        setElementAlertModal({ titleAlert: 'PAQUETE CREADO DE FORMA CORRECTA ', typeAlert: 'success' });
        setHojasSelected([]);
    }

    /*  El método despliega el modal "AddNewPackageModal" que crea un paquete nuevo con las hojas que hayamos seleccionado 
        en la tabla, se ejecuta desde el botón "Crear Paquete Nuevo" en el componente "CardInput" */
    const handOpenNewPackage = () => {
        if (hojasSelected.length === 0) {
            setOpenAlertModal(true);
            setElementAlertModal({ titleAlert: 'SELECCIONE AL MENOS UNA HOJA', typeAlert: 'error' });
        } else {
            let empty = false;
            for (let value of hojasSelected) {
                if (value.detalleHoja.length === 0) {
                    empty = true;
                }
            }
            if (empty) {
                setOpenAlertModal(true);
                setElementAlertModal({ titleAlert: 'SELECCIÓN DE UNA O MAS HOJAS VACIAS, REMUEVA LAS HOJAS SIN AFILIADOS SELECCIONADAS', typeAlert: 'error' });
            } else {
                setOpenNewPackage(true);
            }
        }
    }

    /* Este método cierra el modal "AddNewPackageModal" se ejecuta desde el botón cancelar de este modal */
    const cancelAddNewPackage = () => {
        setOpenNewPackage(false)
    }

    /* Este método cierra el modal "AlertElement" de mensajes de alerta */
    const handCloseModal = () => {
        setOpenAlertModal(false)
    }

    /* Este método se ejecuta en el componente "Table" sirve para activar la selección de las filas en la misma */
    const onSelectRow = (rowData) => { 
        setHojasSelected(rowData); 
    }

/********** RENDER **********/
    if (!authorized && !loading) {
        return <NotAuthorized />;
    }
    
    return (
        <div>
            <br />
            {loading && <LoadingSpinner open={loading}></LoadingSpinner>}
            {openPackageExist && <AddExistPackageModal open={openPackageExist} handleClose={cancelAddExistPackage} reloadList={showList} requestSuccess={addExistPackage} dataPackage={hojasSelected} />}
            {openNewPackage && <AddNewPackageModal open={openNewPackage} handleClose={cancelAddNewPackage} reloadList={showList} requestSuccess={addNewPackage} dataPackage={hojasSelected} />}
            {openAlertModal && <AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handCloseModal} />}
            <CardInput createPackage={handOpenNewPackage} existPackage={openExistPackage} />
            <Table title={"Listado de hojas"} header={tableHeader} data={data} refreshList={showList} options={tableOptions} selectionChange={onSelectRow} />
            <Footer />
        </div>
    );}