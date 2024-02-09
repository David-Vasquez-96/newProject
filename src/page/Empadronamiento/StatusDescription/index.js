import React from "react";
import { CheckCircleOutline } from "@material-ui/icons";
import { Icon } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Refresh, Add, Check } from "@material-ui/icons";

import { useStyles } from "./style";

export default function CodeDescription(props) {
  const classes = useStyles();

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
              <b>Solicitud Aceptada: </b> Se ha completado exitosamente la
              solicitud. El ciudadano ha sido empadronado o actualizado, y la
              constancia puede descargarse en la columna de "Archivo"-
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemDescription}>
            <Icon style={{ color: "#FA0000" }}>close</Icon>{" "}
            <p className={classes.itemDescriptionText}>
              <b>Solicitud Rechazada: </b>Se identificó un inconveniente con la
              solicitud. Se describe la razón en la sección de "Motivo de
              Rechazo".
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.itemDescription}>
            <Icon style={{ color: "#57C48F" }}>timer</Icon>{" "}
            <p className={classes.itemDescriptionText}>
              <b>Solicitud En Proceso: </b> La solicitud está en proceso de ser
              atendida por un empadronador del Tribunal Supremo Electoral.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
