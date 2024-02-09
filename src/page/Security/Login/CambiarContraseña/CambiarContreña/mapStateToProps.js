const mapStateToProps = state => 
     ({
        correoUsuario: state.signUp.correoUsuario,
        mensajeCodigo: state.signUp.mensajeCodigo,
    });

export default mapStateToProps;
