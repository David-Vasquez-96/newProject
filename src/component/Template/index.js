import React, {useEffect, useRef, useState} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { IconButton, Drawer, CssBaseline, AppBar, Toolbar, Typography, Button, Divider, Icon, Fab, Box, Popover, MenuList, MenuItem, ListItemIcon } from '@material-ui/core';
// import EventIcon from '@mui/icons-material/Event';
import EventIcon from '@material-ui/icons/Event';
import Computer from '@material-ui/icons/Computer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import PrivateRoute from 'common/PrivateRoute';
import Home from 'page/Home/';
import Footer from 'page/Home/Footer2';
import CertificacionDeAfiliacionAPartidoPolitico from 'page/CertificacionDeAfiliacionAPartidoPolitico';
import CertificacionDeGoceDeSusDerechosPoliticos from 'page/CertificacionDeGoceDeSusDerechosPoliticos';
import ConstanciaDeInscripcionComoDirectivo from 'page/ConstanciaDeInscripcionComoDirectivo';
import ConstanciaCandidatoEleccionPopular from 'page/ConstanciaCandidatoEleccionPopular';
import ConstanciaDirectivoMandatarioOrganizacionPolitica from 'page/ConstanciaDirectivoMandatarioOrganizacionPolitica';
import ConstanciaAfiliacionAPartidosPoliticos from 'page/constanciaAfiliacionAPartidosPoliticos';
//Solicitudes de Adherentes y Afiliados
import SolicitudesAdhesion from 'page/OrganizacionesPoliticas/SolicitudAdhesion';
import SolicitudesAfiliacion from 'page/OrganizacionesPoliticas/SolicitudAfiliacion';
//Solicitudes de Hojas de Adhesion y Afiliacion
import SolicitudDeHojasDeAfiliacion from 'page/RegistroDeCiudadanos/SolicitudHojasAfiliacion';
import SolicitudDeHojasDeAdhesion from 'page/RegistroDeCiudadanos/SolicitudHojasAdhesion';

//Reportes de Asambleas
import ReportesAsambleas from 'page/OrganizacionesPoliticas/ReportesAsamblea';


import AsociarUsuarios from 'page/AsociarUsuarios';
import Empadronamiento from 'page/Empadronamiento';
import CitaEmpadronamientoActualizacion from 'page/CitaEmpadronamientoActualizacion';


import PerfilDelUsuario from 'page/UserProfile';
import EstadisticasDeAfiliados from 'page/Estadisticas/EstadisticasDeAfiliados';
import EstadisticasDeEmpadronados from 'page/Estadisticas/EstadisticasDeEmpadronados';
import InformacionGeneral from 'page/MiOrganizacionPolitica';


//import PersonIcon from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';


import CitaDeEmpadronamiento from 'page/CitaDeEmpadronamiento';

import ComponentNewLogin from 'page/Security/Login/NewLogin'
import PaginaEnMantenimiento from 'page/PageInMaintenance'
import Signup from 'page/Security/Signup/';
import ValidarCertificacion from 'page/ValidarCertificacion/'
import ValidarSolicitud from 'page/ValidarSolicitud/'
import ValidarDocumentsGeo from 'page/ValidarDocumentsGeo'
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
import ConsultaHojaAdhesionAfiliacion from 'page/RegistroDeCiudadanos/ConsultaHojaAdhesiónAfiliación';
import ConsultaConstanciaAdhesionAfiliacion from 'page/RegistroDeCiudadanos/ConsultaConstanciaAdhesiónAfiliación';

import { useStyles } from './Style';
import { connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import UserAccount from 'page/Security/Login/FormElements/UserAccount';
import { useHistory } from "react-router-dom";
import { publicMenu } from 'constant/index';
import { ArrowBack, AssignmentInd, HelpOutline, Menu, Input } from '@material-ui/icons';

const MenuComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    var authenticated = props.authenticated;
    const [open, setOpen] = React.useState(false);
    let history = useHistory();

    const onLogout = () => {
        let userAccount = new UserAccount();
        userAccount.logout();
        props.LOGOUT();
        props.SET_MENU(publicMenu);
        handleCloseMenu()
        history.push("/login", {})
        // history.push("/login", {})
    }

    //menu desplegable
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const openMenu = Boolean(anchorEl);
    const id = openMenu ? 'simple-popover' : undefined;
    const FuncionAyuda =()=>{
        window.location.href = "https://ayudaportalweb.tse.org.gt"
    }
    const FuncionIrAMenuPrincipal =()=>{
        history.push("/",{})
        handleCloseMenu()
    }
    const FuncionIrAMiPerfil =()=>{
        history.push("/PerfilDelUsuario",{})
        handleCloseMenu()
    }    

    return (

        <div className={classes.root}>
            {/* <CssBaseline />
            {
                props.authenticated ? (
                    <AppBar position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" className={classes.title} >
                                <Link className={classes.appTitle} to="/" >
                                    <img className={classes.appIcon} src="/assets/WhiteIcon.svg" alt="fireSpot" />
                                    &nbsp;&nbsp;&nbsp;Portal Web TSE
                                </Link>
                            </Typography>
                            {props.authenticated ? (
                                <div>                
                                    <Button className={classes.button} color="inherit"  to='/' component={Link}> 
                                        <Icon className={classes.icon}><ArrowBack/></Icon> 
                                        <span className={classes.title_text}>Menú Principal</span>
                                    </Button> 
                                    <Button className={classes.button} color="inherit" 
                                            aria-describedby={id} onClick={handleClickMenu}
                                    >
                                            <Icon className={classes.icon}><Menu/></Icon>
                                    </Button>
                                        <Popover
                                            id={id}
                                            open={openMenu}
                                            anchorEl={anchorEl}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <div className={classes.rootMenu}>
                                                <div className={classes.containerInformation}>
                                                    <Typography className={classes.typographyInformation}>{props.currentUser?.email}</Typography>
                                                    <AccountCircle style={{color:'#20568D', fontSize: 70}}/>
                                                    <Typography className={classes.typographyInformation}>¡Hola, {props.currentUser?.name}!</Typography>
                                                </div>
                                                <div className={classes.paper}>
                                                    <MenuList>
                                                        <MenuItem onClick={FuncionAyuda} className={classes.menuItem}>
                                                            <ListItemIcon> <HelpOutline fontSize="medium" style={{color:'#20568D'}}/></ListItemIcon>
                                                            <Typography variant="inherit">Ayuda</Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={FuncionIrAMiPerfil} className={classes.menuItem}>
                                                            <ListItemIcon> <AssignmentInd fontSize="medium" style={{color:'#20568D'}}/></ListItemIcon>
                                                            <Typography variant="inherit">Ver mi Perfil</Typography>
                                                        </MenuItem>
                                                        <MenuItem onClick={onLogout} className={classes.menuItem}>
                                                            <ListItemIcon> <Input fontSize="medium" style={{color:'#20568D'}}/></ListItemIcon>
                                                            <Typography variant="inherit">Cerrar Sesión</Typography>
                                                        </MenuItem>
                                                    </MenuList>
                                                </div>
                                            </div>
                                        </Popover>
                                </div>
                            ) : (
                                <div className={classes.contentButtonAppBar}>
                                </div>
                            )}
                        </Toolbar>
                    </AppBar>
                ):''
            } */}

            <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
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

                    <PrivateRoute path="/certificacionDeAfiliacionAPartidoPolitico" authenticated={authenticated} currentUser={props.currentUser} component={CertificacionDeAfiliacionAPartidoPolitico}></PrivateRoute>
                    <PrivateRoute path="/certificacionDeGoceDeSusDerechosPoliticos" authenticated={authenticated} currentUser={props.currentUser} component={CertificacionDeGoceDeSusDerechosPoliticos}></PrivateRoute>

                    <PrivateRoute path="/constanciaAfiliacionAPartidosPoliticos" authenticated={authenticated} currentUser={props.currentUser} component={ConstanciaAfiliacionAPartidosPoliticos}></PrivateRoute>
                    <PrivateRoute path="/constanciaDirectivoMandatarioOrganizacionPolitica" authenticated={authenticated} currentUser={props.currentUser} component={ConstanciaDirectivoMandatarioOrganizacionPolitica}></PrivateRoute>
                    <PrivateRoute path="/constanciaCandidatoEleccionPopular" authenticated={authenticated} currentUser={props.currentUser} component={ConstanciaCandidatoEleccionPopular}></PrivateRoute>


                    <PrivateRoute path="/informacionGeneralMiOrganizacionPolitica" authenticated={authenticated} currentUser={props.currentUser} component={InformacionGeneral}></PrivateRoute>
                    <PrivateRoute path="/solicitudesEmpadronamiento" authenticated={authenticated} currentUser={props.currentUser} component={Empadronamiento}></PrivateRoute>

                    <PrivateRoute exact path="/constanciaDeInscripcionComoDirectivo" authenticated={authenticated} currentUser={props.currentUser} component={ConstanciaDeInscripcionComoDirectivo}></PrivateRoute>
                    <PrivateRoute path="/estadisticasDeAfiliados" authenticated={authenticated} currentUser={props.currentUser} component={EstadisticasDeAfiliados}></PrivateRoute>
                    <PrivateRoute path="/estadisticasDeEmpadronados" authenticated={authenticated} currentUser={props.currentUser} component={EstadisticasDeEmpadronados}></PrivateRoute>
                    <PrivateRoute path="/asociarUsuarios" authenticated={authenticated} currentUser={props.currentUser} component={AsociarUsuarios}></PrivateRoute>
                    <PrivateRoute path="/solicitudAdhesion" authenticated={authenticated} currentUser={props.currentUser} component={SolicitudesAdhesion}></PrivateRoute>
                    <PrivateRoute path="/solicitudAfiliacion" authenticated={authenticated} currentUser={props.currentUser} component={SolicitudesAfiliacion}></PrivateRoute>
                    <PrivateRoute path="/solicitudHojasAfiliacion" authenticated={authenticated} currentUser={props.currentUser} component={SolicitudDeHojasDeAfiliacion}></PrivateRoute>
                    <PrivateRoute path="/solicitudHojasAdhesion" authenticated={authenticated} currentUser={props.currentUser} component={SolicitudDeHojasDeAdhesion}></PrivateRoute>
                    <PrivateRoute path="/citaEmpadronamientoActualizacion" authenticated={authenticated} currentUser={props.currentUser} component={CitaEmpadronamientoActualizacion}></PrivateRoute>
                    <PrivateRoute path="/reportesAsamblea" authenticated={authenticated} currentUser={props.currentUser} component={ReportesAsambleas}></PrivateRoute>

                    {/*                     <PrivateRoute path="/solicitudHojasAfiliacionAdhesion" authenticated={authenticated} currentUser={props.currentUser} component={SolicitudDeHojasDeAfiliacionAdhesion}></PrivateRoute>
 */}
                    <PrivateRoute path="/PerfilDelUsuario" authenticated={authenticated} currentUser={props.currentUser} component={PerfilDelUsuario}></PrivateRoute>
                    <Route path="/citaDeEmpadronamiento" render={(props) => <CitaDeEmpadronamiento authenticated={authenticated} {...props} />}></Route>
                    <Route path="/signup" render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
                    <Route path="/certificacion/validar/" render={(props) => <ValidarCertificacion authenticated={authenticated} {...props} />}></Route>
                    <Route path="/certificacion/autorizacion/" render={(props) => <ValidarSolicitud authenticated={authenticated} {...props} />}></Route>
                    <Route path="/empadronamiento/constancia/" render={(props) => <ValidarDocumentsGeo tipo={'constancia'}  {...props} />}></Route>
                    <Route path="/empadronamiento/solicitud/" render={(props) => <ValidarDocumentsGeo tipo={'solicitud'}  {...props} />}></Route>
                    <Route path="/hojaAdhesionAfiliacion/consulta/" render={(props) => <ConsultaHojaAdhesionAfiliacion authenticated={authenticated} {...props} />}></Route>
                    <Route path="/constanciaAdhesionAfiliacion/consulta/" render={(props) => <ConsultaConstanciaAdhesionAfiliacion authenticated={authenticated} {...props} />}></Route>
                </Switch>
                {/* <Footer/>  */}
                {/*<Footer></Footer> */}
            </main>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);