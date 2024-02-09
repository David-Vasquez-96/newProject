import React, {useState} from 'react';
import {Container, Typography, Button} from '@material-ui/core/';
import { useStyles } from "./style";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {Lock, Cancel} from '@material-ui/icons/';
import { useHistory } from "react-router-dom";
import ApiServices from 'service/ApiServices';
import { showMessagePersonalizedPosition } from 'service/SweetAlert';
import DialogLoadingMessage from 'component/LoadingMessage/index'

function ObtenerCodigoCambiarcontraseña(props) {
    const classes = useStyles();
    const [correo, setCorreo] = useState(props.currentUser?.email)
    const [loadingMessage, setLoadingMessage] = useState({loading:false, title:''});
    let history = useHistory();

    const ObtenerCodigo = async () =>{
        setLoadingMessage({loading: true, title: 'Enviando código de seguridad ...'})
        try{
            const sendCode = Object.assign({}, {"email": correo});
            const response =  await ApiServices.userChangePasswordRequest.sendCode(sendCode);

            if (response.error!==null){
                props.MENSAJE_CODIGO(response.error.message)
                showMessagePersonalizedPosition('error', '¡Advertencia!', response.error.message, 'center')
                history.push("/cambiarContraseña",{})
            }else{
                props.MENSAJE_CODIGO(response.data)
                showMessagePersonalizedPosition('success', '¡BIEN!', response.data, 'center')
                history.push("/cambiarContraseña",{})
            }   
        }catch(exception){
            showMessagePersonalizedPosition('warning', '¡Advertencia!', 'Intente de nuevo', 'center')
        }
        setLoadingMessage({loading: false, title: ''})
    }

    const Cancelar = () =>{
        history.push("/",{})
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.container}>
                <DialogLoadingMessage open={loadingMessage.loading} title={loadingMessage.title}/>
                <img alt="LOGO DEL TSE" src="/assets/LogoWithTitle.svg" className={classes.mobileIcon} />
                <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}> <strong>Necesitamos comprobar tu identidad.</strong></Typography>
                <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}><strong>Enviaremos un código de seguridad a su correo electrónico registrado.</strong></Typography>
                <Typography component="span" variant="body2" color="textPrimary" className={classes.typography}><strong>{correo}</strong></Typography>
                <div className={classes.marginBoton} >
                    <Button onClick={ObtenerCodigo} startIcon={<Lock />} variant='outlined' color="primary">Obtener Código</Button>
                    <Button onClick={Cancelar} startIcon={<Cancel />} variant='outlined' color="secondary">Cancelar</Button>
                </div>
            </Container>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ObtenerCodigoCambiarcontraseña);