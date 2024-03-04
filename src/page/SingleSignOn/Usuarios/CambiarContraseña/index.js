import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import { Cancel, CreditCard, Person, VpnKey } from '@material-ui/icons';
import Alert from 'react-s-alert';
import AlertMaterial from '@material-ui/lab/Alert';
// REDUX **************************
import { setUserList } from 'store/reducers/usuarioSlice';
import { useDispatch } from 'react-redux';

const ComponenteCambiarContraseñaUsuario=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = props.userList;
    const anchoDePantalla = window.innerWidth;
    const userdata = props?.data
    const description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ]; 
    const [showAlert, setShowAlert] = useState(false);

    const FuncionReiniciarMensaje = (e) =>{
        if(e?.target?.value !== "")
            setShowAlert(false)        
    }

    const [elements,setElements] = useState({
        codigo: {
            idelement: "codigo",  value: userdata?.codigo || "",    label: "Código de usuario",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <CreditCard/>, 
            style: classes.formControlInput, disabled: true
        },
        nombre: {
            idelement: "nombre",  value: userdata?.nombreCompleto || "",    label: "Nombre Completo",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: true
        },
        contraseña: {
            idelement: "contraseña",  value: "",    label: "Ingrese contraseña *",   pattern: "^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", initialRequiredLength: 6, finalRequiredLength: 30,
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'password', variant: 'outlined', icon: <VpnKey/>, 
            style: classes.formControlInput, disabled: false, showComponent: true, handler: FuncionReiniciarMensaje
        },
        reContraseña: {
            idelement: "reContraseña",  value: "",  label: "Confirmar contraseña *", pattern: "^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", initialRequiredLength: 6, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'password', variant: 'outlined', icon: <VpnKey/>, 
            style: classes.formControlInput, disabled: false, showComponent: true, handler: FuncionReiniciarMensaje
        },        
    });

    const FunctionChangePassword = () =>{
        if(elements.contraseña.value !== elements.reContraseña.value){
            let newElements = Object.assign({}, elements);
            setShowAlert(true);
            newElements.contraseña.value = "";
            newElements.reContraseña.value = "";
            return setElements(newElements);
        }
        dispatch(setUserList([]))
        let getUserId = userList.findIndex(obj => obj.codigo === userdata?.codigo);
        if(getUserId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            userList[getUserId].contraseña = elements.contraseña.value;
        }
        dispatch(setUserList(userList))
        props.closeModal()
        Alert.success('Contraseña actualizada correctamente.')
    }
    
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FunctionChangePassword, variant: 'outlined', color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={(anchoDePantalla <= 460) ? true : false}
            closeModal={props.closeModal}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
            fullWidth={true}
            maxWidth={'md'}
        >
            <div className={classes.containerPrincipal}>
                <Form   elements= {elements} buttonList={buttonList} description={description}/>
                <br></br>
                {
                    showAlert ? 
                        <AlertMaterial variant="outlined" severity="warning">Las contraseñas ingresadas no coinciden.</AlertMaterial>
                    : null
                }
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteCambiarContraseñaUsuario);