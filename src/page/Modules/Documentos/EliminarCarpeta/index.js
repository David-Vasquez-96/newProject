import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from '../ComponentCard'
import { ErrorOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { listDocuments } from 'store/reducers/documentosSlice';

const ComponenteEliminarCarpeta=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();

    const FunctionDeleteProceso = () =>{
        let getDocumentId = props.documentsList.findIndex(obj => obj.title === props?.data?.title)
        if(getDocumentId !== -1){
            dispatch(listDocuments([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.documentsList.splice(getDocumentId, 1)
            dispatch(listDocuments(props.documentsList))
            Alert.success('Carpeta / '+props?.data?.title+" / eliminado correctamente.")
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
                    <div className={classes.errorMessageTitle}>Eliminará la siguiente carpeta</div>
                </div>
                <div className={classes.componente}>
                    <ComponentCard 
                        backgroundColor={props?.data?.backgroundColor}
                        image={props?.data?.image}
                        title={props?.data?.title}
                        total={props?.data?.total}
                        key={0}
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
export default (ComponenteEliminarCarpeta);