import React, {useState} from 'react';
import {Container, Grid, Paper, Typography} from '@material-ui/core/';
import { useStyles } from "./style";
import Form from 'component/Form/FormTwoColumns';
import {connect } from "react-redux";
import mapStateToProps from '../mapStateToProps';
import mapDispatchToProps from '../mapDispatchToProps';
import ApiServices from 'service/ApiServices';
import Title from 'component/TitleWithIcon';
import {Done, Save} from '@material-ui/icons/';
import { useHistory } from "react-router-dom";
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import DialogLoadingMessage from 'component/LoadingMessage/index'

function FormularioCambiarContraseña(props) {
    const classes = useStyles();
    const [controller,] = useState('user')
    const [apiErrors,setApiErrors] = React.useState([]);
    const [elements, setElements] = React.useState({
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
    ])
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});

    const CambiarContraseña = async () =>{
        setLoadingMessage({loading: true, title: 'Actualizando contraseña ...'})
        let updateElement  = {id: props.currentUser.id, password: elements.password.value, repassword: elements.repassword.value};
        if(elements.password.value === elements.repassword.value){
            try{
                const hasPermission = await ApiServices.userSecurity.hasPermission(controller,'changePassword');    
                if (hasPermission.error){
                    showMessagePersonalizedPosition('warning', '¡Advertencia!', 'No cuenta con permisos para realizar esta acción.', 'center')
                }else{                                   
                    const response =  ApiServices.userSecurity.changePassword(updateElement);
                    if (response.error===null){
                        showMessagePersonalizedPosition('warning', '¡Advertencia!', response.error?.message, 'center')
                    }else{
                        showMessagePersonalizedPosition('success', '¡BIEN!', 'Contraseña actualizada correctamente.', 'center')
                        elements.password.value="";
                        elements.repassword.value="";
                        setElements({ ...elements });
                        history.push("/contraseñaActualizada",{})
                    }  
                } 
            }catch(exception){
                showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
            }            
        }else{
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Las contraseñas ingresadas no coinciden, por favor verifique.', 'center')                              
        }
        setLoadingMessage({loading: false, title: ''})
    }

    const Cancelar = () =>{
        history.push("/PerfilDelUsuario",{})
    }

    const [buttonList,setButtonList]= React.useState({
        "register":{"label":"Cambiar la Contraseña","callback":CambiarContraseña, variant: 'outlined', "color":"primary", "icon": <Save />, },
    });

    return (
        <div className={classes.containerPrincipal}>
            <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
            <Title title="Cambiar contraseña " icon={"/assets/cambiarContraseña.png"}/><br/>
            <Container maxWidth="md" className={classes.containerSecondary}>
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
                <div className={classes.form}>
                    <Form   
                        elements= {elements} 
                        buttonList={buttonList}
                        apiErrors={apiErrors} 
                        BotonCancelar={Cancelar}
                    />
                </div>
            </Container><br/>
        </div>

    );
}
export default connect(mapStateToProps, mapDispatchToProps)(FormularioCambiarContraseña);