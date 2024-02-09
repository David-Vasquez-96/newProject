import React, { Component } from 'react';
import LoadingIndicator  from 'common/LoadingIndicator';
import NotAuthorized from 'common/NotAuthorized';
import Title from 'component/Title';
import Form from 'component/Form/FormTwoColumns';
import FormJSTools from 'component/Form/JStools';
import ApiServices from 'service/ApiServices';
import Alert from 'react-s-alert';
import {useStyles} from './style';
import {Icon, Typography, Button, CircularProgress } from '@material-ui/core/';

const New =()=>{
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const save =async ()=>{
        setLoading(true);
        try{
            let response = await ApiServices.certificacionDeAfiliacionAPartidoPolitico.createRegister({});
            if (response.error!==null) Alert.error(response.error.message);
            else Alert.success("Solicitud guardada");
        }catch(exception){
            //console.log("exeption",exception);
            Alert.error("Error al guardar la solicitud");
        }
        setLoading(false);
    }

    return (
        <div>
            <Title title="Solicitud de certificación"/>   
            <Typography variant="h5" gutterBottom className={classes.message}>
                Para generar una solicitud de certificación de afiliación a partidos políticos debe hacer clic "Crear solicitud"
            </Typography>     

            <Button variant="outlined" color="primary" size="large" className={classes.button} onClick={save}>
                {loading ?  (<div className={classes.circularProgress}><CircularProgress /></div>) : (<Icon> note_add </Icon>) }
                Crear solicitud
            </Button>
        </div>
        
    )
}

export default New;