const mapStateToProps = state => 
     ({
        data: state.certificacionDeAfiliacionAPartidoPolitico.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
