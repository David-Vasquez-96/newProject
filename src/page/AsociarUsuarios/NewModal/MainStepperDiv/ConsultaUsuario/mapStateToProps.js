const mapStateToProps = state => 
    ({
        dataUsuarioPorAsociar: state.asociarUsuarios.dataUsuarioPorAsociar,
        dataUsuarioPorAsociarVacia: state.asociarUsuarios.dataUsuarioPorAsociarVacia
    });
export default mapStateToProps;
