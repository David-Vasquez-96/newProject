import React, { useEffect, useState } from 'react';
import { AssignmentInd, AttachFile, Cancel, CreditCard, Description, Email, FormatListNumbered, LocationCity, Person, VpnKey} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserList } from 'store/reducers/usuarioSlice';

const ComponenteAgregarEditarArchivos=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = JSON.parse(JSON.stringify(useSelector( state => state.usuario.userList))); 
    const newArray = []
    const formatos = [
        {id: 1, name: '1. PDF', type: '.pdf'},
        {id: 2, name: '2. EXCEL', type: '.xlsx'},
        {id: 3, name: '3. WORD', type: '.docx'},
        {id: 4, name: '4. IMAGEN', type: '.png'},
        {id: 5, name: '5. VIDEO', type: '.mp4'},
    ]
    const description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];     
    const [elements,setElements] = useState({
        type: {
            idelement: "type", value: props.data?.empresa || null , label: "Seleccione formato del documento *", pattern:"^[1-9][0-9]*$", validators: ['required'], 
            errorMessages:['Seleccione formato del documento'], isError:false, elementType:'autocompleteV3', variant: "outlined",  icon: <AttachFile/>,
            list: formatos, style: classes.formControlInput, disabled: false
        },
        file:{
            idelement: "file", value: null, label: "Adjunte archivo *", base64Complete: '',
            validators: {required: true,  size: "2 MB",}, errorMessages: 'Por favor debe adjuntar lo solicitado', isError:false, elementType:'file',
            disabled:false, name:"file", fileWidth: false, src: '', multiple: false, accept:".png, .jpg, .jpeg, .svg",
        },         
        nombreArchivo: {
            idelement: "nombreArchivo",  value: props.data?.nombreCompleto || "",    label: "Ingrese nombre del documento *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Description/>, 
            style: classes.formControlInput, disabled: false
        },
        version: {
            idelement: "version",  value: props.data?.usuario || "",    label: "Ingrese versión *",   pattern:"^([a-zA-Z_0-9][a-zA-Z_ Ññ0-9]*[a-zA-Z_Ññ0-9])$", initialRequiredLength: 1, finalRequiredLength: 30, 
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <FormatListNumbered/>, 
            style: classes.formControlInput, disabled: false
        },
    });

    const FuncionAgregarArchivo = (e) => {
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

    const FuncionEditarArchivo = () =>{
        dispatch(setUserList([]))
        let getUserId = userList.findIndex(obj => obj.codigo === props?.data?.codigo);
        if(getUserId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            userList[getUserId].codigo = elements.codigo.value;
            userList[getUserId].nombreCompleto = elements.nombreCompleto.value;
            userList[getUserId].usuario = elements.usuario.value;
            userList[getUserId].email = elements.email.value;
            userList[getUserId].rolUsuario = {id: elements.rolUsuario.value?.id, name: elements.rolUsuario.value?.name};
            userList[getUserId].empresa = {id: elements.empresa.value?.id, name: elements.empresa.value?.name};
        }
        dispatch(setUserList(userList))
        Alert.success('Usuario actualizado correctamente.')
        props.closeModal()
    }

    const FuncionArchivos = () =>{
        if(props.id === 1) FuncionAgregarArchivo();
        else if (props.id === 2) FuncionEditarArchivo();        
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionArchivos, variant: 'outlined', color: "primary", },
        "cancel":{"label":"Cancelar","icon": <Cancel />,"callback":props.closeModal, isCancel: true, variant: "outlined", color: "secondary"},
    });

    const anchoDePantalla = window.innerWidth;

    return (
        <DialogoPersonalizado 
            open={props.open}
            fullScreen={(anchoDePantalla <= 460) ? true : false}
            closeModal={props.closeModal}
            // actualizarTabla={props.actualizarTabla}
            iconToolbar={props.iconToolbar}
            titleToolbar={props.titleToolbar}
            fullWidth={true}
            maxWidth={'md'}            
        >
            <div className={classes.containerPrincipal}>
                <div className={classes.title}>Complete el formulario para {props.titleToolbar}</div>
                <Form   elements= {elements}  buttonList={buttonList} description={description} />
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteAgregarEditarArchivos);