import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    SOLICITUD_EMPADRONAMIENTO_SET_STEP: (step)=> 
        dispatch({ "type":actionNames.SOLICITUD_EMPADRONAMIENTO_SET_STEP,"state":{"step":step}}),   
    });
export default mapDispatchToProps;