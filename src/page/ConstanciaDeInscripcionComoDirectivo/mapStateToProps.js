const mapStateToProps = state => 
     ({
        data: state.constanciaDeInscripcionComoDirectivo.data,
        currentUser: state.security.currentUser
    });

export default mapStateToProps;
