import React, { useState } from 'react';
import {useStyles} from './style';
import ComponentCard from './ComponentCard'
import { useSelector } from 'react-redux';

const PageProcess=(props)=> {
    const classes = useStyles(props);
    const processList = useSelector( state => state.proceso.processList);

    return (
        <div className={classes.ProcesosPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Procesos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Selecciona uno de los subprocesos y explora los documentos que necesitas.'}</p>
            <div className={classes.listaDeProcesosPrincipal}>
                {
                    processList.map((label, index) =>(
                        <ComponentCard 
                            backgroundColor={label?.backgroundColor}
                            image={label?.image}
                            title={label?.title}
                        />
                    ))
                }
            </div>

        </div> 
    )
}
export default (PageProcess);