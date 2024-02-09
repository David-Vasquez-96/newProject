const mapStateToProps = state => 
     ({
        data: state.constanciaAfiliacionAPartidosPoliticos.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
