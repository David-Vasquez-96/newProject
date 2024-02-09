import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton, Tooltip } from "@material-ui/core/";
import { Folder, Description, RemoveCircle } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Alert from "react-s-alert";
/********** COMPONENTS **********/
import ConfirmationElement from 'component/ConfirmationElement';
import LoadingSpinner from "component/LoadingSpinner";
import AlertElement from 'component/AlertElement';
import FoilDetail from "../FoilDetail";
import Title from "component/Title";
import Table from "component/Table";
/********** SERVICES **********/
import ApiServices from "service/ApiServices";
/********** STYLES **********/
import { useStyles } from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
/********** VARIABLES **********/
  const classes = useStyles();
  const [controller] = useState('hojasAfiliacionYAdhesion'),
  [elementAlertModal, setElementAlertModal] = useState({ titleAlert: '', typeAlert: '' }),
  [openDetailFoilModal, setOpenDetailFoilModal] = useState(false),
  [openDeleteModal, setOpenDeleteModal] = useState(false),
  [openAlertModal, setOpenAlertModal] = useState(false),
  [dataCorrelativo, setDataCorrelativo] = useState([]),
  [dataDetailFoil, setDataDetailFoil] = useState([]),
  [idPackage, setIdPackage] = useState(''),
  [loading, setLoading] = useState(false),
  [idFoil, setIdFoil] = useState(''),
  [title, setTitle] = useState(''),
    [data, setData] = useState([]),
    [tableHeader] = useState([
      { title: "Identificador del paquete", field: "idPaquete", cellStyle: { width: "100px", height: '50px' } },
      { title: "Correlativo de hoja", field: "correlativoHoja", cellStyle: { width: "150px", height: "50px" } },
      { title: "Afiliados ingresados", field: "totalAfiliados" },
      { title: "Estado", field: "estado",
        render: (rowData) => (
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Folder style={{ color: "#5dade2" }} /> EN PAQUETE
            </div>
          </div>
        )
      },
      { title: "Acciones", field: "acciones",
        render: (rowData) => (
          <div className={classes.actionContainer} style={{ minWidth: "200px" }}>
            <div className={classes.iconButtonContainer}>
              <Tooltip title='Detalle de hoja' onClick={() => handleOpenDetailFoil(rowData)} >
                <IconButton className={classes.iconStyles} size="small" color="primary">
                  <Description />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.iconButtonContainer}>
              <Tooltip title='Remover' onClick={() => handleOpenDeleteModal(rowData.id, rowData.idDetallePaquete)} >
                <IconButton className={classes.iconStyles} size="small" color="secondary">
                  <RemoveCircle />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )
      }
    ]);

/********** FUNCTIONS **********/
  useEffect(() => {
    let newData = [];
    let namePackage = props.infoPackage.nombrePaquete ? " - " + props.infoPackage.nombrePaquete : "";
    setTitle(props.infoPackage.id + namePackage)
    for (let value of props.data) {
      newData.push({
        ...value.hojasDeAfiliacion,
        totalAfiliados: value.hojasDeAfiliacion.detalleHoja.length + ' / 5',
        idPaquete: value.idPaquete, idDetallePaquete: value.id
      });
    }
    setData(newData);
  }, [props.data]);


  /*  El método despliega el modal "FoilDetail" se ejecuta desde el botón "Detalle de hoja" de cada fila de la hoja en la tabla */
  const handleOpenDetailFoil = (rowData) => {
    setDataCorrelativo(rowData.correlativoHoja)
    setDataDetailFoil(rowData.detalleHoja)
    setOpenDetailFoilModal(true);
  }

  /*  Este método cierra el modal "FoilDetail", se ejecuta desde el botón  "Cerrar" de este mismo modal */
  const handleCloseDetailFoil = () => {
    setOpenDetailFoilModal(false);
  }

  /*  Este método nos despliega el "ConfirmationElement" para confirmar que se removera una hoja del paquete, se ejecuta desde
      el botón "Remover" */
  const handleOpenDeleteModal = (idHoja, idPaquete) => {
    setIdFoil(idHoja);
    setIdPackage(idPaquete);
    setOpenDeleteModal(true);
  }

  /*  El método cierra el "ConfirmationElement", se ejecuta desde el botón "Cancelar" de este mismo modal */
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  }

  /*  El método elimina la hoja que hayamos elegido, se ejecuta desde el "ConfirmationElement" en el botón
      "Confirmar", si todo se ejecuta correctamente cierra el modal para actualizar la información */
  const removeFoilPackage = async () => {
    setLoading(true);
    try {
      handleCloseDeleteModal()
      let response = await ApiServices[controller].eliminarHojadePaquete(idPackage, idFoil);
      if (response.error !== null) {
        setOpenAlertModal(true);
        setElementAlertModal({ titleAlert: response.error.message, typeAlert: 'error' });
      } else {
        setOpenAlertModal(true);
        setElementAlertModal({ titleAlert: 'HOJA REMOVIDA DEL PAQUETE', typeAlert: 'success' });
        closeModal();
        props.showList();
      }
      setLoading(false);
    } catch (exception) {
      exception.status === 404 ? Alert.warning("Intente de nuevo") : Alert.warning("Intente de nuevo ");
      setLoading(false);
    }
  }

  /* Este método cierra el modal "AlertElement" de mensajes de alerta */
  const handleCloseAlertModal = () => {
    setOpenAlertModal(false)
  }  

  /*  Este método cierra el modal actual, se ejecuta desde el bóton "Cerrar" o al presionar fuera del modal */
  const closeModal = () => {
    props.handCloseModal();
  }

/********** RENDER **********/
  return (
    <div>
      <Dialog open={props.open} maxWidth={"xl"} fullWidth={true} fullScreen={true} TransitionComponent={Transition}
        keepMounted onClose={closeModal} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        {loading && <LoadingSpinner open={loading}></LoadingSpinner>}
        {openDetailFoilModal && <FoilDetail open={openDetailFoilModal} handCloseModal={handleCloseDetailFoil} data={dataDetailFoil} correlativo={dataCorrelativo} />}
        {openDeleteModal && <ConfirmationElement open={openDeleteModal} handleClose={handleCloseDeleteModal} handleConfirm={removeFoilPackage}
          titleModal='¿Quiere remover la hoja del paquete?' subtitleModal={'Esta acción no eliminará la hoja y su información, podrá encontrarla en la pestaña "Crear Paquete".'} />}
        <Title title={"Detalle de las hojas en el paquete " + title} />
        <div className={classes.root}>
          <div className={classes.colorComponente}>
            <Grid container>
              <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.formTitle}>
                <Typography component="span" variant="body1" color="textPrimary">
                  <br />
                  <strong>Si desea remover una hoja del paquete de click en el botón "Remover". La hoja no será eliminada, podrá encontrarla
                    en la pestaña "Crear Paquete"</strong>
                  <br /><br /><br />
                </Typography>
              </Grid>
              <Grid className={classes.AlignTable} item xs={12}>
                <Table title={"Listado de hojas"} header={tableHeader} data={data} goBack={closeModal} />
              </Grid>
            </Grid>
            <br />
            <div className={classes.lineaDegradadaBottom}></div>
          </div>
          <br />
        </div>
        <AlertElement typeAlert={elementAlertModal.typeAlert} openModal={openAlertModal} title={elementAlertModal.titleAlert} handCloseModal={handleCloseAlertModal} />
      </Dialog>
    </div>
  );
}