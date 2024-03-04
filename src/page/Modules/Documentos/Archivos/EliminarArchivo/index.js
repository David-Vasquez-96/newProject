import React from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import { ErrorOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { setFilesList } from 'store/reducers/documentosSlice';

const ComponenteEliminarArchivo=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();

    const FunctionDeleteCategory = () =>{
        let getFileId = props.filesList.findIndex(obj => obj.name === props?.data?.name)
        if(getFileId !== -1){
            dispatch(setFilesList([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.filesList.splice(getFileId, 1)
            dispatch(setFilesList(props.filesList))
            Alert.success('Archivo /'+props?.data?.name+" / eliminado correctamente.")
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
            <div className={classes.containerPrincipalCategoria}>
                <div className={classes.errorMessageContainer}>
                    <div ><ErrorOutline className={classes.errorMessageIcon}/></div>
                    <div className={classes.errorMessageTitle}>Eliminará el siguiente archivo</div>
                </div>
                <div className={classes.componente}>
                    {
                        (props.data?.formato === '.pdf') ?
                            <img className={classes.mobileIcon} src={'assets/pdf2.png'} />
                        : (props.data?.formato === '.xlsx') ?
                            <img className={classes.mobileIcon} src={'assets/excel.png'} />
                        : (props.data?.formato === '.docx') ?
                            <img className={classes.mobileIcon} src={'assets/word.png'} />
                        : (props.data?.formato === '.png') ?
                            <img className={classes.mobileIcon} src={'assets/imagen.png'} />
                        : (props.data?.formato === '.mp4') ?
                            <img className={classes.mobileIcon} src={'assets/video.png'} />
                        : null                        
                    }
                </div>
                <div>{props.data?.name}</div>
                <div className={classes.errorMessageContainerSecondary}>
                    <div className={classes.errorMessageText}>¿Está sguro?</div>
                </div>
                <div className={classes.errorMessageButtons}>
                    <Button variant="outlined" color="secondary" onClick={FunctionDeleteCategory}>¡Sí, eliminar!</Button>
                    <Button variant="outlined" color="primary" onClick={props.closeModal}>No, cancelar</Button>
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteEliminarArchivo);