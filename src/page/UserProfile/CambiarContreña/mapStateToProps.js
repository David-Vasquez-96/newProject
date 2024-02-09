const mapStateToProps = state => 
     ({
        mensajeCodigo: state.signUp.mensajeCodigo,
        currentUser: state.security.currentUser,
    });

export default mapStateToProps;
