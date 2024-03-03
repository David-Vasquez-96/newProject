import React, { useState } from 'react';
import {useStyles} from './style';
import ComponentCard from './ComponentCard'
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import "./style.css";

const PageProcess=(props)=> {
    const classes = useStyles(props);
    const processList = useSelector( state => state.proceso.processList);
    const FuncionMostrarListadoDeProcesos = (data) =>{
        // history.push("/listadoPorCategorias", {})
    }
    return (
        <div className={classes.ProcesosPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Procesos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Selecciona uno de los subprocesos y explora los documentos que necesitas.'}</p>
            <div className={classes.listaDeProcesosPrincipal}>
                {
                    (processList.length > 0) ? (
                        processList.map((label, index) =>(
                            <div className="cardProcess" onClick={()=>FuncionMostrarListadoDeProcesos(label)}>
                                <ComponentCard 
                                    backgroundColor={label?.backgroundColor}
                                    image={label?.image}
                                    title={label?.title}
                                    key={index}
                                />
                            </div>
                        ))
                    ): (
                        <Alert className={classes.alert} severity="warning" variant="outlined">Sin registros. Cree procesos para visualizar aquí.</Alert>
                    )
                }
            </div>

        </div> 
    )
}
export default (PageProcess);