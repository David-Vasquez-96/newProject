import React, { Component } from 'react';
import ApiServices from 'service/ApiServices';
import LoadingIndicator  from 'common/LoadingIndicator';
import NotAuthorized from 'common/NotAuthorized';
import Title from 'component/TitleWithIcon';
import Alert from 'react-s-alert';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import Footer from 'page/Home/Footer2'
import {Container, Grid, Divider} from '@material-ui/core/';

import UserInformation from './UserInformation'
import ComponenteCambiarContraseña from './ComponenteCambiarContraseña'
import { useStyles } from "./style";

function UserProfile (props) {
    const classes = useStyles();

    return (
        <div className={classes.containerProfile}>
            <Title title="Perfil del ciudadano(a)" icon={"/assets/PerfilUsuario.png"}/><br/>
            <Container maxWidth="md">        
                <UserInformation DatosUsuario={props.currentUser}/>
                <ComponenteCambiarContraseña DatosUsuario={props.currentUser}/>
            </Container>
            <br/><br/><br/><Footer />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);