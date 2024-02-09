import React from 'react';
import { CheckCircleOutline } from "@material-ui/icons";
import { Icon } from "@material-ui/core/";

import { useStyles } from './style';


export default function CodeDescription(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p className={classes.titleTag}><b>Claves para el Estado de la solicitud</b></p>
            <div className={classes.itemsContainer}>
                <div className={classes.itemDescription}>
                    <CheckCircleOutline style={{ color: "#52be80" }} />
                    <p><b>Solicitud Aceptada: </b> Solicitud aprobada. Un miembro de la Organización Política puede presentarse a recibir las hojas solicitadas en Registro de Ciudadanos.  </p>
                </div>
                <div className={classes.itemDescription}>
                    <Icon style={{ color: "#5dade2" }}>timer</Icon>
                    <p><b>Solicitud En Proceso: </b> Solicitud en revision por el personal de Registro de Ciudadanos.  </p>
                </div>
            </div>
        </div>
    );
}