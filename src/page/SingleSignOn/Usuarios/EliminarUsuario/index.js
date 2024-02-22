import React, { useState } from 'react';
import {useStyles} from './style';
import { AssignmentInd, CreditCard, Email, ErrorOutline, LocationCity, Person } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
// REDUX **************************
import { useDispatch } from 'react-redux';
import { setUserList } from 'store/reducers/usuarioSlice';

const ComponenteEliminarUsuario=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const [elements,setElements] = useState({
        codigo: {
            idelement: "codigo",  value: props.data?.codigo || "",    label: "Código de usuario *",   pattern:"^\\d+$",  initialRequiredLength: 1, finalRequiredLength: 30,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <CreditCard/>, 
            style: classes.formControlInput, disabled: true
        },
        nombreCompleto: {
            idelement: "nombreCompleto",  value: props.data?.nombreCompleto || "",    label: "Nombre Completo *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: true
        },
        usuario: {
            idelement: "usuario",  value: props.data?.usuario || "",    label: "Usuario *",   pattern:"^([a-zA-Z_0-9][a-zA-Z_ Ññ0-9]*[a-zA-Z_Ññ0-9])$", initialRequiredLength: 1, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: true
        },
        email: {
            idelement: "email",  value: props.data?.email || "",    label: "Correo Eelectrónico *",   pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,10}$", initialRequiredLength: 1, finalRequiredLength: 30,
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Email/>, 
            style: classes.formControlInput, disabled: true
        },
        rolUsuario: {
            idelement: "rolUsuario", value: props.data?.rolUsuario || null , label: "Seleccione Rol *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Rol'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <AssignmentInd/>,
            list: [], style: classes.formControlInput, disabled: true
        },   
        empresa: {
            idelement: "empresa", value: props.data?.empresa || null , label: "Seleccione Empresa *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Empresa'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <LocationCity/>,
            list: [], style: classes.formControlInput, disabled: true
        },
    });
    const FunctionDeleteUser = () =>{
        let getUserId = props.userList.findIndex(obj => obj.codigo === props?.data?.codigo)
        if(getUserId !== -1){
            dispatch(setUserList([]))
            // si se encuentra el objeto buscado se procede a eliminar el objeto
            props.userList.splice(getUserId, 1)
            dispatch(setUserList(props.userList))
            Alert.success('Usuario / '+props?.data?.nombreCompleto+" / eliminado correctamente.")
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
                    <div className={classes.errorMessageTitle}>Eliminará al siguiente usuario</div>
                </div>
                <div className={classes.componente}>
                    <Form   elements= {elements} />
                </div>
                <div className={classes.errorMessageContainerSecondary}>
                    <div className={classes.errorMessageText}>¿Está sguro?</div>
                </div>
                <div className={classes.errorMessageButtons}>
                    <Button variant="outlined" color="secondary" onClick={FunctionDeleteUser}>¡Sí, eliminar!</Button>
                    <Button variant="outlined" color="primary" onClick={props.closeModal}>No, cancelar</Button>
                </div>
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteEliminarUsuario);