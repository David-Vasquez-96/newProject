import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
/********** COMPONENTS **********/
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
      [tableOptions] = useState(
        { pageSize: 10, pageSizeOptions: [10, 20], toolbar: true, paging: true, search: false, actionsColumnIndex: -1 }
      ),
      [tableHeader] = useState([
        { title: "No. de línea", field: "noLinea", cellStyle: { width: "200px", height: "40px" } },
        { title: "Código Único de Identificación", field: "cui" },
        { title: "Fecha de afiliación", field: "fechaAfiliacionSimple" },
        { title: 'Primer nombre', field: 'primerNombre' },
        { title: 'Segundo nombre', field: 'segundoNombre' },
        { title: 'Primer apellido', field: 'primerApellido' },
        { title: 'Segundo apellido', field: 'segundoApellido' },]);

/********** FUNCTIONS **********/
    useEffect(() => {
      let newData = props.data;
      newData.sort((a, b) => a.noLinea > b.noLinea ? 1 : -1);
      setData(newData);
    }, [props.data]);

    /*  Este método cierra el modal de Detalle de paquete, se ejecuta desde el botón "Cerrar" o al presionar
        fuera del modal */
    const closeModal = () => {
      props.handCloseModal();
    }

/********** RENDER **********/
    return (
      <div>
        <Dialog open={props.open} maxWidth={"xl"} fullWidth={true} fullScreen={true} TransitionComponent={Transition}
          keepMounted onClose={closeModal} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
          <Title title={"Detalle de registros en la hoja " + props.correlativo} />
          <div className={classes.root}>
            <div className={classes.colorComponente}>
              <Grid container>
                <Grid item xs={12} container direction="row" justify="center" alignItems="center" className={classes.formTitle}>
                  <Typography component="span" variant="body1" color="textPrimary">
                    <br />
                    <strong>Si desea modificar algún registro, remueva la hoja del paquete primero y modifique su información desde la pestaña "Ingresar Afiliados".</strong>
                    <br /><br /><br />
                  </Typography>
                </Grid>
                <Grid className={classes.AlignTable} item xs={12}>
                  <Table title={"Listado de ciudadanos"} header={tableHeader} data={data} goBack={closeModal} options={tableOptions} />
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