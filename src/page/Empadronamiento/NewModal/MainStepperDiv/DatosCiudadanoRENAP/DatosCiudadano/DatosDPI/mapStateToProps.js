const mapStateToProps = state => 
    ({
        step: state.solicitudEmpadronamiento.step,
        data: state.solicitudEmpadronamiento.data,
        datosCiudadanoTable: state.solicitudEmpadronamiento.datosCiudadanoTable,
    });
export default mapStateToProps;
