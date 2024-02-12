import React, { useState } from 'react';
import {useStyles} from './style';

const ComponeneteCertificaciones=(props)=> {
    const classes = useStyles(props);
    const [listaCertificaciones] = useState([
        {icon: 'assets/certificaciones/ISO90001.png',},
        {icon: 'assets/certificaciones/SelloSmart.jpg',},
        {icon: 'assets/certificaciones/ISO90001.png',},
        {icon: 'assets/certificaciones/SelloSmart.jpg',},
        {icon: 'assets/certificaciones/SelloSmart.jpg',},
    ]);    

    return (
        <div className={classes.ContainerPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Nuestras Certificaciones'}</h1>
            <div className={classes.listaDeCertificacionesPrincipal}>
                {
                    listaCertificaciones.map((label, index) =>(
                        <div className={classes.containerImage}>                    
                            <img className={classes.mobileIcon} src={label.icon} />
                        </div>            
                    ))
                }
            </div>

        </div> 
    )
}
export default (ComponeneteCertificaciones);