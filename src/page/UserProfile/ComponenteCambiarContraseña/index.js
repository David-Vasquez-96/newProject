import React from 'react';
import FormularioVerificarIdentidad from '../VerificarIdentidad'
import BotonOlvidarContraseña from '../BotonOlvidarContraseña'
import { useStyles } from "./style";

function ComponenteCambiarContraseña (props) {
    const classes = useStyles();

    return (
        <div className={classes.containerProfile}>
            <div className={classes.title}>Cambiar contraseña</div>
            <strong> <h3>Debes verificar tu identidad para poder continuar, por favor ingrese su contraseña actual.</h3> </strong>
            <FormularioVerificarIdentidad />
            <BotonOlvidarContraseña />
        </div>
    )
}
export default ComponenteCambiarContraseña;