import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCircle from 'page/Home/Body/Documents/ComponentCircle'
import { ErrorOutline } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { listCategory } from 'store/reducers/categoriaSlide';

const ComponenteEliminarCategoria=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();

    const FunctionDeleteCategory = () =>{
        let getCategoryId = props.categoryList.findIndex(obj => obj.title === props?.data?.title)
        if(getCategoryId !== -1){
            dispatch(listCategory([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.categoryList.splice(getCategoryId, 1)
            dispatch(listCategory(props.categoryList))
            Alert.success('Categoría '+props?.data?.title+" eliminado correctamente.")
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
                    <div className={classes.errorMessageTitle}>Eliminará la siguiente categoría</div>
                </div>
                <div className={classes.componente}>
                    <ComponentCircle 
                        title={props?.data?.title} 
                        borderColor={props?.data?.borderColor}
                        image = {props?.data?.icon}
                    />
                </div>
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
export default (ComponenteEliminarCategoria);