import React, {useState} from 'react';
import { useStyles } from "./style";
import Form from 'component/Form/FormTwoColumns';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ApiServices from 'service/ApiServices';
import { NavigateNext} from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import DialogLoadingMessage from 'component/LoadingMessage/index'

function VerificarIdentidad(props) {
    const classes = useStyles();
    const [apiErrors,setApiErrors] = React.useState([]);
    const [elements, setElements] = React.useState({
        password: { 
            idelement: "password",  value:'', label: "Ingrese su contraseña actual", pattern:"^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", validators: ['required'],
            errorMessages:['Ingrese su contraseña *'], isError:false, elementType:'password', variant: 'outlined', placeholder: "Ingrese su contraseña actual", minWidth: '280px'
        },        
    });  
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    let history = useHistory();

    const VerificarIdentidadUsuario = async () =>{
        setLoadingMessage({loading: true, title: 'Validando contraseña ...'})
        const loginRequest = Object.assign({}, {"email": props.currentUser.email, "password": elements.password.value});
        try{
            const response = await ApiServices.userSecurity.login(loginRequest)
            if (response.status != 401){
                history.push("/changedPassword",{})
                elements.password.value="";
                setElements({ ...elements });  
            }
        }catch(exception){
            if (exception.status === 401)
                showMessagePersonalizedPosition('warning', '¡Advertencia!', 'La contraseña ingresada no coincide con la cuenta.', 'center')
            else
                showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setLoadingMessage({loading: false, title: ''})
    }

    const [buttonList,setButtonList]= React.useState({
        "register":{"label":"Siguiente","callback":VerificarIdentidadUsuario,"loading":false,"color":"#fff", "icon": <NavigateNext />, variant: 'outlined'},
    });

    return (
        <div className={classes.containerPrincipal}>
            <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
            <Form   
                elements= {elements} 
                buttonList={buttonList}
                apiErrors={apiErrors} 
            />
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificarIdentidad);