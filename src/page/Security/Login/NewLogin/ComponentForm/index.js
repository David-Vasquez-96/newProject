import React, { useState } from "react";
import { useStyles } from "./style";
import Form from 'component/Form/FormTwoColumns';
import { AccountCircle, ExitToApp, HighlightOff, Mail, PersonAdd } from "@material-ui/icons";
import { Button, CssBaseline, Icon } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DialogLoadingMessage from 'component/LoadingMessage/index'
import LoadingDialog from 'component/Loading'
import Alert from 'react-s-alert';
import UserAccount from './UserAccount';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
/**** REDUX ****/
import { setCurrentUser, setMenu } from 'store/reducers/SecuritySlice';
import { useDispatch } from 'react-redux';

const ComponentForm = (props) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    const [userAccount,] = useState(new UserAccount());
    const [apiErrors,setApiErrors] = useState([]);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const [elements,] = useState({
        email: {    
            idelement: "email", value: '', label: "Correo electrónico *", pattern:"^[\\w0-9._%+-]+@[\\w0-9.-]+\\.\\w{2,10}$", style: classes.formControlLogin,
            validators: ['required'], errorMessages:['Ingrese su correo.'], isError:false, elementType:'inputOutlined', icon: <Mail/> 
        },        
        password: { 
            idelement: "password",  value:'', label: "Clave", pattern:"^[\\w_\\sÑñáéíóúÁÉÍÓÚ().!@#$%^&*/-]{6,20}$", validators: ['required'],
            errorMessages:['Ingrese su contraseña.'], isError:false, elementType:'password', variant: 'outlined', style: classes.formControlLogin,
        },
    });

    const loginError=()=>{
        buttonList["login"].loading=false;
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
        dispatch(setMenu(userAccount.getMenu()));
        dispatch(setCurrentUser(userAccount.getCurrentUser()));
        // props.SET_MENU(userAccount.getMenu());
        // props.SET_CURRENT_USER(userAccount.getCurrentUser());
        history.push("/",{});
    }
    
    const login=async (data, _)=>{
        setLoadingMessage({loading: true, title: 'Iniciando sesión ...'})
        var clonedButtonList = Object. assign({}, buttonList);
        buttonList["login"].loading=true;
        setButtonList(clonedButtonList);

        userAccount.setEmail(data.email);
        userAccount.setPassword(data.password);
        await userAccount.login();
        if (userAccount.getIsError())   loginError();
        else loginSuccess();
        setLoadingMessage({loading: false, title: ''})
    }
    const recuperarContraseña = () => {
        history.push("/cambiarContraseña/obtenerCorreoExterno",{});
    }
    const FuncionRegistrarse = () => {
        history.push("/signup",{});
    }
    const [buttonList,setButtonList]= useState({
        "login":{"label":"Ingresar","icon": <ExitToApp />, variant: 'outlined', "callback": login, color: 'primary'},
    });
    var anchoDePantalla = window.innerWidth;

    return (
        <div className={classes.contenedorPrincipalLogin}>
            <div className={classes.contenedorSecundarioLogin}>
                {/* <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/> */}
                <LoadingDialog open={loadingMessage.loading} text={loadingMessage.title}/>
                {/* <div className={classes.title}>Bienvenido al Portal Web TSE {screenWidth} x {screenHeight}</div> */}
                <AccountCircle className={classes.loginIcon} style={{ fontSize: 100 }}/>
                <div className={classes.title}>Iniciar sesiónn {anchoDePantalla}</div>
                <Form elements= {elements}  buttonList={buttonList} stylesFormControl={classes.formControlLogin}/>
                <Button onClick={recuperarContraseña} className={classes.passwordButton}>¿Has olvidado tu contraseña?</Button>
            </div>
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(ComponentForm);