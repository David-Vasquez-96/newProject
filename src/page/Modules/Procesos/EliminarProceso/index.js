import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from 'page/Home/Body/Procesos/ComponentCard'
import { ErrorOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { updateProcessList } from 'store/reducers/ProcesosSlice';

const ComponenteEliminarProceso=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();

    const FunctionDeleteProceso = () =>{
        let getProcessId = props.processList.findIndex(obj => obj.title === props?.data?.title)
        if(getProcessId !== -1){
            dispatch(updateProcessList([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.processList.splice(getProcessId, 1)
            dispatch(updateProcessList(props.processList))
            Alert.success('Proceso / '+props?.data?.title+" / eliminado correctamente.")
        }
        props.closeModal()
    }
    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={false}
            closeModal={props.closeModal}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
            showToolbar = {false}
        >
            <div className={classes.containerPrincipalProcess}>
                <div className={classes.errorMessageContainer}>
                    <div ><ErrorOutline className={classes.errorMessageIcon}/></div>
                    <div className={classes.errorMessageTitle}>Eliminará el siguiente proceso</div>
                </div>
                <div className={classes.componente}>
                    <ComponentCard
                        title={props?.data?.title} 
                        backgroundColor={props?.data?.backgroundColor}
                        image = {props?.data?.image}
                    />
                </div>
                <div className={classes.errorMessageContainerSecondary}>
                    <div className={classes.errorMessageText}>¿Está sguro?</div>
                </div>
                <div className={classes.errorMessageButtons}>
                    <Button variant="outlined" color="secondary" onClick={FunctionDeleteProceso}>¡Sí, eliminar!</Button>
                    <Button variant="outlined" color="primary" onClick={props.closeModal}>No, cancelar</Button>
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteEliminarProceso);