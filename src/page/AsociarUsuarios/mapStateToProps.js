const mapStateToProps = state => 
     ({
        data: state.constanciaCandidatoEleccionPopular.data,
        currentUser: state.security.currentUser,
        dataUsuarioPorAsociarVacia: state.asociarUsuarios.dataUsuarioPorAsociarVacia
    });

export default mapStateToProps;
