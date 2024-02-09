import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SOLICITUD_EMPADRONAMIENTO_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_STEP,"state":{"step":step}}),   
    SOLICITUD_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA: (data)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA,"state":{"data":data}}),  
    SOLICITUD_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA: (datosResidencia)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_DATOS_RESIDENCIA,"state":{"datosResidencia":datosResidencia}}),  
    SOLICITUD_EMPADRONAMIENTO_SET_ARRAY_LISTADO: (ArrayListado)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_ARRAY_LISTADO,"state":{"ArrayListado":ArrayListado}}),  
    SOLICITUD_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD: (rechazarSolicitud)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_RECHAZAR_SOLICITUD,"state":{"rechazarSolicitud":rechazarSolicitud}}),
    SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE: (dontAllowChange)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_DONT_ALLOW_CHANGE,"state":{"dontAllowChange":dontAllowChange}}),              
    });
export default mapDispatchToProps;