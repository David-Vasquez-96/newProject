const mapStateToProps = state => 
     ({
        data: state.constanciaCandidatoEleccionPopular.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
