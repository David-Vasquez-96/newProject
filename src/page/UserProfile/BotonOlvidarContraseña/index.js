import React from 'react';
import {Container, Grid, Button, } from '@material-ui/core/';
import { useHistory } from "react-router-dom";

function FormularioCambiarContraseña(props) {
    let history = useHistory();

    const ObtenerCodigo = () =>{
        history.push("/cambiarContraseña/obtenerCodigo",{})
    }

    return (
        <div>
            <Container maxWidth="lg" >
                <Grid container spacing={2}>
                    <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                        <span>Si has olvidado tu contraseña puedes recuperarla dando clic en el botón <strong>¿HAS OLVIDADO TU CONTRASEÑA? </strong></span>
                    </Grid>                    
                    <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                        <Button onClick={ObtenerCodigo} variant="outlined" color={'primary'}>¿Has olvidado tu contraseña?</Button>
                    </Grid>                    
                </Grid>                    
            </Container>
            <br/>
        </div>
    );
}


export default FormularioCambiarContraseña;