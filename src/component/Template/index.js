//REACT
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'common/PrivateRoute';
//REDUX
import { connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
//COMPONENTS
import Home from 'page/Home/';
import PerfilDelUsuario from 'page/UserProfile';
import ComponentNewLogin from 'page/Security/Login/NewLogin'
import PaginaEnMantenimiento from 'page/PageInMaintenance'
import Signup from 'page/Security/Signup/';
import Profile from 'page/Security/Profile/';
import CambiarContrseña from '../../page/UserProfile/CambiarContreña/Form'
import CambiarContrseñaSinCode from 'page/UserProfile/CambiarContreñaSinCode/Form'
import MensajeConfirmacionCambioContraseña from '../../page/UserProfile/MensajeConfirmacionCambioContraseña'
import ObtenerCodigoCambiarContraseña from '../../page/UserProfile/ObtenerCodigo'
// publico
import ObtenerCorreoUsuario from 'page/Security/Login/CambiarContraseña/ObtenerCorreo'
import ObtenerCodigoExterno from 'page/Security/Login/CambiarContraseña/ObtenerCodigo'
import CambiarContraseñaExterno from 'page/Security/Login/CambiarContraseña/CambiarContreña'
import MensajeConfirmacionCambioContraseñaExterno from 'page/Security/Login/CambiarContraseña/MensajeConfirmacionCambioContraseña';
import { useStyles } from './Style';

const Template = (props) => {
    const classes = useStyles();
    var authenticated = props.authenticated;

    return (

        <div className={classes.root}>
            <main className={classes.content}>
                <Switch>
                    <Route path="/login" render={(props) => <ComponentNewLogin />}></Route>
                    <Route exact path="/" render={(props) => <Home authenticated={authenticated} currentUser={props.currentUser} {...props} />}></Route>
                    <PrivateRoute exact path="/profile" authenticated={authenticated} currentUser={props.currentUser} component={Profile}></PrivateRoute>
                    <PrivateRoute exact path="/cambiarContraseña" authenticated={authenticated} currentUser={props.currentUser} component={CambiarContrseña}></PrivateRoute>
                    <PrivateRoute exact path="/changedPassword" authenticated={authenticated} currentUser={props.currentUser} component={CambiarContrseñaSinCode}></PrivateRoute>
                    <PrivateRoute exact path="/contraseñaActualizada" authenticated={authenticated} currentUser={props.currentUser} component={MensajeConfirmacionCambioContraseña}></PrivateRoute>
                    <PrivateRoute exact path="/cambiarContraseña/obtenerCodigo" authenticated={authenticated} currentUser={props.currentUser} component={ObtenerCodigoCambiarContraseña}></PrivateRoute>

                    <Route exact path="/cambiarContraseña/obtenerCorreoExterno" render={(props) => <ObtenerCorreoUsuario />}></Route>
                    <Route exact path="/cambiarContraseña/obtenerCodigoExterno" render={(props) => <ObtenerCodigoExterno />}></Route>
                    <Route exact path="/cambiarContraseña/nuevaContraseña" render={(props) => <CambiarContraseñaExterno />}></Route>
                    <Route exact path="/cambiarContraseña/contraseñaActualizada" render={(props) => <MensajeConfirmacionCambioContraseñaExterno />}></Route>


                    <PrivateRoute path="/PerfilDelUsuario" authenticated={authenticated} currentUser={props.currentUser} component={PerfilDelUsuario}></PrivateRoute>
                    <Route path="/signup" render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
                </Switch>
            </main>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);