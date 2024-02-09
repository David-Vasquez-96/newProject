import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button} from '@material-ui/core/';
import { useStyles } from "./style";
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import IconElement from 'component/IconoInstitucional'; 
import {MailOutline, Cancel, Mail} from '@material-ui/icons/';
import { useHistory } from "react-router-dom";
import Form from 'component/Form/FormTwoColumns';

function ObtenerCorreo(props) {
    const classes = useStyles();
    const [apiErrors,setApiErrors] = React.useState([]);
    const [elements, setElements] = React.useState({
        email: {    
            idelement: "email", value: '', label: "Correo electrónico *", pattern:"^[\\w0-9._%+-]+@[\\w0-9.-]+\\.\\w{2,10}$", 
            validators: ['required'], errorMessages:['Ingrese su correo.'], isError:false, elementType:'inputOutlined', icon: <Mail/> 
        },         
    });      
    const [correo, setCorreo] = useState()
    let history = useHistory();

    const ObtenerCorreoUsuario = () =>{
        props.LOGIN_CORREO_USUARIO(elements.email.value)
        history.push("/cambiarContraseña/obtenerCodigoExterno",{})
    }

    const Cancelar = () =>{
        history.push("/home",{})
    }

    const [buttonList,setButtonList]= React.useState({
        "register":{"label":"Verificar correo","callback":ObtenerCorreoUsuario, "icon": <MailOutline />, variant: 'outlined', "color":"primary",},
    });
    return (
        <div className={classes.root}>
            <Container maxWidth="sm" className={classes.colorComponente}>
                <Grid container>
                    <IconElement/>
                    <Grid className={classes.marginText} item xs={12} container direction="row" justify="center" alignItems="center"> 
                        <Typography component="span" variant="body2" color="textPrimary"> <strong>Debes verificar tu identidad para poder continuar.</strong></Typography><br/><br/>
                    </Grid>
                    <Grid className={classes.marginText} item xs={12} container direction="row" justify="center" alignItems="center"> 
                        <Typography component="span" variant="body2" color="textPrimary">Para verificar que este sea su correo electrónico, ingrese su correo registrado en
                        el sistema del Portal Web.</Typography><br/><br/>
                    </Grid>
                    <Grid className={classes.marginBoton} item xs={12} container direction="row" justify="center" alignItems="center" >
                        <Form   
                            elements= {elements} 
                            buttonList={buttonList}
                            apiErrors={apiErrors} 
                            BotonCancelar={Cancelar}
                        />
                    </Grid>                    
                </Grid><br/>
            </Container>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(ObtenerCorreo);