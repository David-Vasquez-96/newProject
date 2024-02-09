import React from 'react';
import {Container, Grid, Typography, Button, Icon} from '@material-ui/core/';
import { useStyles } from "./style";
import Title from 'component/TitleWithIcon';
import { NavigateBefore} from '@material-ui/icons/';
import BotonElement from 'component/BotonCancelar'; 
import { useHistory } from "react-router-dom";

export default function MensajeConfirmacionCambioContraseña() {
    const classes = useStyles();
    let history = useHistory();

    const RegresarInicio = () =>{
        history.push("/",{})
    }

    return (
        <div className={classes.containerPrincipal}>
            <Container maxWidth="md" className={classes.colorComponente}>
                <Title title="Contraseña actualizada correctamente" icon="/assets/cambiarContraseña.png"/> <br/>
                <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}>
                    Su contraseña se ha cambiado correctamente. Deberá utilizarla la próxima vez que inicie sesión en el sistema.
                </Typography>
                <Typography component="span" variant="body2" color="textPrimary" className={classes.title}> <strong>Seguridad</strong></Typography>
                <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}>
                    Cuide su cuenta de usuario. No comparta su contraseña con otras personas. Si realizan operaciones en el sistema con su cuenta
                    usted deberá responder por las mismas. Cambie su contraseña todas las veces que lo considere necesario.
                </Typography>
                <Button className={classes.button} startIcon={<NavigateBefore />} variant="outlined" color='primary' onClick={RegresarInicio}>Regresar a inicio</Button>
            </Container>
        </div>
    );
}