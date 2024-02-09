const mapStateToProps = state => 
     ({
        data: state.constanciaCandidatoEleccionPopular.data,
        currentUser: state.security.currentUser,
        dataUsuarioPorAsociarVacia: state.asociarUsuarios.dataUsuarioPorAsociarVacia,
        datosCiudadanoTableDefault: state.solicitudEmpadronamiento.datosCiudadanoTableDefault,
        datosCiudadanoTable: state.solicitudEmpadronamiento.datosCiudadanoTable

    });

export default mapStateToProps;
