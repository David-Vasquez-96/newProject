import React from "react";
import { Icon, Grid } from "@material-ui/core/";
import { Check } from "@material-ui/icons";
/********** STYLES **********/
import { useStyles } from "./style";

export default function CodeDescription() {
/********** VARIABLES **********/
  const classes = useStyles();

  /********** RENDER **********/
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <p className={classes.titleTag}>
            <b>Descripción del Estado de la Solicitud</b>
          </p>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemDescription}>
            <Check style={{ color: "#008104" }} />
            <p className={classes.itemDescriptionText}>
              <b>Solicitud Aceptada: </b> La Solicitud fue autorizada y firmada puede proceder a descargar los documentos.
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemDescription}>
            <Icon style={{ color: "#57C48F" }}>timer</Icon>{" "}
            <p className={classes.itemDescriptionText}>
              <b>Solicitud Autorizada: </b> La solicitud fue autorizada por el Registrador, está pendiente de Firma.
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemDescription}>
            <Icon style={{ color: "#57C48F" }}>timer</Icon>{" "}
            <p className={classes.itemDescriptionText}>
              <b>Solicitud En Proceso: </b> La solicitud está en proceso de ser atendida por el personal de la Dirección del Registro de Ciudadanos.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}