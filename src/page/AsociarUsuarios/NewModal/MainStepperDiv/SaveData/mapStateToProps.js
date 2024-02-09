const mapStateToProps = state => 
    ({
        permisoICO: state.asociarUsuarios.permisoICO,
        tipoPermisoICO: state.asociarUsuarios.tipoPermisoICO,
        departamentoICO: state.asociarUsuarios.departamentoICO,
        municipioICO: state.asociarUsuarios.municipioICO,
        permisoAfiliacion: state.asociarUsuarios.permisoAfiliacion

    });
export default mapStateToProps;
