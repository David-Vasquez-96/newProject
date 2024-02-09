import React from 'react';
import {Card,CardActions,CardContent, Icon, Typography,  Button, Container} from '@material-ui/core';
import {Home, ListAlt} from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import {useStyles} from './style';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import BotonPersonalizado from 'component/BotonNormal'
import { Alert } from '@material-ui/lab';
import { useHistory } from "react-router-dom";

const UserRequestMessageSent = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const NewRequest = () => {
        props.data.firstName = ""
        props.data.secondName= ""
        props.data.thirdName = ""
        props.data.firstLastName = ""
        props.data.secondLastName= ""
        props.data.marriedLastName=""
        props.data.cui = ""
        props.data.email=""
        props.data.birthDate= new Date()
        props.data.state_id = ""
        props.data.city_id = ""        
        props.SIGNUP_SET_STEP(0);
    }
    const backHome = () => {
        props.SIGNUP_SET_STEP(0);
        history.push("/home",{})
    }

    return (
        <Container className={classes.root}>            
            <Card elevation={0} className={classes.card}>
                <CardContent>
                    <Icon className={classes.icon} >check_circle_outline</Icon>
                    <div className={classes.title}>
                        ¡Solicitud creada correctamente!
                    </div>
                    <div className={classes.content}> 
                        Su solicitud de usuario ha sido recibida.
                    </div>
                    <div className={classes.content}> 
                        Dentro de los próximos 2 días hábiles se enviará al correo que usted registro, 
                        indicando la aprobación o el rechazo de su solicitud de creación de usuario.
                    </div>
                    <Alert variant="outlined" severity="info" className={classes.content}>
                        En caso de que no pueda visualizar en su bandeja de entrada el correo enviado por el TSE, 
                        deberá verificar si el mismo se encuentra en la bandeja de SPAM.
                    </Alert>
                    <div className={classes.buttonMargin}>     
                        <Button variant="outlined" color="primary" onClick={backHome} startIcon={<Home />}>Inicio</Button>               
                        <Button variant="outlined" color="primary" onClick={NewRequest} startIcon={<ListAlt />}>Nueva Solicitud</Button>               
                    </div>
                    <div className={classes.subtitle}> Tribunal Supremo Electoral, Guatemala, C.A.</div>                    
                </CardContent>
            </Card>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps) (UserRequestMessageSent);
