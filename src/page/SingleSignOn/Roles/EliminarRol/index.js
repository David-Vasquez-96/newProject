import React, { useState } from 'react';
import {useStyles} from './style';
import { ErrorOutline, Person } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { setRolesList } from 'store/reducers/rolesSlice';

const ComponenteEliminarRol=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const [elements] = useState({
        nombreRol: {
            idelement: "nombreRol",  value: props?.data?.name || "",    label: "Nombre del Rol *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: true
        },
    });
    const FunctionDeleteRol = () =>{
        let getRolId = props.rolesList.findIndex(obj => obj.id === props?.data?.id)
        if(getRolId !== -1){
            dispatch(setRolesList([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.rolesList.splice(getRolId, 1)
            dispatch(setRolesList(props.rolesList))
            Alert.success('Rol / '+props?.data?.name+" / eliminado correctamente.")
        }
        props.closeModal()
    }
    const anchoDePantalla = window.innerWidth;

    return (
        <DialogoPersonalizado         
            open={props.open}
            fullScreen={(anchoDePantalla <= 460) ? true : false}
            closeModal={props.closeModal}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
            showToolbar = {false}
            // actualizarTabla={props.actualizarTabla}
            fullWidth={true}
            maxWidth={'md'}
        >
            <div className={classes.containerPrincipal}>
                <div className={classes.errorMessageContainer}>
                    <div ><ErrorOutline className={classes.errorMessageIcon}/></div>
                    <div className={classes.errorMessageTitle}>Eliminará el siguiente rol</div>
                </div>
                <div className={classes.componente}>
                    <Form   elements= {elements} />
                </div>
                <div className={classes.errorMessageContainerSecondary}>
                    <div className={classes.errorMessageText}>¿Está sguro?</div>
                </div>
                <div className={classes.errorMessageButtons}>
                    <Button variant="outlined" color="secondary" onClick={FunctionDeleteRol}>¡Sí, eliminar!</Button>
                    <Button variant="outlined" color="primary" onClick={props.closeModal}>No, cancelar</Button>
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteEliminarRol);