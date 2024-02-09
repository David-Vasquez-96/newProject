import React from "react";
import { useStyles } from "./style";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function AlertDialog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.cardSideMessageLogin}>
        <CardContent style={{ paddingBottom: "0px" }}>
          <Typography className={classes.pos} color="textSecondary">
            El Portal Web TSE es una herramienta disponible las 24 horas del día, 
            creada por el Tribunal Supremo Electoral para facilitarles a los ciudadanos 
            que desde cualquier dispositivo con acceso a internet puedan realizar gestiones 
            y consultas electrónicas habilitadas para el efecto.  
            <br></br>
            Es indispensable y necesario que el ciudadano, para su seguridad y confianza, 
            solicite la creación de un usuario personal de acceso al Portal Web TSE, ya sea 
            en línea (a través de esta plataforma) o de forma presencial (a través de las 22 delegaciones departamentales y Sub-Delegaciones del TSE)*.  
            La solicitud de usuario se deberá hacer por una única vez para acceder a los servicios electrónicos en el Portal Web TSE.
            <br></br>
            <br></br>
            <small className={classes.note}>
            * Las delegaciones y subdelegaciones del TSE en todo el país continuarán prestando 
            los servicios presenciales, además de dar apoyo con relación a los servicios digitales 
            implementados por la Institución.
            </small>
        </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
