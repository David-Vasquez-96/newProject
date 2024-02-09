import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CITA_EMPADRONAMIENTO_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.CITA_EMPADRONAMIENTO_SET_STEP,"state":{"step":step}}),   
    CITA_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA: (data)=> 
        dispatch({ "type":actionNames.CITA_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA,"state":{"data":data}}),  
    CITA_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA: (datosResidencia)=> 
        dispatch({ "type":actionNames.CITA_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA,"state":{"datosResidencia":datosResidencia}}),  
    CITA_EMPADRONAMIENTO_SET_ARRAY_LISTADO: (ArrayListado)=> 
        dispatch({ "type":actionNames.CITA_EMPADRONAMIENTO_SET_ARRAY_LISTADO,"state":{"ArrayListado":ArrayListado}}),  
    CITA_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD: (rechazarSolicitud)=> 
        dispatch({ "type":actionNames.CITA_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD,"state":{"rechazarSolicitud":rechazarSolicitud}}),              
    });
export default mapDispatchToProps;