import React, { useEffect, useState } from 'react';
import { AssignmentInd, Cancel, CreditCard, Email, LocationCity, Person, VpnKey} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import ComponentCard from 'page/Home/Body/Procesos/ComponentCard'
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserList } from 'store/reducers/usuarioSlice';

const ComponenteCrearEditarProceso=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = JSON.parse(JSON.stringify(useSelector( state => state.usuario.userList))); 
    const newArray = []
    const roles = [
        {id: 1, name: 'ADMINISTRADOR'},
        {id: 2, name: 'JEFE X'},
        {id: 3, name: 'COORDINADOR'},
    ]
    const empresas = [
        {id: 1, name: 'Project X'},
        {id: 2, name: 'TNT X'},
        {id: 3, name: 'CISA X'},
    ]
    const description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];     
    const [elements,setElements] = useState({
        codigo: {
            idelement: "codigo",  value: props.data?.codigo || "",    label: "Código de usuario *",   pattern:"^\\d+$",  initialRequiredLength: 1, finalRequiredLength: 30,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <CreditCard/>, 
            style: classes.formControlInput, disabled: false
        },
        nombreCompleto: {
            idelement: "nombreCompleto",  value: props.data?.nombreCompleto || "",    label: "Nombre Completo *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: false
        },
        usuario: {
            idelement: "usuario",  value: props.data?.usuario || "",    label: "Usuario *",   pattern:"^([a-zA-Z_0-9][a-zA-Z_ Ññ0-9]*[a-zA-Z_Ññ0-9])$", initialRequiredLength: 1, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: false
        },
        email: {
            idelement: "email",  value: props.data?.email || "",    label: "Correo Eelectrónico *",   pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,10}$", initialRequiredLength: 1, finalRequiredLength: 30,
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Email/>, 
            style: classes.formControlInput, disabled: false
        },
        contraseña: {
            idelement: "contraseña",  value: "",    label: "Ingrese contraseña *",   pattern: (props.id === 2) ? '' : "^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", initialRequiredLength: 6, finalRequiredLength: 30,
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'password', variant: 'outlined', icon: <VpnKey/>, 
            style: classes.formControlInput, disabled: false, showComponent: (props.id === 2) ? false : true
        },
        reContraseña: {
            idelement: "reContraseña",  value: "",  label: "Confirmar contraseña *", pattern: (props.id === 2) ? '' : "^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", initialRequiredLength: 6, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'password', variant: 'outlined', icon: <VpnKey/>, 
            style: classes.formControlInput, disabled: false, showComponent: (props.id === 2) ? false : true
        },
        rolUsuario: {
            idelement: "rolUsuario", value: props.data?.rolUsuario || null , label: "Seleccione Rol *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Rol'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <AssignmentInd/>,
            list: roles, style: classes.formControlInput, disabled: false
        },   
        empresa: {
            idelement: "empresa", value: props.data?.empresa || null , label: "Seleccione Empresa *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione Empresa'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <LocationCity/>,
            list: empresas, style: classes.formControlInput, disabled: false
        },
    });

    const FuncionCrearUsuario = (e) => {
        dispatch(setUserList([]))
        let saveUser = {
            codigo: elements.codigo.value, 
            nombreCompleto: elements.nombreCompleto.value,
            usuario: elements.usuario.value,
            email: elements.email.value,
            contraseña: elements.contraseña.value,
            rolUsuario: elements.rolUsuario.value,
            empresa: elements.empresa.value,
        }
        newArray.push(saveUser)
        const concatArray = userList.concat(newArray)
        dispatch(setUserList(concatArray))
        props.closeModal()
        Alert.success('Usuario creado correctamente.');
    }

    const FuncionEditarUsuario = () =>{
        console.log('editar usuario: ')
    }

    const FuncionUsuario = () =>{
        if(props.id === 1) FuncionCrearUsuario();
        else if (props.id === 2) FuncionEditarUsuario();        
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionUsuario, variant: 'outlined', color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={true}
            closeModal={props.closeModal}
            // actualizarTabla={props.actualizarTabla}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
        >
            <div className={classes.containerPrincipal}>
                <div className={classes.titleProceso}>Complete el formulario para {props.titleToolbar}</div>
                <Form   elements= {elements}  buttonList={buttonList} description={description} />
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCrearEditarProceso);