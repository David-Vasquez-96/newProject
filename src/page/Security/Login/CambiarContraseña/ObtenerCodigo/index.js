import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button} from '@material-ui/core/';
import { useStyles } from "./style";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import Alert from 'react-s-alert';
import IconElement from 'component/IconoInstitucional';
import BotonElement from 'component/BotonCancelar'; 
import {Lock, Cancel, NavigateBefore} from '@material-ui/icons/';
import { useHistory } from "react-router-dom";
import Mensaje from 'component/MensajeElement'
import LoadingProgress from 'component/Loading'
import ApiServices from 'service/ApiServices';
import BotonPersonalizado from 'component/BotonNormal'

function ObtenerCodigoCambiarcontraseña(props) {
    const classes = useStyles();
    const [correo, setCorreo] = useState(props.correoUsuario)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState({tipoError:'', tipoMensaje:''})    
    let history = useHistory();

    const FuncionObtenerCodigo = async () =>{
        setLoading(true);
        try{
            const sendCode = Object.assign({}, {"email": correo});
            const response =  await ApiServices.userChangePasswordRequest.sendCode(sendCode);

            if (response.error!==null){
                props.MENSAJE_CODIGO(response.error.message)
                setOpen(true)
                setMensaje({tipoError:'error', tipoMensaje:response.error.message})
                setLoading(false);
                if("Usuario no registrado" === response.error.message){
                }else{
                    history.push("/cambiarContraseña/nuevaContraseña",{})
                }
            }else{
                props.MENSAJE_CODIGO(response.data)
                setOpen(true)
                setMensaje({tipoError:'success', tipoMensaje: response.data})                        
                setLoading(false);                
                history.push("/cambiarContraseña/nuevaContraseña",{})
            }
        }catch(exception){
            if (exception.status===404) {
                setLoading(false); 
                Alert.warning("Intente de nuevo")
            }else{
                 setLoading(false); 
                 Alert.error("Intente de nuevo ");
            } 
        }                    
    }

    const Cancelar = () =>{
        history.push("/home",{})
    }

    const handClose = (event, reason) =>{
        if (reason === 'clickaway') {return ;}
        setOpen(false)
    }

    const Regresar = () =>{
        history.push("/cambiarContraseña/obtenerCorreoExterno",{})
    }
    
    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.colorComponente}>
                <br/>
                <Grid container >
                    <IconElement/>
                        <Mensaje type={mensaje.tipoError} content={mensaje.tipoMensaje} open={open} handClose={handClose} />
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                    </Grid>                                        
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center"> 
                        <Typography component="span" variant="body2" color="textPrimary"> <strong>Necesitamos comprobar tu identidad</strong></Typography><br/><br/>
                    </Grid>
                    <Grid className={classes.marginText} item xs={12} container direction="row" justify="center" alignItems="center"> 
                        <Typography component="span" variant="body2" color="textPrimary">Enviaremos un código de seguridad a su correo electrónico registrado.</Typography><br/><br/>
                    </Grid>
                    <Grid item xs={12} container direction="row" justify="center" alignItems="center"> 
                        <Typography component="span" variant="body2" color="textPrimary"><strong>{correo}</strong></Typography><br/><br/>
                    </Grid>

                    <Grid className={classes.marginBoton} item xs={12} container direction="row" justify="center" alignItems="center">
                        <Button variant="outlined" onClick={FuncionObtenerCodigo} startIcon={<Lock />} color='primary'>Obtener Código</Button>
                        <Button variant="outlined" onClick={Regresar} startIcon={<NavigateBefore />} color='primary'>Regresar</Button>
                        <Button variant="outlined" onClick={Cancelar} startIcon={<Cancel />} color='secondary'>Cancelar</Button>
                    </Grid>                    
                </Grid><br/>
                <LoadingProgress open={loading} text="Enviando código de seguridad ..."/>
            </Container>
        </div>
    );
}export default connect(mapStateToProps,mapDispatchToProps)(ObtenerCodigoCambiarcontraseña);