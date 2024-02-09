import React from 'react';
import UserAccount from './UserAccount';
import { connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import { useHistory } from "react-router-dom";
import Form from 'component/Form/FormTwoColumns';
import Alert from 'react-s-alert';
import { ExitToApp } from '@material-ui/icons';
import { Button, Link} from '@material-ui/core/';
import { useStyles } from './style';
import { useState } from 'react';
import DialogLoadingMessage from 'component/LoadingMessage/index'

const FormElements= (props)=> {
    const classes = useStyles();
    let history = useHistory();
    const [userAccount,] = React.useState(new UserAccount());
    const [apiErrors,setApiErrors] = React.useState([]);
    const [elements,] = React.useState({
        email: {    idelement: "email",     value:'', label: "Correo", pattern:"^[\\w0-9._%+-]+@[\\w0-9.-]+\\.\\w{2,10}$", validators: ['required'], errorMessages:['Ingrese un correo válido'], isError:false, elementType:'inputOutlined', adornment: true},
        password: { idelement: "password",  value:'', label: "Clave", pattern:"^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", validators: ['required'], errorMessages:['Alfanumérico y simbolos de 6-20 caracteres, sin espacios.'], isError:false, elementType:'password', variant: "outlined" },
    });  
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    const loginError=()=>{
        buttonList["register"].loading=false;
        let errors=  userAccount.getErrors();
        if (errors!==undefined){
            let newApiErrors=[];
            errors.forEach((item)=>{
                newApiErrors.push({"attribute":item.field,"message":item.defaultMessage});
            });
            setApiErrors(newApiErrors);
        }else if (userAccount.getErrorMessage()==="Bad credentials") Alert.error("Credenciales incorrectas");
        else if (userAccount.getErrorMessage()==="Failed to fetch") Alert.error("Intente de nuevo");
        else if (userAccount.getErrorMessage()==="Internal Server Error") Alert.error("Error de servidor");
        else Alert.error(userAccount.getErrorMessage());
        
        var clonedButtonList = Object. assign({}, buttonList);
        setButtonList(clonedButtonList);
    }

    const loginSuccess=async ()=>{
        props.SET_MENU(userAccount.getMenu());
        props.SET_CURRENT_USER(userAccount.getCurrentUser());
        history.push("/",{});
    }
    
    const login=async (data, _)=>{
        setLoadingMessage({loading: true, title: 'Iniciando sesión ...'})
        var clonedButtonList = Object. assign({}, buttonList);
        buttonList["register"].loading=true;
        setButtonList(clonedButtonList);

        userAccount.setEmail(data.email);
        userAccount.setPassword(data.password);
        await userAccount.login();
        if (userAccount.getIsError())   loginError();
        else loginSuccess();
        setLoadingMessage({loading: false, title: ''})
    }

    const [buttonList,setButtonList]= React.useState({
        "register":{"label":"Iniciar sesión","icon": <ExitToApp />,"callback":login,"loading":false,"size":"medium","color":"#fff", "background":"linear-gradient(130deg, rgb(18 176 234) 30%, #3f51b5 90%) 0% 0% repeat scroll"},
    });

    const recuperarContraseña = () => {
        history.push("/cambiarContraseña/obtenerCorreoExterno",{});
    }
    
    const registro = () => {
        history.push("/signup",{});
    }

    return (
        <>
            <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
            <div className={classes.mobileFormTwoColumn}>
                <Form   elements= {elements} 
                    buttonList={buttonList}
                    apiErrors={apiErrors} 
                />
            </div>

            <span className={classes.mobileSpan}>¿No cuentas con un usuario?</span>
            <Link className={classes.mobileSpanLink} onClick={registro} href="#">Regístrate desde aquí</Link>
            <Button onClick={recuperarContraseña} variant="outlined">¿Has olvidado tu contraseña?</Button>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormElements);