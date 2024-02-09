import React, { useState, useEffect } from "react";
import { Grid, IconButton, Tooltip, Dialog, Slide } from "@material-ui/core/";
import { Send, Description } from "@material-ui/icons";
/********** COMPONENTS **********/
import FoilDetail from "../FoilDetail";
import Title from "component/Title";
import Table from "component/Table";
/********** STYLES **********/
import { useStyles } from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
/********** VARIABLES **********/
  const classes = useStyles();
  const [data, setData] = useState([]),
  [openDetailFoilModal, setOpenDetailFoilModal] = useState(false),
    [dataCorrelativo, setDataCorrelativo] = useState([]),
    [dataDetailFoil, setDataDetailFoil] = useState([]),
    [title, setTitle] = useState(''),
    [tableHeader] = useState([
      { title: "Identificador del paquete", field: "idPaquete", cellStyle: { width: "100px", height: '50px' } },
      { title: "Correlativo de hoja", field: "correlativoHoja", cellStyle: { width: "150px", height: "50px" } },
      { title: "Adherentes ingresados", field: "totalAfiliados" },
      { title: "Estado", field: "estado",
        render: (rowData) => 
          <div style={{ minWidth: "200px" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send style={{ color: "#5dade2" }} /> ENVIADA
            </div>
          </div>        
      },
      { title: "Acciones", field: "acciones",
        render: (rowData) => 
          <div className={classes.actionContainer} style={{ minWidth: "200px" }}>
            <div className={classes.iconButtonContainer}>
              <Tooltip title='Detalle de hoja' onClick={() => handleOpenDetailFoil(rowData)} >
                <IconButton className={classes.iconStyles} size="small" color="primary">
                  <Description />
                </IconButton>
              </Tooltip>
            </div>
          </div>        
      }
    ]);

/********** FUNCTIONS **********/
  useEffect(() => {
    let newData = [];
    let namePackage = props.infoPackage.nombrePaquete ? " - " + props.infoPackage.nombrePaquete : "";
    setTitle(props.infoPackage.id + namePackage)
    for (let value of props.data) {
      newData.push(value.hojasDeAfiliacion);
    }
    for (let value of newData) {
      value.totalAfiliados = value.detalleHoja.length + ' / 5';
      value.idPaquete = props.data[0]?.idPaquete;
      value.idDetallePaquete = props.data[0]?.id;
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

  /*  Este método cierra el modal actual, se ejecuta desde el bóton "Cerrar" o al presionar fuera del modal */
  const closeModal = () => {
    props.handCloseModal();
  }

/********** RENDER **********/
  return (
    <div>
      <Dialog open={props.open} maxWidth={"xl"} fullWidth={true} fullScreen={true} TransitionComponent={Transition}
        keepMounted onClose={closeModal} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        {openDetailFoilModal && <FoilDetail open={openDetailFoilModal} handCloseModal={handleCloseDetailFoil} data={dataDetailFoil} correlativo={dataCorrelativo} />}
        <Title title={"Detalle de las hojas en el paquete " + title} />
        <div className={classes.root}>
          <div className={classes.colorComponente}>
            <Grid container>
              <Grid className={classes.AlignTable} item xs={12}>
                <Table title={"Listado de hojas"} header={tableHeader} data={data} goBack={closeModal} />
              </Grid>
            </Grid>
            <br />
            <div className={classes.lineaDegradadaBottom}></div>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
}