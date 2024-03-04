import React from 'react';
import {useStyles} from './style';
import AppBarComponent from './AppBarPrincipal'
import Header from './Header/index'
import Documents from './Documents'
import Process from './Procesos'
import MapaDeProcesos from './MapaDeProcesos'
import NuestrasCertficaciones from './NuestrasCertificaciones'
import Footer from './Footer'

const LandingUSer=(props)=> {
    const classes = useStyles(props);
    var anchoDePantalla = window.innerWidth;
    var altoDePantalla = window.innerHeight;

    return (
        <div className={classes.BodyPrincipal}>        
            <AppBarComponent/>
            <Header />
            <Documents />
            <Process />
            <MapaDeProcesos />
            <NuestrasCertficaciones anchoDePantalla={anchoDePantalla} altoDePantalla={altoDePantalla}/>
            <Footer anchoDePantalla={anchoDePantalla} altoDePantalla={altoDePantalla}/>
        </div> 
    )
}
export default (LandingUSer);