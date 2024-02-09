const mapStateToProps = state => 
    ({
        step: state.solicitudEmpadronamiento.step,
        data: state.solicitudEmpadronamiento.data,
        datosCiudadanoTable: state.solicitudEmpadronamiento.datosCiudadanoTable,
        datosResidencia: state.solicitudEmpadronamiento.datosResidencia,
        ArrayListado: state.solicitudEmpadronamiento.ArrayListado,
        estaEmpadronado: state.solicitudEmpadronamiento.estaEmpadronado,
        estaFallecido: state.solicitudEmpadronamiento.estaFallecido,
        eventoRENAP: state.solicitudEmpadronamiento.eventoRENAP,
        dontAllowChange: state.solicitudEmpadronamiento.dontAllowChange
    });
export default mapStateToProps;
