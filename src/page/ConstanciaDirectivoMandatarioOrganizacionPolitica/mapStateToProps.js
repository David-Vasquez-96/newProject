const mapStateToProps = state => 
     ({
        data: state.constanciaDirectivoMandatarioOrganizacionPolitica.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
