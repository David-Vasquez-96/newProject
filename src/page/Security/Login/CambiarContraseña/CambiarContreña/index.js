import React, {useState, useEffect} from 'react';
import {Container, Grid, Paper, Typography } from '@material-ui/core/';
import { useStyles } from "./style";
import Form from 'component/Form/FormTwoColumns';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ApiServices from 'service/ApiServices';
import Title from 'component/TitleWithIcon';
import {Done, Save} from '@material-ui/icons/';
import { useHistory } from "react-router-dom";
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import DialogLoadingMessage from 'component/LoadingMessage/index'

function FormularioCambiarContraseña(props) {
    const classes = useStyles();
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    const [apiErrors,setApiErrors] = React.useState([]);
    const [elements, setElements] = React.useState({
        codigo: { 
            idelement: "codigo",  value:'', label: "Ingrese el código de seguridad", pattern:"^([0-9]){6,6}$", validators: ['required'], 
            errorMessages:['Código numérico de 6 dígitos, sin espacios'], isError:false, elementType:'inputOutlined', placeholder: 'Ingrese el código de seguridad'
        },
        password: { 
            idelement: "password",  value:'', label: "Ingrese contraseña nueva", pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@#$!%*?&/-])[A-Za-z\\d$@#$!%*?&/-]\\S{6,20}$", 
            validators: ['required'], errorMessages:['Alfanumérico y simbolos "$@#$!%*?&/-" de 6-20 caracteres, sin espacios.'], isError:false, elementType:'password' ,
            variant: 'outlined', placeholder: 'Ingrese contraseña nueva'
        },
        repassword: { 
            idelement: "repassword",  value:'', label: "Confirmar nueva contraseña", pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@#$!%*?&/-])[A-Za-z\\d$@#$!%*?&/-]\\S{6,20}$", 
            validators: ['required'], errorMessages:['Alfanumérico y simbolos "$@#$!%*?&/-" de 6-20 caracteres, sin espacios.'], isError:false, elementType:'password',
            variant: 'outlined', placeholder: 'Confirmar nueva contraseña'
        },
    });  
    let history = useHistory();
    const [politicasContraseña, setPoliticasContraseña] = useState([
        {texto:'Minimo 6 caracteres.'},
        {texto:'Máximo 20 caracteres.'},
        {texto:'Al menos una letra mayúscula.'},
        {texto:'Al menos un caracter especial.'},
        {texto:'Al menos un número.'},
        {texto:'No espacios en blanco.'},
        // texto:'',
    ])

    const CambiarContraseña = async () =>{
        setLoadingMessage({loading: true, title: 'Actualizando contraseña ...'})
        let changePassword  = {email: props.correoUsuario, password: elements.password.value, code: elements.codigo.value};
        if(elements.password.value === elements.repassword.value){
            try{
                const response =  await ApiServices.userChangePasswordRequest.changePassword(changePassword);
                if (response.error!==null){
                    showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
                }else{
                    showMessagePersonalizedPosition('success', '¡BIEN!', 'Contraseña actualizada correctamente.', 'center')
                    elements.password.value="";
                    elements.repassword.value="";
                    setElements({ ...elements });              
                    history.push("/cambiarContraseña/contraseñaActualizada",{})
                }   
            }catch(exception){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
            }            
        }else{
            showMessagePersonalizedPosition('success', '¡Advertencia!', 'Contraseñas no coinciden, por favor verifique.', 'center')
        }        
    }

    const Cancelar = () =>{
        history.push("/home",{})
    }

    const [buttonList,setButtonList]= React.useState({
        "register":{"label":"Cambiar la Contraseña","callback":CambiarContraseña,"icon": <Save />, variant: 'outlined', color: 'primary'},
    });

    const ReenviarCodigo = async () =>{
        setLoadingMessage({loading: true, title: 'Enviando código de seguridad ...'})
        try{
            const sendCode = Object.assign({}, {"email": props.correoUsuario});
            const response =  await ApiServices.userChangePasswordRequest.sendCode(sendCode);
            if (response.error!==null){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
            }else{
                showMessagePersonalizedPosition('success', '¡BIEN!', response.data, 'center')
            }   
        }catch(exception){
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setLoadingMessage({loading: false, title: ''})
    }

    useEffect(() => {
        if("Solicitud de cambio de clave activa, revise su correo electrónico" === props.mensajeCodigo){
            showMessagePersonalizedPosition('warning', '¡Advertencia!', props.mensajeCodigo, 'center')
        }else if("Código Enviado Correctamente" === props.mensajeCodigo){
            showMessagePersonalizedPosition('success', '¡BIEN!', props.mensajeCodigo, 'center')
        }
    },[])

    return (
        <div className={classes.containerPrincipal}>
            <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
            <Title title="Cambiar contraseña " icon={"/assets/cambiarContraseña.png"}/> <br/>
            <Container maxWidth="md" className={classes.containerSecondary}>
                <div className={classes.colorComponente} >
                    <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}>Elige una contraseña segura y no la utilices en otras cuentas.</Typography><br/><br/>
                    <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}> <strong>Política de Seguridad</strong></Typography><br/><br/>
                    <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}>
                        No uses una contraseña de otro sitio ni un nombre demasiado obvio, como el de tu mastoca, su nombre o fecha de nacimiento.
                    </Typography><br/><br/>
                    <Grid container spacing={1} className={classes.grid}>
                        {
                            politicasContraseña.map((data, index) => (
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <Paper className={classes.paper} elevation={0}>
                                        <Done />
                                        <Typography className={classes.contentTitle}>{data.texto}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                    <div className={classes.containerForm}>                        
                        <Form   
                            elements= {elements} 
                            buttonList={buttonList}
                            apiErrors={apiErrors} 
                            BotonCancelar={Cancelar}
                            BotonEnviarCodigo={ReenviarCodigo}
                        />
                    </div>
                </div>
            </Container><br/>        
        </div>
    );
}export default connect(mapStateToProps, mapDispatchToProps)(FormularioCambiarContraseña);