import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    MENSAJE_CODIGO: (mensajeCodigo)=> 
        dispatch({ "type":actionNames.MENSAJE_CODIGO,
        "state":{"mensajeCodigo":mensajeCodigo} 
    }),    
});
export default mapDispatchToProps;