import {actionNames} from 'constant/index';
const mapDispatchToProps = dispatch => ({
    CONSTANCIADIRECTIVOMANDATARIOORGANIZACIONPOLITICA_SET_DATA: (data)=> 
        dispatch({ "type":actionNames.CONSTANCIADIRECTIVOMANDATARIOORGANIZACIONPOLITICA_SET_DATA,
        "state":{"data":data} 
    }),
});
export default mapDispatchToProps;