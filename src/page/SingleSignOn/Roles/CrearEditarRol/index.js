import React, { useState } from 'react';
import { Cancel, Person} from '@material-ui/icons';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
// REDUX **************************
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRolesList } from 'store/reducers/rolesSlice';

const ComponenteCrearEditarRol=(props)=> {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const rolesList = JSON.parse(JSON.stringify(useSelector( state => state.roles.rolesList))); 
    const newArray = []

    const description = [
        {name: "- Antes de continuar, revise que la información que ingresó esté correcta.",},
        {name: "- Datos requeridos (*)."}
    ];     
    const [elements,setElements] = useState({
        nombreRol: {
            idelement: "nombreRol",  value: props?.data?.name || "",    label: "Ingrese nombre del Rol *",   pattern:"^([a-zA-Z_ÑñáéíóúÁÉÍÓÚ][a-zA-Z_ ÑñáéíóúÁÉÍÓÚ]*[a-zA-Z_ÑñáéíóúÁÉÍÓÚ])$", initialRequiredLength: 1, finalRequiredLength: 100,  
            validators: ['required'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: false
        },
    });

    const FuncionCrearRol = (e) => {
        dispatch(setRolesList([]))
        let saveRol = {
            id: rolesList.length+1, 
            name: elements.nombreRol.value,
        }
        newArray.push(saveRol)
        const concatArray = rolesList.concat(newArray)
        dispatch(setRolesList(concatArray))
        props.closeModal()
        Alert.success('Rol creado correctamente.');
    }

    const FuncionEditarRol = () =>{
        dispatch(setRolesList([]))
        let getRolId = rolesList.findIndex(obj => obj.id === props?.data?.id);
        if(getRolId !== -1){
            // si se encuentra el objeto buscado se procede a actualizar el objeto
            rolesList[getRolId].name = elements.nombreRol.value;
        }
        dispatch(setRolesList(rolesList))
        Alert.success('Rol actualizado correctamente.')
        props.closeModal()
    }

    const FuncionRol = () =>{
        if(props.id === 1) FuncionCrearRol();
        else if (props.id === 2) FuncionEditarRol();        
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label": props.titleToolbar,"icon": props.iconToolbar,"callback":FuncionRol, variant: 'outlined', color: "primary", },
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
export default (ComponenteCrearEditarRol);