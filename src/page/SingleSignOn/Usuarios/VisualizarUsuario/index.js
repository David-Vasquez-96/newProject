import React, { useState } from 'react';
import {useStyles} from './style';
import DialogoPersonalizado from 'component/DialogoPersonalizado';
import Form from 'component/Form/FormTwoColumns';
import { AssignmentInd, CreditCard, Email, LocationCity, Person } from '@material-ui/icons';

const ComponenteVisualizarUsuario=(props)=> {   
    const classes = useStyles();
    const userdata = props?.data
    
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
        usuario: {
            idelement: "usuario",  value: userdata?.usuario || "",    label: "Usuario",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Person/>, 
            style: classes.formControlInput, disabled: true
        },
        email: {
            idelement: "email",  value: userdata?.email || "",    label: "Correo Eelectrónico",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <Email/>, 
            style: classes.formControlInput, disabled: true
        },
        rolUsuario: {
            idelement: "rolUsuario",  value: userdata?.rolUsuario?.name || "",    label: "Rol de usuario",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <AssignmentInd/>, 
            style: classes.formControlInput, disabled: true
        },
        empresa: {
            idelement: "empresa",  value: userdata?.empresa?.name || "",    label: "Empresa",   pattern:"",  
            validators: ['requireds'], errorMessages:['Dato requerido'],  isError:false, elementType:'inputOutlined', icon: <LocationCity/>, 
            style: classes.formControlInput, disabled: true
        },
    });
    
    const anchoDePantalla = window.innerWidth;

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
                <Form   elements= {elements} />
            </div>
        </DialogoPersonalizado>
    )
}
export default (ComponenteVisualizarUsuario);