import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SOLICITUD_EMPADRONAMIENTO_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_STEP,"state":{"step":step}}),   
    SOLICITUD_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA: (data)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_LUGAR_RESIDENCIA,"state":{"data":data}}),  
    });
export default mapDispatchToProps;