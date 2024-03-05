import React from 'react';
import {useStyles} from './style';
import ComponentCard from './ComponentCard'
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { saveNewProcessData } from 'store/reducers/ProcesosSlice';

const PageProcess=(props)=> {
    const classes = useStyles(props);
    const history = useHistory();
    const dispatch = useDispatch();
    const processList = useSelector( state => state.proceso.processList);
    const FuncionMostrarListadoDeProcesos = (data) =>{
        dispatch(saveNewProcessData({title: data?.title, id: data?.id}))
        history.push("/listadoPorProcesos", {})
    }
    return (
        <div className={classes.ProcesosPrincipal}>
            <h1 className={classes.titlePrincipal} variant="h5" color="initial">{'Procesos'}</h1>
            <p className={classes.titleSecondary} variant="h5" color="initial">{'Selecciona uno de los subprocesos y explora los documentos que necesitas.'}</p>
            <div className={classes.listaDeProcesosPrincipal}>
                {
                    (processList.length > 0) ? (
                        processList.map((label, index) =>(
                            <div className={classes.cardProcess} onClick={()=>FuncionMostrarListadoDeProcesos(label)}>
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