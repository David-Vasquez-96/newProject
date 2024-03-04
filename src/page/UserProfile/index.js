import React from 'react';
import Title from 'component/TitleWithIcon';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import {Container} from '@material-ui/core/';

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
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);