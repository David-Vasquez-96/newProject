import React, { useState } from 'react';
import {useStyles} from './style';

const MapaDeProcesos=(props)=> {
    const classes = useStyles(props);

    return (
        <div className={classes.ContainerPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Mapa de Procesos'}</h1>
            {/* <p className={classes.titleSecondary} variant="h5" color="initial">{'Navega en las siguientes categorías y encuentra fácilmente los documentos que necesites.'}</p> */}
            <div className={classes.containerImage}>                    
                <img className={classes.mobileIcon} src={'assets/mapaProcesos.png'} />
            </div>            
        </div> 
    )
}
export default (MapaDeProcesos);