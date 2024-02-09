import React from "react";
import { useStyles } from "./style";
import { Container, Grid, Typography } from "@material-ui/core/";

// Desde y Hasta Imports
function TextoDescriptivoCitas(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <br />
                <Container className={classes.colorComponente}>
                        <Grid className={classes.formTitle}>
                            <Typography component="span" variant="body1" color="textPrimary">
            Este formulario le permitirá agendar una cita para generar su empadronamiento o actualización de datos mediante la atención de un operador del Tribunal Supremo Electoral de la República de Guatemala, para lo cual deberá: <br/><br/>
1.	Seleccionar si se encuentra en Guatemala (nacional) o en el extranjero.<br/><br/>
2.	Escribir su número de documento de identificación, nombre y apellido, número telefónico y dirección de correo electrónico para recibir la confirmación de su solicitud. En el caso de ciudadanos guatemaltecos residentes en el extranjero, deberán seleccionar el país en el que residen, el estado y la zona horaria que aplique a su ubicación o a la más cercana, con el objeto de poder agendar su cita en horarios de atención hábil. <br/><br/>
3.	Seleccionar la fecha en la que desea agendar la cita, y la hora de su preferencia, dentro del listado de horarios que le aparecerá disponible en la fecha que seleccionó.  <br/><br/>
4.	Al crear su cita, el operador del TSE la procesará y le llegará una confirmación al correo electrónico que registró, por lo que deberá revisar que el mismo esté bien consignado. <br/><br/>
                            </Typography>
                        </Grid>
                    <br />
                </Container>
                <br />
            </div>
        </React.Fragment>
    );
}

export default (TextoDescriptivoCitas);
